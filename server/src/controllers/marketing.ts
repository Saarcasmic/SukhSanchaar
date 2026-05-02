import { Request, Response } from 'express';
import { supabase } from '../models/supabase';

// Helper for error handling
const handleError = (res: Response, error: any, message: string) => {
  console.error(`${message}:`, error);
  res.status(500).json({
    success: false,
    error: error.message || message,
  });
};

/* ------------------------------------------------------------------ */
/*  Generic CRUD factory for marketing entities (products/areas/team) */
/* ------------------------------------------------------------------ */

interface CrudOptions {
  tableName: string;
  entityName: string;
  orderBy?: { column: string; ascending: boolean }[];
}

const createCrudHandlers = ({ tableName, entityName, orderBy }: CrudOptions) => ({
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      let query = (supabase.from as any)(tableName).select('*');

      // Apply ordering
      if (orderBy && orderBy.length > 0) {
        for (const o of orderBy) {
          query = query.order(o.column, { ascending: o.ascending });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      res.status(200).json({ success: true, data });
    } catch (error) {
      handleError(res, error, `Failed to fetch ${entityName}s`);
    }
  },

  add: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, is_active } = req.body;
      if (!name) {
        res.status(400).json({ success: false, error: 'Name is required' });
        return;
      }

      const { data, error } = await (supabase.from as any)(tableName)
        .insert([{ name, is_active: is_active ?? true }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json({ success: true, data });
    } catch (error) {
      handleError(res, error, `Failed to add ${entityName}`);
    }
  },

  remove: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { error } = await (supabase.from as any)(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
      handleError(res, error, `Failed to delete ${entityName}`);
    }
  },
});

/* --- Marketing Products --- */

const productHandlers = createCrudHandlers({
  tableName: 'marketing_products',
  entityName: 'marketing product',
  orderBy: [
    { column: 'sequence', ascending: true },
    { column: 'created_at', ascending: false },
  ],
});

export const getMarketingProducts = productHandlers.getAll;
export const addMarketingProduct = productHandlers.add;
export const deleteMarketingProduct = productHandlers.remove;

// Opt 1: Batch reorder using a single Supabase RPC call instead of N individual updates
export const reorderMarketingProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body; // Array of { id, sequence }
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, error: 'Items array is required' });
      return;
    }

    const ids = items.map((item: any) => item.id);
    const sequences = items.map((item: any) => item.sequence);

    const { error } = await (supabase.rpc as any)('reorder_marketing_products', { ids, sequences });

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Reordered successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to reorder marketing products');
  }
};

/* --- Marketing Areas --- */

const areaHandlers = createCrudHandlers({
  tableName: 'marketing_areas',
  entityName: 'marketing area',
});

export const getMarketingAreas = areaHandlers.getAll;
export const addMarketingArea = areaHandlers.add;
export const deleteMarketingArea = areaHandlers.remove;

/* --- Marketing Team --- */

const teamHandlers = createCrudHandlers({
  tableName: 'marketing_team',
  entityName: 'marketing team member',
});

export const getMarketingTeam = teamHandlers.getAll;
export const addMarketingTeamMember = teamHandlers.add;
export const deleteMarketingTeamMember = teamHandlers.remove;

/* --- Marketing Responses --- */

export const getMarketingResponses = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('marketing_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to fetch marketing responses');
  }
};

export const submitMarketingResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      date,
      time_of_visit,
      marketing_person_name,
      doctor_shop_name,
      area,
      products_discussed,
      samples_given,
      order_taken,
      order_details,
      photo_proof_base64,
      location,
    } = req.body;

    let photo_proof_url = null;

    // Upload photo to Supabase storage bucket "Marketing" if provided
    if (photo_proof_base64) {
      try {
        // Strip the data:image prefix if present
        const base64Data = photo_proof_base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `proof_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('Marketing')
          .upload(filename, buffer, {
            contentType: 'image/jpeg',
            upsert: false
          });

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          throw new Error(`Failed to upload photo: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('Marketing')
          .getPublicUrl(filename);
        
        photo_proof_url = publicUrl;
      } catch (err: any) {
        console.error("Image upload failed", err);
        res.status(400).json({ success: false, error: err.message });
        return;
      }
    }

    const { data, error } = await (supabase.from as any)('marketing_responses')
      .insert([{
        date,
        time_of_visit,
        marketing_person_name,
        doctor_shop_name,
        area,
        products_discussed,
        samples_given,
        order_taken,
        order_details,
        photo_proof_url,
        location,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to submit marketing response');
  }
};

export const updateMarketingResponseStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ success: false, error: 'Status is required' });
      return;
    }

    const { data, error } = await (supabase.from as any)('marketing_responses')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to update response status');
  }
};

export const deleteMarketingResponse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('marketing_responses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to delete marketing response');
  }
};
