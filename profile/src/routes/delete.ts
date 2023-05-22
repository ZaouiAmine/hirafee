import express from 'express';


const router = express.Router();

router.delete('/api/profiles/delete_profile/:user_id');

export {router as deleteRouter};