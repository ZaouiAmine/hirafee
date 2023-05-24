import express, {Request, Response} from 'express';

const router = express.Router();
router.post('/api/gigs', (req: Request, res: Response)=> {
    res.sendStatus(200);

});
export {router as createGigsRouter};