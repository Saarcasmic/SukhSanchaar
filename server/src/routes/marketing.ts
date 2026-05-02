import express from 'express';
import {
  getMarketingProducts,
  addMarketingProduct,
  deleteMarketingProduct,
  reorderMarketingProducts,
  getMarketingAreas,
  addMarketingArea,
  deleteMarketingArea,
  getMarketingTeam,
  addMarketingTeamMember,
  deleteMarketingTeamMember,
  getMarketingResponses,
  submitMarketingResponse,
  updateMarketingResponseStatus,
  deleteMarketingResponse
} from '../controllers/marketing';

const router = express.Router();

// Marketing Products
router.get('/products', getMarketingProducts);
router.post('/products', addMarketingProduct);
router.put('/products/reorder', reorderMarketingProducts);
router.delete('/products/:id', deleteMarketingProduct);

// Marketing Areas
router.get('/areas', getMarketingAreas);
router.post('/areas', addMarketingArea);
router.delete('/areas/:id', deleteMarketingArea);

// Marketing Team
router.get('/team', getMarketingTeam);
router.post('/team', addMarketingTeamMember);
router.delete('/team/:id', deleteMarketingTeamMember);

// Marketing Responses
router.get('/responses', getMarketingResponses);
router.post('/responses', submitMarketingResponse);
router.patch('/responses/:id/status', updateMarketingResponseStatus);
router.delete('/responses/:id', deleteMarketingResponse);

export default router;
