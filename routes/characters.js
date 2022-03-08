import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { passUserToView } from '../middleware/middleware.js'

import * as charactersCtrl from '../controllers/characters.js'

const router = Router()

router.get('/', charactersCtrl.index)

router.get('/new', isLoggedIn, charactersCtrl.new)

router.post('/', isLoggedIn, charactersCtrl.create)

router.get("/:id", isLoggedIn, passUserToView, charactersCtrl.show)

router.get("/:id/edit", isLoggedIn, passUserToView, charactersCtrl.edit)

router.put("/:id", isLoggedIn, passUserToView, charactersCtrl.update)

router.delete("/:id", isLoggedIn, passUserToView, charactersCtrl.delete)

router.post('/:id/spells', isLoggedIn, passUserToView,charactersCtrl.createSpell)

router.post('/:id/weapons', isLoggedIn, passUserToView,charactersCtrl.equipWeapon)

router.delete("/:charId/spells/:spellId", isLoggedIn, passUserToView, charactersCtrl.deleteSpell)

router.delete("/:charId/weapons/:weaponId", isLoggedIn, passUserToView, charactersCtrl.deleteWeapon)


export {
  router
}