import express from 'express';
// import cors from 'cors';
import process from 'node:process';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
// app.use(cors());
app.use(express.json());

app.get('/properties', (req, res) => {});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
