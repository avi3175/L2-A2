import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './modules/users/users.route'; 

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || '';

app.get('/', (req, res) => {
  res.send('Hello World, programmer!');
});

app.use('/api/users', usersRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

async function startServer() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to the database.');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); 
  }
}

startServer();

export default app;
