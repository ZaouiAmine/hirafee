import nats from 'node-nats-streaming';

console.clear();
const stan = nats.connect('hirafee', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify ({
    userId: '1',
    firstName: 'malak',
    lastName: 'boudaa',
    phoneNumber: '0556882069',
    location: 'Constantine',
    biography: 'Je suis paintre expérimenté ',
    categorie: 'Painting'

  });

  stan.publish('user:created', data, ()=> {
    console.log ('Event published')
  })

});
