const express = require('express');
const app = express();


// body-parser
app.use(express.json());


//mount my api here
const apiRouter = require('./api/api');
app.use('/api', apiRouter);


// server port to listen to
const PORT = 8003;


// server running
app.listen(PORT, (req, res) => console.log(`server is running on port ${PORT}`));