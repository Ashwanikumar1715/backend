
const express = require('express');
const router = express.Router();

// Load Book model
const Note = require('../../models/Notes');

router.get('/', (req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ nobooksfound: 'No Notes found' }));
});


router.get('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(404).json({ nobookfound: 'No Notes found' }));
});


router.post('/', (req, res) => {
  Note.create(req.body)
    .then(note => res.json({ msg: 'Note added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Note' }));
});


router.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then(note => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id, req.body)
    .then(note => res.json({ mgs: 'Note entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Note' }));
});

module.exports = router;