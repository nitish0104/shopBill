const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = 1000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())


app.use(cors())

app.get('/', (req, res) => {
	res.send('Hello World!')
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})