require('dotenv').config();
const server = require('./src/app.js');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    server.listen(3001, () => {
      console.log("Server 3001 portunda dinleniyor");
    });
  })
  .catch((err) => console.log(err));
