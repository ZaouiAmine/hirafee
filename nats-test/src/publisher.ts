import nats from 'node-nats-streaming'


const stan = nats.connect('hirafee','abc',{
    url: 'http://localhost:4222'
});
stan.on('connect',()=>{
    console.log("publisher connected to NATS");
})