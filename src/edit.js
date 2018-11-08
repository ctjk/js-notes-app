import {initializeEditPage, generateLastUpdated} from './views'
import {updateNote, removeNote} from './notes'

const titleElement = document.querySelector('#note-title')
const lastUpdatedElement = document.querySelector('#last-updated')
const bodyElement = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', e => {
    const note = updateNote(noteId, {title: e.target.value})
    lastUpdatedElement.textContent = generateLastUpdated(note)
})

bodyElement.addEventListener('input', e => {
    const note = updateNote(noteId, {body: e.target.value})
    lastUpdatedElement.textContent = generateLastUpdated(note)
})

removeButton.addEventListener('click', e => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})

