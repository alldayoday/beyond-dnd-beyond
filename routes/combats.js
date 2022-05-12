import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { passUserToView } from '../middleware/middleware.js'

import * as combatsCtrl from '../controllers/combats.js'
const router = Router()

//CRD for combat
router.get('/', isLoggedIn, combatsCtrl.index)
router.post('/', isLoggedIn, combatsCtrl.create)
router.get('/:id', isLoggedIn, combatsCtrl.show)
router.post('/:id/characters', isLoggedIn, combatsCtrl.addToCombat)
router.delete("/:id", isLoggedIn, passUserToView, combatsCtrl.delete)


export {
  router
}