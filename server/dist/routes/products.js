"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const simpleProductController_1 = require("../controllers/simpleProductController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', simpleProductController_1.SimpleProductController.getAllProducts);
router.post('/', auth_1.requireAdmin, simpleProductController_1.SimpleProductController.createProduct);
router.put('/:id', auth_1.requireAdmin, simpleProductController_1.SimpleProductController.updateProduct);
router.delete('/:id', auth_1.requireAdmin, simpleProductController_1.SimpleProductController.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.js.map