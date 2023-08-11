const { Router } = require('express')
const { registerMember } = require('../Controllers/registerMemberController')
const registerMemberRouter = Router()


registerMemberRouter.post('/register', registerMember)

module.exports = {
    registerMemberRouter
}