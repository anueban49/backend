import express from 'express';
const app = express();
const port = 4049;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port 4049`)
})
