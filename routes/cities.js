const express = require('express');
const router = express.Router();

// Databse
const db = require('../models');

// Controller
const citiesController = require('../controllers').cities;

// Cities Index
router.get('/', citiesController.index);

// City Show
router.get('/:city_id', citiesController.show);

// City Create
router.post('/', citiesController.create);

// City Update
router.put('/:city_id', citiesController.update);

// City Destroy
router.delete('/:city_id', citiesController.delete);

module.exports = router;
