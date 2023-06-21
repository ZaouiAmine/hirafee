import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto'
console.clear();

//connect to NATS (stan refers to client)
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

  const options = stan
  .subscriptionOptions()
  .setManualAckMode(true) // if anything goes wrong on our event we wont recieve any
  .setDeliverAllAvailable()//re Deliver all the list of emmitted events
  .setDurableName('profile-service'); //set along with the precedent option to list durable subscriptions
  //nats will create a record to all durable subs that we will have
  const sub = stan.subscribe(
    'user:created', 
    'queue-group-name', //persisting the durablename //all events go to one instance of our services
    options);

  sub.on('message',(msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string'){
        console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack(); //acknowledge incoming msgs
  });
});

//add two handlers to handle the close of the process
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close()); 