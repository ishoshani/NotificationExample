const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')


const db = require('./db')

const app = express()
const port = 3001
app.use(bodyParser.json())
// Points to the frontend side of the app and serves the build frontend from there on "/"
app.use(express.static(path.join(__dirname,"../../frontend-app/","build")))
db.initDB()

//used to get the list of notifications
app.get('/list', async (req, res) => {
    const result = await db.getNotifications();
    res.send(result)
  })
  
//used to add a notification(not used by user, for testing purpose. )
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

