const Router = require('express')
const { registerMember } = require('../Controllers/registerMemberController')
const router = Router()


router.post('register/', registerMember)

module.exports = router