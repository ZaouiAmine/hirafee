import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto'
console.clear();

//connect to NATS
const stan = nats.connect('hirafee', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');


// disconect from the running server 
stan.on('close', () =>{

  console.log('NATS connection closed');
  process.exit();

});

  const options = stan.subscriptionOptions()
  .setManualAckMode(true); 
  // if anything goes wrong on our event we wont recieve any 

  const sub = stan.subscribe(
    'user:created', 
    'Profile-service-queue-group',
    options);

  sub.on('message',(msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string'){
        console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();

  });

});

//add two handlers to handle the close of the process
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close()); 