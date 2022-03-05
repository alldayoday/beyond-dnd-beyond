import { Character } from '../models/character.js'
import { isLoggedIn } from '../middleware/middleware.js'

function index(req, res) {
  Character.find({})
  .then(characters => {
    res.render('characters/index', {
      characters,
      title: "Characters"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function newCharacter(req,res) {
  Character.find({}, function(err, characters) {
  res.render('characters/new', {
  title: 'Add Character',
  characters: characters
    })
  })
}

function create(req, res) {
  Character.create(req.body)
  .then(Character => {
    res.redirect('/characters')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/characters')
  })
}

function show(req, res) {
  Character.findById(req.params.id, function (err, character) {
    res.render('characters/show', { 
      title: 'Character Stats', 
      character: character,
    })
  })
}

function edit(req, res) {
  Character.findById(req.params.id, function (err, character) {
    console.log(character)
    res.render("characters/edit", {
      character, 
      err,
      title: "Edit Character"
    })
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Character.findByIdAndUpdate(req.params.id, req.body, function(err, character) {
    res.redirect(`/characters/${character._id}`)
  })
}

function deleteCharacter(req, res) {
  Character.findByIdAndDelete(req.params.id, function(err, character) {
    res.redirect("/characters")
  })
}


export {
  index,
  create,
  newCharacter as new,
  show,
  edit,
  update,
  deleteCharacter as delete,
  
}