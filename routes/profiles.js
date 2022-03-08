import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)

router.get("/:id", profilesCtrl.show)

router.post("/:id/sessionNotes", profilesCtrl.createNote)

router.delete("/:profId/sessionNotes/:noteId", profilesCtrl.deleteNote)

export {
  router
}
