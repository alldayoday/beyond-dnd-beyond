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

export {
  index,
  create,
  newCharacter as new
}