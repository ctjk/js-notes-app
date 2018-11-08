import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(e) {
        return []
    }
}

notes = loadNotes()

// Expose notes from module
const getNotes = () => notes

// Save notes (modularized to abstract storage)
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const createNote = () => {
    const id = uuidv4()
    const ts = moment()
    notes.push(
        {id: id
        ,title: ''
        ,body: ''
        ,createdAt: ts.valueOf()
        ,updatedAt: ts.valueOf()
    })
    saveNotes()
    return id
}

// Update a note
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return
    }
    if (typeof updates.title === 'string' ) {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }
    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note
}

// Remove a note
const removeNote = id => {
    const notesIndex = notes.findIndex(note => note.id == id)
    if (notesIndex > -1) {
        notes.splice(notesIndex, 1)
        saveNotes()
    }
}

// Sort notes in one of 3 ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        notes.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
                return -1
            } else if (b.updatedAt < a.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        notes.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1
            } else if (b.createdAt < a.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return 1
            } else {
                return b
            }
        })
    }
    return notes
}

export {getNotes, createNote, updateNote, removeNote, sortNotes}