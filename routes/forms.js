const express = require('express')
const router = express.Router()
const controller = require("../controllers/forms")

router
  .route("/:formId/filteredResponses")
  .get(controller.getForms)

module.exports = router