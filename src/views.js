import moment from 'moment'
import {getFilters} from './filters'
import {sortNotes, getNotes} from './notes'

// Generate DOM structure for a note
const generateNoteDom = note => {
    const noteElement = document.createElement('a')     
    const textElement = document.createElement('p')     
    const statusElement = document.createElement('p')

    // set up note text
    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = 'unnamed note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)
    
    // set up the link
    noteElement.setAttribute('href', `/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    //set up the status message
    statusElement.textContent = generateLastUpdated(note)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)

    return noteElement
}

// Render application notes
const renderNotes = function() {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesEl.innerHTML = ''     
    if (filteredNotes.length > 0) {
        filteredNotes.forEach(element => {
            const note = generateNoteDom(element)
            notesEl.appendChild(note)
        });
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'There are no notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const lastUpdatedElement = document.querySelector('#last-updated')
    const bodyElement = document.querySelector('#note-body')
    const notes = getNotes()
    const note = notes.find((note) => note.id == noteId)
    
    if (!note) {
        location.assign('/index.html')
    } 
    
    titleElement.value = note.title
    bodyElement.value = note.body
    lastUpdatedElement.textContent = generateLastUpdated(note)
}

const generateLastUpdated = note => `Last edited ${moment(note.updatedAt).fromNow()}`

export {generateNoteDom, renderNotes, generateLastUpdated, initializeEditPage}