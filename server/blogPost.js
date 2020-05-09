const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');


//GET BACK ALL THE POSTS
router.get('/', async (req, res) => {
    try{
        const blogposts = await BlogPost.find().sort({date:-1});
            res.json(blogposts);
    }   catch(err){
            res.json({message: err});
    }
});

//ADD POST
router.post('/', async (req, res) => {
    const blogpost = new BlogPost({
        post: req.body.post,
        title: req.body.title,
        author: req.body.author,
        photo: req.body.photo,
    });
    try{
    const savedBlogPost = await blogpost.save()
    res.redirect('/');
    }catch(err){
        res.json({message: err});
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try{
        const removedBlogPost = await BlogPost.deleteOne({ _id: req.params.postId });
        res.json(removedBlogPost);
    }catch (err) {
        res.json({ message: err });
    }
});

//GET SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try{
        const post = await BlogPost.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({ message: err });
    }
});

// ADD COMMENT
router.patch('/comment/:postId', async (req, res) => {
    try{
    const updatedPostComment = await BlogPost.updateOne({ _id: req.params.postId }, 
        {
            $push: {
                comment: [{
                    author: req.body.comment.author,
                    text: req.body.comment.text   
            }]}      
            });
        res.json(updatedPostComment);
            }catch (err) {
                res.json({ message: err });
    }
});

//DELETE A COMMENT
router.patch('/comment/:postId/:commentId', async (req, res) => {
    try{
        const removedBlogComment = await BlogPost.findByIdAndUpdate(
            { _id: req.params.postId },
            { $pull: { "comment" : { _id: req.params.commentId }}},
            );
        res.json(removedBlogComment);
    }catch (err) {
        res.json({ message: err });
    }
});

// EDIT POST, TITLE, PHOTO AND AUTHOR
router.patch('/postEdit/:postId', async (req, res) => {
    try{
    const updatedPostComment = await BlogPost.updateMany({ _id: req.params.postId }, 
        {
            $set: {
                post: req.body.post,
                title: req.body.title,
                author: req.body.author,
                photo: req.body.photo,
            }      
            });
        res.json(updatedPostComment);
            }catch (err) {
                res.json({ message: err });
    }
});

module.exports = router;