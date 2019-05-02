const express = require('express');
const app = express();
const path = process.cwd();

app.use(express.json());


app.listen(3000, function() {
    console.log('server is up and running...');
});