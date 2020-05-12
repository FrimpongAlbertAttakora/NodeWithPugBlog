const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

// Middlewares
require('dotenv/config');
app.use(cors());
app.use(bodyParser.json());

// Body Parser Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Import routes
const contactRoute = require('./server/blogPost');
app.use('/post', contactRoute);

// Serving static folder
app.use(express.static(path.join(__dirname, 'public'))); 

//Set Pug
app.set('view engine', 'pug');

//Pug Routes/Request
app.get('/', async (req, res) => {
    const query = await axios.get('http://localhost:1800/post');
    res.render('index', { posts: query.data });
  });

app.get('/postItem/:id', async (req, res) => {
    const query = await axios.get('http://localhost:1800/post/' + req.params.id);
    const queryPost = await axios.get('http://localhost:1800/post/');
    res.render('postItem', { 
      postItem: query.data, 
      posts: queryPost.data, 
      id: req.params.id,
     });
  });

app.get('/blog', async (req, res) => {
    const query = await axios.get('http://localhost:1800/post');
    res.render('blog', { posts: query.data });
  });

app.get('/admin', async (req, res) => {
    const query = await axios.get('http://localhost:1800/post');
    res.render('admin', { posts: query.data });
  });

// Connect to DB
mongoose.connect( 
    process.env.DB_CONNECTION, 
    {  useNewUrlParser: true ,
       useUnifiedTopology: true, 
    },
    () => console.log('Connected to DB')
);

const port = process.env.PORT || 1800;
app.listen(port, () => console.log(`server started on port ${port}`));
