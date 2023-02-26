const mongoose = require('mongoose');

const users = require('./routes/users');
const express = require('express');
const app = express();


mongoose.connect('mongodb+srv://nipuni:wGjx21Dnt78Sq2MA@cluster0.oco4f.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))