import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'

import * as charactersCtrl from '../controllers/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)
router.get('/new', isLoggedIn, charactersCtrl.new)
router.post('/', isLoggedIn, charactersCtrl.create)

export {
  router
}