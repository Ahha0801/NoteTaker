var fs = require('fs')
var path = require('path')
var express = require('express')
var uuid = require('uuid')

var app = express()

var PORT= process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/test', (req,res) =>{
    res.send('hello')
})

//Route skurrrr 
app.get('/notes', function(req,res){
    res.sendFile(path.join(_dirname,'/public/notes.html'))
})

app.get('api/notes',function(req,res){
fs.readFile('../db.db.json,utf-8',function(err,data){
    if(err) throw err
    res.send(data)
})
})
app.post('/api/notes',function(res,res){
    var title=req.body.title
    var text=req.body.text
    
    fs.readFile('../db.db.json,utf-8',function(err,data){
        if(err) throw err
}) 
