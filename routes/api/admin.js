const express = require('express')
const router = express.Router();
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
const db = require('../../db/models')
const config = require('../../config.json')

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
    databases: [db],
    resources: [
        {
            resource: db.Transaction, options: {
                properties: {
                    updatedAt: {
                        isVisible: { list: false, filter: false, show: false, edit: false },
                    },
                    balance: {
                        isVisible: { edit: false, list: true, show: true }
                    }
                }
            }
        },
    ],
    rootPath: '/',
    branding: config.branding,
    dashboard: {
        component: AdminBro.bundle('../../dashboard/index')
    }
})


AdminBroExpress.buildAuthenticatedRouter(adminBro,
    {
        authenticate: async (email, password) => {
            if (email === process.env.email && password === process.env.password)
                return { email }
            return null
        },
        cookiePassword: config.secretKey,
        cookieName: "admin"
    }, router, {
    secret: config.secretkey,
    saveUninitialized: true,
    resave: false,
})

module.exports = router
