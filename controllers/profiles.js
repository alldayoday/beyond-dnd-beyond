import { Profile } from '../models/profile.js'
import { Character } from '../models/character.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Intrepid Heros"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s Session Notes`,
        profile,
        isSelf,
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}



function createNote(req,res) {
  Profile.findById(req.params.id, function(err, profile) {
    profile.sessionNotes.push(req.body)
    profile.save(function(err) {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
}

function deleteNote(req, res) {
  Profile.findById(req.params.profId)
  .then(profile => {
    console.log("hello!")
    profile.sessionNotes.remove({_id: req.params.noteId})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.profile._id}`)
  })
}

export {
  index,
  show,
  createNote,
  deleteNote,
}