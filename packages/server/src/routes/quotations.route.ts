import { Router, type Request, type Response } from 'express';
import Quotation from '../models/quotation.model';

const quotationsRoutes = Router();

quotationsRoutes.get('/', async (req: Request, res: Response) => {
  const quotations = await Quotation.find().populate('project').lean();

  res.status(200).json({ success: true, data: quotations });
});

quotationsRoutes.get('/:id', (req: Request, res: Response) => {
  res.send(`Get quotation with ID ${req.params.id}`);
});

quotationsRoutes.post('/', (req: Request, res: Response) => {
  res.send('Create a new quotation');
});

quotationsRoutes.put('/:id', (req: Request, res: Response) => {
  res.send(`Update quotation with ID ${req.params.id}`);
});

quotationsRoutes.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete quotation with ID ${req.params.id}`);
});

export default quotationsRoutes;
