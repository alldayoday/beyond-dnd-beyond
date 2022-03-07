import { Combat } from '../models/combat.js'
import { Character } from '../models/character.js'

function index(req, res) {
  Combat.find({})
  .populate("characters")
  .then(combats => {
    res.render('combats/index', {
      combats,
      title: "Combat",
      character: Character,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/combats")
  })
}

function show(req, res) {
  Combat.findById(req.params.id)
  .populate("owner")
  .populate("characters")
  .then(combat => {
    res.render('combats/show', {
      combat,
      title: `${combat.name}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/combats')
  })
}

function create(req,res){
    req.body.owner = req.user.profile._id
    Combat.create(req.body)
    .then(combat => {
      res.redirect('/combats')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/combats')
    })
  }

export {
  index,
  create,
  show,
}