const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const { VitalSign } = require('./model.js')
const passport = require('passport')

const jsonParser = bodyParser.json()

router.use(jsonParser)

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  VitalSign.find()
    .then((vitalSigns) => {
      res.json(vitalSigns.map(vitalSign => vitalSign.serialize()))
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'error getting vitalSigns' })
    })
});

router.get('/:id', (req,res) => {
  VitalSign
    .findById(req.params.id)
    .then(vitalSign => res.json(vitalSign.serialize()))
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'error finding by ID' });
      })
})

router.post('/', (req, res) => {
  console.log("POST DOC", req.body)
  VitalSign
    .create({
      bloodPressureTop: req.body.bloodPressureTop,
      bloodPressureBottom: req.body.bloodPressureBottom,
      heartRate: req.body.heartRate,
      weightKg: req.body.weightKg,
      userName: this.userName,
      publishedAt: req.body.publishedAt,
      notes: req.body.notes,
      })
    .then(vitalSign => res.status(201).json(vitalSign.serialize()))
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: 'error creating vitalSign' })
    })
})

router.put('/:id', (req, res) =>{
  // if (!(req.params.id && req.body.id && (req.params.id === req.body.id))) {
  //   res.status(400).json({
  //     error: 'Request path id and request body id values must match'
  //   })
  // }
  const updated = {};
  console.log("POST DOC", req.body)
  const updateableFields = ['bloodPressureTop', 'bloodPressureBottom', 'heartRate', 'weightKg', 'userName', 'notes'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  })
  VitalSign
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'error updating vitalSign' }))
})

router.delete('/:id', (req, res) => {
    VitalSign
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'error deleting vitalSign' });
      })
})