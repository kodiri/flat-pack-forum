require('dotenv').config();

const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const DB_SESSION_SALT = process.env.DB_SESSION_SALT;

module.exports = function sessionStore() {
    return session({
        secret: DB_SESSION_SALT,
        cookie: { maxAge: 10 * 60 * 1000 },
        resave: false,
        rolling: true, // update client id so they don't expire early
        saveUninitialized: false, // ignore uninitialized cookies to save space
        unset: 'destroy',
        store: new MemoryStore({
            checkPeriod: 1000 * 60 * 60 * 24
        })
    });
}