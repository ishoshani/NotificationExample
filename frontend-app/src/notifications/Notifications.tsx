import { Button, Card, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

interface notification{
    component: string,
    status: string,
    timeSent: Date
}

/**
 * Helper method to make an axios request to our list notification list endpoint. 
 * @returns Promise<notification[]>
 */
const getAPINotifications = async () : Promise<notification[]> => {
    const res = await axios.get("/list");
    if(res.status == 200){
        const data = res.data as notification[]
        data.forEach(note => {
            note.timeSent = new Date(note.timeSent);
        })
        return data
    }
    else{
        console.error("Something went wrong with the request: "+res.statusText)
        return [];
    }

}


const Notifications = () => {
    const [notes,setNotes] = useState<notification[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    getAPINotifications().then(res => setNotes(res));    

    const noteComponent: any[] = []
        notes.forEach(note => {       
            noteComponent.push(
                (<Card>
                <Typography>
                    {note.component}: {note.status} priority
                </Typography>
            </Card>)
        )
    })

    
    return (<div>
       <Paper>
        {!open ?
        <Button onClick={() => setOpen(true)}>Show Notifications({notes.length})</Button>
        :
        <div>
        <Button onClick={() => setOpen(false)}>Hide Notifications</Button>
        {noteComponent}
        </div>
        }
       </Paper>
    </div>)
}

export default Notifications;