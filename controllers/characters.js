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
  res.render('characters/new', {
  title: 'Add Character'
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

export {
  index,
  create,
  newCharacter as new
}