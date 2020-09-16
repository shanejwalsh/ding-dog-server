const express = require('express');
const { dogController, middlewares } = require('../../../controllers/dogs');

const router = express.Router();

router.get('/dogs', dogController.index);
router.post('/dogs', dogController.create);
router.get('/dogs/:id', middlewares.getDog, dogController.show);
router.delete('dogs/:id', middlewares.getDog, dogController.destroy);
router.delete('/dogs', dogController.destroyAll);

module.exports = router;
