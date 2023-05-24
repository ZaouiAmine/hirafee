import express, {Request, Response} from 'express';
import { requireAuth } from '@hirafee/common';
const router = express.Router();


router.post('/api/gigs', requireAuth ,(req: Request, res: Response)=> {
    res.sendStatus(200);

});
export {router as createGigsRouter};