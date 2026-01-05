import express from 'express';
import productRoutes from './routes/productRoutes';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/v1', productRoutes);  // Base URL: http://localhost:3000/v1

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});