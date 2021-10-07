
const { Client } = require('pg')

/**
 * helper to set up a new pg client
 * todo: convert to a better pool system without causing hanging. 
 * @returns
 */
const newClient = () => {
    return new Client({
        user:"postgres",
        host:"localhost",
        database:"postgres",
        password:"",
        port:5432
    })
}
    /**
     * Run at start, initialize table if it doesn't exist. 
     */
 const initDB = async () => {
     const client = newClient();
 await client.connect()
 const res = await client.query(`CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
     ID serial PRIMARY KEY,
     COMPONENT varchar(32),
     STATUS varchar(32),
     TIME TIMESTAMP
     );
     `);
     client.end()
}
/**
 * saves a notification to persistent memory.  
 */
   const saveNotification = async (notification) => {
    const client = newClient();
    await client.connect()
    const res = await client.query(`INSERT INTO NOTIFICATIONS(COMPONENT,STATUS,TIME) VALUES(
        $1,
        $2,
        to_timestamp($3))
        RETURNING ID`, [notification.component, notification.status, notification.timeSent])
    console.log(res)
    client.end();
}

/**
 * gets the current list of notifications, getting the latest first. 
 */
    const getNotifications = async() => {
        const client = newClient();
        await client.connect()
        const result = []
        const res = await client.query('SELECT * FROM NOTIFICATIONS ORDER BY time DESC')
        res.rows.forEach( row => {
               result.push({component:row.component,status:row.status,timeSent:Date.parse(row.time)}) 
        });
        client.end();
        return result;
    }

module.exports= {initDB, saveNotification, getNotifications}