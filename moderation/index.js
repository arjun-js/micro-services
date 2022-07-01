const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res)=>{
    const {type, data} = req.body;
    await handleEvent(type, data);
    res.send({});
});

async function handleEvent(type, data){
    if(type==='CommentCreated'){
        const status = data.content && data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
         type : 'CommentModerated',
         data : {
            ...data,
            status: status 
         }
        });
    } 
}

app.listen(4003, async ()=>{
    console.log('Listening on 4003');

    try{
    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let event of res.data){
        console.log('processing event', event.type);
    handleEvent(event.type, event.data);
    }
}
catch(err){
    console.log(err);

}
});