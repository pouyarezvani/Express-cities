const db = require('../models');

function getTime() {
  return new Date().toLocaleString();
};

module.exports = {
  index: (req, res) => {
    db.City.find({}, (err, allCities) => {
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again',
      });
  
      res.status(200).json({
        status: 200,
        numberOfResults: allCities.length,
        data: allCities,
        requestedAt: getTime(),
      });
    });
  },
  show: (req, res) => {
    db.City.findById(req.params.city_id, (err, foundCity) => {
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again',
      });
  
      res.status(200).json({
        status: 200,
        data: foundCity,
        requestedAt: getTime(),
      });
    });
  },
  create: (req ,res) => {
    const newCity = req.body;
  
    db.City.create(newCity, (err, createdCity) => {
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again'});
  
      res.status(201).json({
        status: 201,
        data: createdCity,
        requestedAt: getTime(),
      });
    });
  },
  update: (req, res) => {
    console.log(req.body);
    db.City.findByIdAndUpdate(req.params.city_id, req.body, { new: true }, (err, updatedCity) => {
      console.log(updatedCity)
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again',
      });
  
      res.status(202).json({
        status: 202,
        data: updatedCity,
        requestedAt: getTime(),
      });
    });
  },
  delete: (req, res) => {
    db.City.findByIdAndDelete(req.params.city_id, (err, deletedCity) => {
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again',
      });
  
      console.log(deletedCity);
      res.status(200).json({
        status: 200,
        message: 'Success',
      });
    });
  },
};
