module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    //end point to create a new note
    app.post('/notes', notes.create);

    //retrieve all notes
    app.get('/notes', notes.findAll);

    //Retrieve a single note
    app.get('/notes/:id', notes.findOne);

    //Update a note with the given id
    app.put('/notes/:id', notes.update);

    //Delete a note with the given ID
    app.delete('/notes/:id', notes.delete);
}