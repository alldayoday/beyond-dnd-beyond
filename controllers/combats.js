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
    .populate('characters')
    .sort({ initiative: 'asc' })
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

function deleteCombat(req, res) {
  Combat.findByIdAndDelete(req.params.id, function (err, combat) {
    res.redirect("/combats")
  })
}

function setInit(req, res) {
  Character.findById(req.params.id)
  .then(character => {
    character.initiative = req.body.initiative
    character.save()
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
  addToCombat,
  deleteCombat as delete,
  setInit,
}