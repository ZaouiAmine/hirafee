import request from 'supertest';
import { app } from '../../app';

//we will test that there is some routehandlers present at api/gigs
//that will rspond to a post request and auth (a user must be signedin)
//and some test to make sure that a gig is created

it ('has a route handler listning to /api/gigs for post requets ',async ( ) =>{
    const response =await request (app)
    .post('/api/gigs')
    .send({});
    expect (response.status).not.toEqual(404);
});


it ('can only be accessed by a signed client',async ( ) =>{
    await request (app)
    .post('/api/gigs')
    .send({});
    expect (401);
});





