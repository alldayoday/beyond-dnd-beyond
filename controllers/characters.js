import { Character } from '../models/character.js'

function index(req, res) {
  Character.find({})
  .populate("owner")
  .then(characters => {
    res.render('characters/index', {
      characters,
      title: "Characters"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function newCharacter(req,res) {
  Character.find({}, function(err, characters) {
  res.render('characters/new', {
  title: 'Add Character',
  characters: characters,
  err,
    })
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
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
  Character.findById(req.params.id)
  .populate("owner")
  .then(character => {
    res.render('characters/show', {
      character,
      title: "Character Stats"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
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
  Character.findById(req.params.id)
  .then(character => {
    if (character.owner.equals(req.user.profile._id)) {
      character.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/characters/${character._id}`)
      })
    } else {
      console.log(character.owner)
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/characters`)
  })
}

function deleteCharacter(req, res) {
  Character.findById(req.params.id)
  .then(character => {
    if (character.owner.equals(req.user.profile._id)) {
      character.delete()
      .then(() => {
        res.redirect('/characters')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/characters')
  })
}

function createSpell(req,res) {
  Character.findById(req.params.id, function(err, character) {
    character.spells.push(req.body)
    character.save(function(err) {
      res.redirect(`/characters/${character._id}`)
    })
  })
}

function equipWeapon(req,res){
  Character.findById(req.params.id, function(err, character) {
    character.weapons.push(req.body)
    character.save(function(err) {
      res.redirect(`/characters/${character._id}`)
    })
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
  createSpell,
  equipWeapon
}