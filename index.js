const yargs = require('yargs')
const package = require('./package.json')
const { addNote, printNotes, deleteNoteById } = require('./notes.controller')

yargs.version(package.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title)
  },
})

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  handler() {
    printNotes()
  },
})

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
  },
  handler({ id }) {
    deleteNoteById(id)
  },
})

yargs.parse()
