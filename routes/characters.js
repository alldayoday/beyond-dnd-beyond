import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import { passUserToView } from '../middleware/middleware.js'

import * as charactersCtrl from '../controllers/characters.js'
const router = Router()

//CRUD for character control
router.get('/', charactersCtrl.index)
router.get('/new', isLoggedIn, passUserToView, charactersCtrl.new)
router.post('/', isLoggedIn, passUserToView, charactersCtrl.create)
router.get("/:id", isLoggedIn, passUserToView, charactersCtrl.show)
router.get("/:id/edit", isLoggedIn, passUserToView, charactersCtrl.edit)
router.put("/:id", isLoggedIn, passUserToView, charactersCtrl.update)
router.delete("/:id", isLoggedIn, passUserToView, charactersCtrl.delete)

//adding and removing spells and weapons from embedded models
router.post('/:id/spells', isLoggedIn, passUserToView, charactersCtrl.createSpell)
router.post('/:id/weapons', isLoggedIn, passUserToView, charactersCtrl.equipWeapon)
router.delete("/:charId/spells/:spellId", isLoggedIn, passUserToView, charactersCtrl.deleteSpell)
router.delete("/:charId/weapons/:weaponId", isLoggedIn, passUserToView, charactersCtrl.deleteWeapon)

//combat control to update specific character stats
router.patch('/:id/setInit', isLoggedIn, charactersCtrl.setInit)
router.patch('/:id/takeDamage', isLoggedIn, charactersCtrl.takeDamage)
router.patch('/:id/heal', isLoggedIn, charactersCtrl.heal)

export {
  router
}