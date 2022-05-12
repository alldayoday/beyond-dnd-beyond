import { Profile } from '../models/profile.js'

//grabs all profiles
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

//shows a specific profile and determines if it is the profile of the logged in user
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

//adds a session note to the profile
function createNote(req, res) {
  Profile.findById(req.params.id, function (err, profile) {
    profile.sessionNotes.push(req.body)
    profile.save(function (err) {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
}

//removes a session note from the profile
function deleteNote(req, res) {
  Profile.findById(req.params.profId)
    .then(profile => {
      console.log("hello!")
      profile.sessionNotes.remove({ _id: req.params.noteId })
      profile.save()
        .then(() => {
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