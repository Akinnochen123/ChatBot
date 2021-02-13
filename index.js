const express = require('express')
const app = express()
const port = 3000

const config = require('./config');

// Middleware

const slackRouter = require('./routes/slack');

app.use('/slack', slackRouter({config}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})