import express from 'express';
import { Profile } from '../models/profile';

const router = express.Router();

router.put('/api/profiles');

export {router as createRouter};