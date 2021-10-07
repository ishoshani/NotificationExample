const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
db.initDB()

const exampleList = [
    {
        component: "shop",
        status: "low",
        timeSent: Date.parse("1-12-2021")
    },
    {
        component:"blog",
        status:"critical",
        timeSent: Date.now("1-13-2021")
    }
]

app.get('/', async (req, res) => {
    const result = await db.getNotifications();
    res.send(result)
  })
  
app.post('/add', async (req, res) => { 
    console.log(req.body)
    const notification = {
            component: req.body.component,
            status: req.body.status,
            timeSent: Date.now()
    }
    await db.saveNotification(notification)
    res.send("OK")

})
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  db.endPool