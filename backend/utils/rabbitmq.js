const amqp=require('amqplib');

let channel=null;

async function setupDelayedArchitecture() {
    try{
        const connection=await amqp.connect({
            protocol:'amqp',
            hostname:'localhost',
            port:5672,
            username: 'ceastin',
            password: 'sahilsri'
        });
        channel =await connection.createChannel();

        const mainExchange= 'main_exchange';
        const mainQueue='main_q';
        const waitingQueue='waiting_room_q';
        const routingKey='reminder_task';

        await channel.assertExchange(mainExchange, 'direct',{durable:true});//only send if the zip code matches exactly
        await channel.assertQueue(mainQueue,{durable:true});//main queue mail box  where  orker server will eventually listen
        await channel.bindQueue(mainQueue,mainExchange,routingKey);//to main exchange if recive a message tagged zipcode- reminder_task drop into mainq

        await channel.assertQueue(waitingQueue,{
            durable:true,
            arguments:{
                'x-dead-letter-exchange': mainExchange,
                'x-dead-letter-routing-key': routingKey
            }
        });
        console.log("✅ RabbitMQ: Delayed Architecture initialized.");
    }
    catch(error){
        console.error("RabbitMQ Connection Error:",error);
    }
}

async function sendDelayedRemider(data,delayInMs) {
    if(!channel) await setupDelayedArchitecture();
    const queueName='main_q';   
    channel.sendToQueue('waiting_room_q',Buffer.from(JSON.stringify(data)),{
        persistent:true,
        expiration: delayInMs.toString()
    });

    console.log(` Scheduled reminder to fire in ${Math.round(delayInMs/60000)} minutes.`);
}
module.exports={setupDelayedArchitecture,sendDelayedRemider};