var {readFile} = require('fs/promises')
var path = require('path')
var express = require('express')
var {v4:uuidv4} = require('uuid')
const { networkInterfaces } = require('os')
const getNotes=()=>{ 
return readFile('db/db.json','utf-8').then(notes =>[].concat(JSON.parse(notes)))
}

var app = express()

var PORT= process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/test', (req,res) =>{
    res.send('hello')
})

//Route skurrrr 
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname,'./public/notes.html'))
})

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'))
})


app.get('/api/notes',function(req,res){ 
    getNotes() .then(notes=>res.json(notes)).catch(err=>res.json(err))
})
app.post('/api/notes',function(req,res){
    getNotes().then(oldNotes =>{
        var {title,text}= req.body
        var newNote={title,text,id:uuidv4()}
        var notearry= [...oldNotes,newNote]
        console.log(notearry)
    })

}) 
app.listen(PORT,()=>{
console.log('http://localhost:'+ PORT)


})