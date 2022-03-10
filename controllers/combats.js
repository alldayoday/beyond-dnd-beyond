import { Combat } from '../models/combat.js'
import { Character } from '../models/character.js'

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

function show(req, res) {
  Combat.findById(req.params.id)
    .sort({ initiative: 'asc' })
    .exec(function (err, combat) {
      {
        res.render('combats/show', {
          title: `${combat.name}`,
          combat,
          err,
        })
      }
    })
}

function create(req, res) {
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

function addToCombat(req, res) {
  Combat.findById(req.params.id)
    .then(combat => {
      combat.instances.push(req.body)
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

function deleteCombat(req, res) {
  Combat.findByIdAndDelete(req.params.id, function (err, combat) {
    res.redirect("/combats")
  })
}




export {
  index,
  create,
  show,
  addToCombat,
  deleteCombat as delete,
}