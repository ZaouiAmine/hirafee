import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";


export class UserCreatedListener extends Listener {
    subject = 'user:created';
    queueGroupName= 'profile-service';
  
  
    onMessage(data: any, msg: Message): void {
      console.log('Event data!!!', data);
  
      msg.ack(); //acknowledge incoming msgs
    }
  
  }