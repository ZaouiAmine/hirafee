import express from 'express';
import { Profile } from '../models/profile';

const router = express.Router();

router.put('/api/profiles/modify_profile/:user_id');

export {router as modifyRouter};