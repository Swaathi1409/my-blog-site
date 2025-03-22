import express from 'express';
import fs from 'fs';
import path from 'path';
import { db, connectToDb } from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'../dist')));

app.get(/^(?!\/api).+/, (req, res)=> {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// In your server.js
app.use(cors({
    origin: 'http://localhost:5173', // or whatever port your React app is running on
    credentials: true
}));

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    
    // Get user ID from auth token if available
    let userId = null;
    if (req.headers.authtoken) {
        // You'll need to implement extracting user ID from token
        // This is a placeholder
        userId = req.headers.authtoken; // Replace with proper token verification
    }

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        // Calculate if the user can upvote based on upvotedBy array
        const canUpvote = userId && (!article.upvotedBy || !article.upvotedBy.includes(userId));
        
        res.json({
            ...article,
            canUpvote: canUpvote || false
        });
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    
    // Get user ID from auth token
    if (!req.headers.authtoken) {
        return res.status(401).send("Authentication required");
    }
    
    // This is a placeholder - replace with proper token verification
    const userId = req.headers.authtoken; // Replace with proper token extraction

    const article = await db.collection('articles').findOne({ name });

    if (!article) {
        return res.status(404).send("That article doesn't exist");
    }

    // Ensure 'upvotedBy' array exists
    if (!article.upvotedBy) {
        article.upvotedBy = [];
    }

    // Check if user already upvoted
    if (article.upvotedBy.includes(userId)) {
        return res.status(400).send("User has already upvoted");
    }

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
        $push: { upvotedBy: userId }
    });

    const updatedArticle = await db.collection('articles').findOne({ name });
    
    // Add canUpvote flag (now false since they just upvoted)
    res.json({
        ...updatedArticle,
        canUpvote: false
    });
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    
    if (!req.headers.authtoken) {
        return res.status(401).send("Authentication required");
    }
    
    // This is a placeholder - replace with proper token verification
    const userId = req.headers.authtoken; // Replace with proper token extraction
    
    // You can get the email or user information however you're storing it
    // This example uses the request body's postedBy, but ideally you'd get this from your auth system
    const postedBy = req.body.postedBy || 'Anonymous';

    const article = await db.collection('articles').findOne({ name });

    if (!article) {
        return res.status(404).send("That article doesn't exist");
    }

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text, userId } },
    });

    const updatedArticle = await db.collection('articles').findOne({ name });
    
    // Calculate if the user can upvote
    const canUpvote = !updatedArticle.upvotedBy || !updatedArticle.upvotedBy.includes(userId);
    
    res.json({
        ...updatedArticle,
        canUpvote
    });
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log('Server is listening on port '+ PORT);
    });
});