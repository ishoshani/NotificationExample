
const { Client, Pool } = require('pg')
const client = new Pool({
    user:"postgres",
    host:"localhost",
    database:"postgres",
    password:"",
    port:5432
})

 const initDB = async () => {
 await client.connect()
 const res = await client.query(`CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
     ID serial PRIMARY KEY,
     COMPONENT varchar(32),
     STATUS varchar(32),
     TIME TIMESTAMP
     );
     `);
    console.log(res)
}

   const saveNotification = async (notification) => {
    await client.connect()
    const res = await client.query(`INSERT INTO NOTIFICATIONS(COMPONENT,STATUS,TIME) VALUES(
        $1,
        $2,
        to_timestamp($3))
        RETURNING ID`, [notification.component, notification.status, notification.timeSent])
    console.log(res)
}
    const getNotifications = async() => {
        await client.connect()
        const result = []
        console.log("getting query")
        const res = await client.query('SELECT * FROM NOTIFICATIONS ORDER BY time DESC')
        res.rows.forEach( row => {
               result.push({component:row.component,status:row.status,timeSent:Date.parse(row.time)}) 
        });
        console.log(result);
        return result;
    }
const endPool = async() => {
    client.end()
}

module.exports= {initDB, saveNotification, getNotifications, endPool}