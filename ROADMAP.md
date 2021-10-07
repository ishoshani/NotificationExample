# Websocket
At the moment, the notifications on the frontend are updated on rerender. However, I would like it if we set up a websocket so that we can tell the page to update the notification as soon as one is added wihout polling with a websocket connection

# Read/Unread messages
Currently, the notifications do not have a stucture to know if they are read or unread and it is not displayed, instead simply the number of total notifications is shown. I'd like to add that structure so the number on the button is the number of unread notifications.

# Build Process
With more time, I would like to streamline the build process so that you don't need to build the front end and serve it on a separate command. 
