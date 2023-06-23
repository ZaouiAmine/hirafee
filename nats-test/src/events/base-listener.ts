
import nats, {Message, Stan} from 'node-nats-streaming';

// add an abstract class to easily create listners
export abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;
  
    constructor(client: Stan) {
      this.client = client;
    }
  
    subscriptionOptions() {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable() //re Deliver all the list of emmitted events
        .setManualAckMode(true) // if anything goes wrong on our event we wont recieve any
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName);//set along with the precedent option to list durable subscriptions
          //nats will create a record to all durable subs that we will have
  
    }
  
    listen() {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroupName,
        this.subscriptionOptions()
      );
  
      subscription.on('message', (msg: Message) => {
        console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
  
        const parsedData = this.parseMessage(msg);
        this.onMessage(parsedData, msg);
      });
    }
  
    parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'));
    }
  }