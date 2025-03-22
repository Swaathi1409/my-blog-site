import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; // Add this

// Load environment variables
dotenv.config();

// Debug: check if password exists
console.log("MongoDB password loaded:", process.env.MONGO_PASSWORD ? "Yes" : "No");

// Create a global db variable
let db;

async function connectToDb(cb) {
    if (db) {
        // If already connected, just return the existing connection
        console.log("Using existing database connection");
        return cb(null);
    }
    
    try {
        // Make sure password is available
        if (!process.env.MONGO_PASSWORD) {
            throw new Error("MongoDB password not found in environment variables");
        }
        
        // Connect to MongoDB
        const client = new MongoClient(`mongodb+srv://swaathi1409:${process.env.MONGO_PASSWORD}@quillnest.xrddl.mongodb.net/?retryWrites=true&w=majority&appName=QuillNest`);
        
        await client.connect();
        
        // Assign to our db variable BEFORE calling the callback
        db = client.db('react-blog-db');
        
        console.log('Successfully connected to database!');
        
        // Call the callback with no error
        cb(null);
    } catch (err) {
        console.error('Database connection failed:', err);
        
        // Make sure db is null if connection failed
        db = null;
        
        // Call the callback with the error
        cb(err);
    }
}

export { db, connectToDb };