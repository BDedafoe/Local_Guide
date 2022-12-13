const asyncHandler = require('express-async-handler');
const db = require("../models")

const { Note } = db


//Create a new list of notes
const create = asyncHandler(async (req, res) => {
    const { username, email, text } = req.body;
    const note = await Note.create({
        username,
        email,
        text
    });
    if(note) {
        res.status(201).json({
            _id: note._id,
            username: note.username,
            email: note.email,
            text: note.text
        })
    } else {
        res.status(400)
        throw new Error('Invalid notes data');
    }
});

//Get all notes
const all = asyncHandler(async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

//Get a note
const get = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note) {
        res.json(note);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

//Update a list
const update = asyncHandler(async (req, res) => {
    const { username, text } = req.body;
    const note = await Note.findById(req.params.id);
    if(note) {
        note.username = username;
        note.text = text;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

//Delete a note
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note) {
        await note.remove();
        res.json({message: 'Note removed'});
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

//Add an item to a note
const addItem = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const note = await Note.findById(req.params.id);
    if(note) {
        note.text.push(text);
        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});



module.exports = {
    create,
    all,
    get,
    update,
    deleteNote,
    addItem
};





// const Note = require('../models/note')
// const User = require('../models/user')

// // @desc Get all notes 
// // @route GET /notes
// // @access Private
// const getAllNotes = async (req, res) => {
//     // Get all notes from MongoDB
//     const notes = await Note.find().lean()

//     // If no notes 
//     if (!notes?.length) {
//         return res.status(400).json({ message: 'No notes found' })
//     }

//     // Add username to each note before sending the response 
//     // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
//     // You could also do this with a for...of loop
//     const notesWithUser = await Promise.all(notes.map(async (note) => {
//         const user = await User.findById(note.user).lean().exec()
//         return { ...note, username: user.username }
//     }))

//     res.json(notesWithUser)
// }

// // @desc Create new note
// // @route POST /notes
// // @access Private
// const createNewNote = async (req, res) => {
//     const { user, title, text } = req.body

//     // Confirm data
//     if (!user || !title || !text) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate title
//     const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     // Create and store the new user 
//     const note = await Note.create({ user, title, text })

//     if (note) { // Created 
//         return res.status(201).json({ message: 'New note created' })
//     } else {
//         return res.status(400).json({ message: 'Invalid note data received' })
//     }

// }

// // @desc Update a note
// // @route PATCH /notes
// // @access Private
// const updateNote = async (req, res) => {
//     const { id, user, title, text, completed } = req.body

//     // Confirm data
//     if (!id || !user || !title || !text || typeof completed !== 'boolean') {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Confirm note exists to update
//     const note = await Note.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Note not found' })
//     }

//     // Check for duplicate title
//     const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     // Allow renaming of the original note 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     note.user = user
//     note.title = title
//     note.text = text
//     note.completed = completed

//     const updatedNote = await note.save()

//     res.json(`'${updatedNote.title}' updated`)
// }

// // @desc Delete a note
// // @route DELETE /notes
// // @access Private
// const deleteNote = async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'Note ID required' })
//     }

//     // Confirm note exists to delete 
//     const note = await Note.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Note not found' })
//     }

//     const result = await note.deleteOne()

//     const reply = `Note '${result.title}' with ID ${result._id} deleted`

//     res.json(reply)
// }

// module.exports = {
//     getAllNotes,
//     createNewNote,
//     updateNote,
//     deleteNote
// }