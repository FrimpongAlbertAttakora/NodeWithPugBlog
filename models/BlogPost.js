const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema({
  post: {
    type: String,
    require: true
    },
  title: {
    type: String,
    require: true
    },
  author: {
    type: String,
    require: true
    },
  photo: {
    type: String,
    require: true
    },
  comment: [{
      date: {
        type: Array(Date),
        default: Date.now
      },
      commentauthor: {
        type: Array(String),
        require: true
      },  
      commenttext: {
        type: Array(String),
        require: true
      }  
  }],
  date: {
    type: Date,
    default: Date.now
  },  
});

module.exports = mongoose.model('blogPost', BlogPostSchema);