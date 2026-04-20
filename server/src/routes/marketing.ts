import express from 'express';
import {
  getMarketingProducts,
  addMarketingProduct,
  deleteMarketingProduct,
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
router.delete('/products/:id', deleteMarketingProduct);

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
