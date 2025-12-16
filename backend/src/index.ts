import express from 'express';
const app = express();
const port = 4049;

app.use(express.json()); 

const arr: string[] = [];

app.get('/', (req, res) => {
  res.json(arr)
})
app.post('/', (req, res) => {
  const data = req.body
  console.log("data: ", data)
  res.send('success')
})
app.listen(port, () => {
  console.log(`Example app listening on port 4049`)
})
