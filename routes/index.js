const express = require("express")
const router = express.Router()
const formsRoute = require("./forms")

const routes = [
  {
    path: '/forms',
    route: formsRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router