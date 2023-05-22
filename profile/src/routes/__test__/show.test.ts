import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Profile } from '../../models/profile';



it('fetches the profile', async () => {
    const profile = Profile.build({
      email: 'concert',
      password: 'malak',
    });
    await profile.save();});