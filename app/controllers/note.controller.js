const Note = require('../models/note.model.js');

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    const note = new Note({
        title: req.body.title || "Untitled",
        content: req.body.content
    });

    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occur while creating the note."
        });
    });
};

exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Cannot find notes"
        });
    });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with the given ID " +req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind == 'objectUd') {
            return res.status(404).send({
                message: "Note not found with ID " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};