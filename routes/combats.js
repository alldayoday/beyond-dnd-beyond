import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { passUserToView } from '../middleware/middleware.js'

import * as combatsCtrl from '../controllers/combats.js'

const router = Router()

router.get('/', isLoggedIn, combatsCtrl.index)

router.post('/', isLoggedIn, combatsCtrl.create)

router.get('/:id', combatsCtrl.show)

router.post('/', isLoggedIn, combatsCtrl.create)

export {
  router
}