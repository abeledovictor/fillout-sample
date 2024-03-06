const express = require("express")
const helmet = require("helmet")
const dotenv = require("dotenv")
const cors = require("cors")
const routes = require("./routes")

dotenv.config()

const app = express()
const port = process.env.PORT


app.use(helmet())
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use("/v1/api", routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})