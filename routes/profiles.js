import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { passUserToView } from '../middleware/middleware.js'

import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, passUserToView, profilesCtrl.index)

router.get("/:id", isLoggedIn, passUserToView, profilesCtrl.show)

router.post("/:id/sessionNotes", isLoggedIn, passUserToView, profilesCtrl.createNote)

router.delete("/:profId/sessionNotes/:noteId", isLoggedIn, passUserToView, profilesCtrl.deleteNote)

export {
  router
}
