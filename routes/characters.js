import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'

import * as charactersCtrl from '../controllers/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)
router.get('/new', isLoggedIn, charactersCtrl.new)
router.post('/', isLoggedIn, charactersCtrl.create)
router.get("/:id", isLoggedIn, charactersCtrl.show)
router.get("/:id/edit", charactersCtrl.edit)
router.put("/:id", charactersCtrl.update)
router.delete("/:id", charactersCtrl.delete)

export {
  router
}