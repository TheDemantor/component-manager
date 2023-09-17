import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import componentRoutes from './routes/componentRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';

import cors from 'cors';

const port = process.env.PORT || 8000;

connectDB();    //Connect to mongoDB

const app = express();

app.use(cors({
  credentials: true,
}));

//BODY PARSER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/components', componentRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.get('/', (req, res) => {
//   res.send('API is running....');
// });

if (process.env.NODE_ENV === 'production') {
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
      res.send('API is running....');
  });
}
app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) });