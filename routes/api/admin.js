const express = require('express')
const router = express.Router();
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
const AdminBroMongoose = require('@admin-bro/mongoose')
const sql = require('../../sql/models')
const nosql = require('../../nosql/models');
const config = require('../../config.json')


AdminBro.registerAdapter(AdminBroMongoose)
AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
    databases: [sql],
    resources: Object.values(nosql),
    rootPath: '/admin',
    branding: config.branding,
    dashboard: {
        handler: async () => {
            return { some: 'output' }
        },
        component: AdminBro.bundle('../../dashboard/index')
    }
})


AdminBroExpress.buildAuthenticatedRouter(adminBro,
    {
        authenticate: async (email, password) => {
            return { email }
        },
        cookiePassword: config.secretKey,
        cookieName: "admin"
    }, router, {
    secret: config.secretkey,
    saveUninitialized: true,
    resave: false,
})

module.exports = router
