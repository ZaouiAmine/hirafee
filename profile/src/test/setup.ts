 import {MongoMemoryServer} from 'mongodb-memory-server';
 import mongoose from 'mongoose';
 import {app} from '../app';

let mongo : any;
 // A hook that will run before all our test 
 beforeAll(async () =>{
   mongo = new MongoMemoryServer()
   await mongo.start()
   
   const uri = await mongo.getUri()

    await mongoose.connect(uri, {

    });
 });

 //another hook that will run berfore each test

 beforeEach(async () => {
    // its going to reset all our data before the test 
    // reach the mongodb and delete and reset all the data 
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections){
        await collection.deleteMany({});
    }
 });

 // another hook that's gonna run after all our completed tests
 afterAll (async () => {
    // stop mongodbmemoryserver
    // mongo disconnect 
    await mongo.stop();
    await mongoose.connection.close();
 })