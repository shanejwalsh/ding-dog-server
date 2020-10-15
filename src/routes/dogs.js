const express = require('express');
const { dogController, middlewares } = require('../controllers/dogs');

const router = express.Router();

const { getDog } = middlewares;

router.get('/', dogController.index);
router.post('/', dogController.create);
router.get('/:id', getDog, dogController.show);
router.patch('/:id', dogController.update);
router.delete('/:id', getDog, dogController.destroy);
router.delete('/', dogController.destroyAll);
router.get('/:id/toggle-adopt', getDog, dogController.toggleAdopt);

module.exports = router;
