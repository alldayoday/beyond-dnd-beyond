import { Combat } from '../models/combat.js'
import { Character } from '../models/character.js'

function index(req, res) {
  Combat.find({})
  .populate("owner")
  .populate("character")
  .then(combats => {
    res.render('combats/index', {
      combats,
      title: "Combat",
      Character,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/combats")
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
  create
}