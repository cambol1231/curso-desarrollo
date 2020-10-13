const auth = require('./routes/auth')
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const brands = require('./routes/brands')
const login = require('./routes/login')
const Personal = require('./routes/Personal')
const Materiales = require('./routes/Materiales')
const Recuperacion = require('./routes/Recuperacion')
const RecuperacionAuditoria = require('./routes/Recuperacion Auditoria')
const Perfil = require('./routes/Perfil')



module.exports = [
    auth,
    users,
    profiles,
    brands,
    login,
    Personal,
    Materiales,
    Recuperacion,
    RecuperacionAuditoria,
    Perfil
]