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

/* --- Marketing Products --- */

export const getMarketingProducts = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('marketing_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to fetch marketing products');
  }
};

export const addMarketingProduct = async (req: Request, res: Response) => {
  try {
    const { name, is_active } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });

    const { data, error } = await supabase
      .from('marketing_products')
      .insert([{ name, is_active: is_active ?? true }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to add marketing product');
  }
};

export const deleteMarketingProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('marketing_products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to delete marketing product');
  }
};

/* --- Marketing Team --- */

export const getMarketingTeam = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('marketing_team')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to fetch marketing team');
  }
};

export const addMarketingTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, is_active } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });

    const { data, error } = await supabase
      .from('marketing_team')
      .insert([{ name, is_active: is_active ?? true }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    handleError(res, error, 'Failed to add marketing team member');
  }
};

export const deleteMarketingTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('marketing_team')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to delete marketing team member');
  }
};

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

export const submitMarketingResponse = async (req: Request, res: Response) => {
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
          // don't fail entire request, just proceed without url or throw - better throw if photo is mandatory
          throw new Error(`Failed to upload photo: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('Marketing')
          .getPublicUrl(filename);
        
        photo_proof_url = publicUrl;
      } catch (err: any) {
        console.error("Image upload failed", err);
        return res.status(400).json({ success: false, error: err.message });
      }
    }

    const { data, error } = await supabase
      .from('marketing_responses')
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

export const updateMarketingResponseStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ success: false, error: 'Status is required' });

    const { data, error } = await supabase
      .from('marketing_responses')
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
