// Import necessary modules
const { readFile } = require('fs/promises')
const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { networkInterfaces } = require('os')
const fs = require('fs');

// Define a function to read notes from file
const getNotes = () => { 
  return readFile('db/db.json', 'utf-8')
    .then(notes => [].concat(JSON.parse(notes)))
}

// Create a new Express app
const app = express()

// Define the port to listen on
const PORT = process.env.PORT || 3001

// Use middleware to parse JSON and urlencoded request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files from the public directory
app.use(express.static('public'))

// Define a test route
app.get('/test', (req, res) => {
  res.send('hello')
})

// Define a route to serve the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Define a route to serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// Define a route to get all notes
app.get('/api/notes', (req, res) => { 
  getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

// Define a route to add a new note
app.post('/api/notes', (req, res) => {
  getNotes().then(oldNotes => {
    // Extract the title and text from the request body
    const { title, text } = req.body
    // Create a new note object with a unique ID
    const newNote = { title, text, id: uuidv4() }
    // Add the new note to the array of old notes
    const noteArray = [...oldNotes, newNote]
    console.log(noteArray)
    const noteArrayString= JSON.stringify(noteArray)
    fs.writeFile('./db/db.json',noteArrayString, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    res.json(newNote)
  })
})

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})