import express from 'express'
import connectDB from './config/db.js'
import componentRoutes from './routes/componentRoutes.js'

const port = process.env.PORT || 8000;

connectDB();    //Connect to mongoDB

const app = express();

//BODY PARSER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/components', componentRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) });