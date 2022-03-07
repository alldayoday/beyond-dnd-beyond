import { Combat } from '../models/combat.js'
import { Character } from '../models/character.js'

function index(req, res) {
  Combat.find({})
  .populate("characters")
  .then(combats => {
    res.render('combats/index', {
      combats,
      title: "Combat",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/combats")
  })
}

function show(req, res) {
  Combat.findById(req.params.id)
  .populate('characters')
  .exec(function(err, combat) {
    Character.find({_id: {$nin: combat.characters}}, 
      function(err, character) {
      res.render('combats/show', {
        title: `${combat.name}`, 
        combat,
        character,
      })
    })
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