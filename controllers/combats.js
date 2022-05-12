import { Combat } from '../models/combat.js'
import { Character } from '../models/character.js'

//grabs all combats from db for page
function index(req, res) {
  Combat.find({})
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

//shows a specific combat instance, populates the characters information for combat tracking, and includes a list of any characters not currently in the combat that can be added
function show(req, res) {
  Combat.findById(req.params.id)
  .populate('characters')
    .exec(function (err, combat) {
      Character.find({ _id: { $nin: combat.characters } }, function (err, characters) {
        res.render('combats/show', {
          title: `${combat.name}`,
          combat,
          characters,
          err,
        })
      })
    }
    )
}

//creates a new combat instance
function create(req, res) {
  req.body.owner = req.user.profile._id
  Combat.create(req.body)
    .then(combat => {
      res.redirect(`/combats/${combat._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/combats')
    })
}

//adds a character to the combat and saves it
function addToCombat(req, res) {
  Combat.findById(req.params.id)
    .then(combat => {
      combat.characters.push(req.body.charId)
      combat.save()
        .then(() => {
          res.redirect(`/combats/${combat._id}`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/combats/`)
    })
}

//removes combat for upkeeping
function deleteCombat(req, res) {
  Combat.findByIdAndDelete(req.params.id, function (err, combat) {
    res.redirect("/combats")
  })
}

//exports functions for routing
export {
  index,
  create,
  show,
  addToCombat,
  deleteCombat as delete,
}

