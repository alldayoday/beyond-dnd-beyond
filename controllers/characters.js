import { Character } from '../models/character.js'

//grabs every character for the page, also populates referenced id and sets page title
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

//brings user to the page to make a new character
function newCharacter(req, res) {
  Character.find({}, function (err, characters) {
    res.render('characters/new', {
      title: 'Add Character',
      characters: characters,
      err,
    })
  })
}

//actually creates and save the new character from the information in the body of the page
function create(req, res) {
  req.body.owner = req.user.profile._id
  Character.create(req.body)
    .then(character => {
      res.redirect('/characters')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/characters')
    })
}

//shows a specific character, populates the referrenced id of the owner and sets title specific to characters name
function show(req, res) {
  Character.findById(req.params.id)
    .populate("owner")
    .then(character => {
      res.render('characters/show', {
        character,
        title: `${character.name}'s Stats`
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/characters')
    })
}

//brings user to a page to edit the character
function edit(req, res) {
  Character.findById(req.params.id, function (err, character) {
    res.render("characters/edit", {
      character,
      err,
      title: "Edit Character"
    })
  })
}

//updates the character using information from the body ONLY if the character's owner is the logged in user
function update(req, res) {
  Character.findById(req.params.id)
    .then(character => {
      if (character.owner.equals(req.user.profile._id)) {
        character.updateOne(req.body, { new: true })
          .then(() => {
            res.redirect(`/characters/${character._id}`)
          })
        } else {
          throw new Error('🚫 Not authorized 🚫')
        }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/characters`)
    })
}

//removes the character from the database only if the character's owner is the logged in user
function deleteCharacter(req, res) {
  Character.findById(req.params.id)
    .then(character => {
      if (character.owner.equals(req.user.profile._id)) {
        character.delete()
          .then(() => {
            res.redirect('/characters')
          })
      } else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/characters')
    })
}

//adds a spell to the characters spellSchema
function createSpell(req, res) {
  Character.findById(req.params.id, function (err, character) {
    character.spells.push(req.body)
    character.save(function (err) {
      res.redirect(`/characters/${character._id}`)
    })
  })
}

//removes a spell from the character's spellSchema
function deleteSpell(req, res) {
  Character.findById(req.params.charId)
    .then(character => {
      character.spells.remove({ _id: req.params.spellId })
      character.save()
        .then(() => {
          res.redirect(`/characters/${character._id}`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/characters/${req.character._id}`)
    })
}

//adds a weapon to the characters weaponSchema
function equipWeapon(req, res) {
  Character.findById(req.params.id, function (err, character) {
    character.weapons.push(req.body)
    character.save(function (err) {
      res.redirect(`/characters/${character._id}`)
    })
  })
}

//removes a weapon from the characters weaponSchema 
function deleteWeapon(req, res) {
  Character.findById(req.params.charId)
    .then(character => {
      character.weapons.remove({ _id: req.params.weaponId })
      character.save()
        .then(() => {
          res.redirect(`/characters/${character._id}`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/characters/${req.character._id}`)
    })
}

//the next 3 functions are here for combat running purposes. they allow the user to update select stats for characters that they do not own, to allow for tracking in combat. 

//sets the characters initiative so they can be sorted accordingly when added to combat
function setInit(req, res) {
  Character.findById(req.params.id)
    .then(character => {
      character.initiative = req.body.initiative
      character.save()
        .then(() => {
          res.redirect(req.get('referer'));
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/combats')
    })
}

//takes points off of the characters 'currentHP' stats for damage taken in combat
function takeDamage(req, res) {
  if (req.body.currentHP > 0) {
    Character.findById(req.params.id)
      .then(character => {
        character.currentHP = character.currentHP - req.body.currentHP
        character.save()
          .then(() => {
            res.redirect(req.get('referer'));
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/combats')
      })
  } else {
  throw new Error('🚫 No Negative Hits 🚫')
}}

//adds points to the characters 'currentHP' stats for healing both in combat and after short/long rests
function heal(req, res) {
  if (req.body.heal > 0) {
    Character.findById(req.params.id)
      .then(character => {
        if (character.currentHP > 0){
        character.currentHP = parseInt(character.currentHP) + parseInt(req.body.heal)
        } else character.currentHP = req.body.heal
        character.save()
          .then(() => {
            res.redirect(req.get('referer'));
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/combats')
      })
  } else {
  throw new Error('🚫 No Negative Heals 🚫')
}}


//exports all functions to be used in routing
export {
  index,
  create,
  newCharacter as new,
  show,
  edit,
  update,
  deleteCharacter as delete,
  createSpell,
  equipWeapon,
  deleteSpell,
  deleteWeapon,
  setInit,
  takeDamage,
  heal,
}

