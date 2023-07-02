const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

const addNote = async (title) => {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes'))
  notes.forEach((note) => console.log(chalk.blue(note.id, note.title)))
}

async function deleteNoteById(id) {
  const notes = await getNotes()

  const newNotes = notes.filter((note) => note.id !== id)

  await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

async function editById(id, title) {
  console.log(chalk.bgRed(`${id}: ${title}`))
  const notes = await getNotes()

  const editIndex = notes.findIndex((item) => {
    return item.id === id
  })

  console.log(editIndex)

  notes[editIndex] = {
    ...notes[editIndex],
    title: title,
  }

  await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
  addNote,
  printNotes,
  deleteNoteById,
  getNotes,
  editById,
}
