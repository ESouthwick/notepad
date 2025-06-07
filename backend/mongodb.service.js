const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// Debug logging for environment variables
console.log('Environment variables loaded:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

const uri = process.env.MONGODB_URI;

// Debug logging for URI
console.log('MongoDB URI format check:');
console.log('URI starts with mongodb:// or mongodb+srv://:', 
    uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

class MongoDBService {
    constructor() {
        this.client = client;
        this.dbName = 'notepad';
        this.connectionStatus = 'disconnected';
    }

    async connect() {
        try {
            console.log('Attempting to connect to MongoDB...');
            await this.client.connect();
            this.connectionStatus = 'connected';
            console.log(`[${new Date().toISOString()}] Successfully connected to MongoDB!`);
            console.log(`Database: ${this.dbName}`);
            return this.client.db(this.dbName);
        } catch (error) {
            this.connectionStatus = 'error';
            console.error(`[${new Date().toISOString()}] Error connecting to MongoDB:`, error);
            throw error;
        }
    }

    async close() {
        try {
            console.log('Attempting to close MongoDB connection...');
            await this.client.close();
            this.connectionStatus = 'disconnected';
            console.log(`[${new Date().toISOString()}] MongoDB connection closed successfully`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error closing MongoDB connection:`, error);
            throw error;
        }
    }

    // CRUD Operations
    async createNote(collection, note) {
        try {
            console.log(`[${new Date().toISOString()}] Creating new note in collection: ${collection}`);
            const db = await this.connect();
            const result = await db.collection(collection).insertOne(note);
            console.log(`[${new Date().toISOString()}] Note created successfully with ID: ${result.insertedId}`);
            return result;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error creating note:`, error);
            throw error;
        }
    }

    async getNotes(collection) {
        try {
            console.log(`[${new Date().toISOString()}] Fetching all notes from collection: ${collection}`);
            const db = await this.connect();
            const notes = await db.collection(collection).find({}).toArray();
            console.log(`[${new Date().toISOString()}] Successfully retrieved ${notes.length} notes`);
            return notes;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error getting notes:`, error);
            throw error;
        }
    }

    async updateNote(collection, id, updatedNote) {
        try {
            console.log(`[${new Date().toISOString()}] Updating note with ID: ${id} in collection: ${collection}`);
            const db = await this.connect();
            
            // Remove _id from the update data if it exists
            const { _id, ...updateData } = updatedNote;
            
            const result = await db.collection(collection).updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            if (result.matchedCount === 0) {
                throw new Error('Note not found');
            }
            console.log(`[${new Date().toISOString()}] Note updated successfully. Modified count: ${result.modifiedCount}`);
            return result;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating note:`, error);
            throw error;
        }
    }

    async deleteNote(collection, id) {
        try {
            console.log(`[${new Date().toISOString()}] Deleting note with ID: ${id} from collection: ${collection}`);
            const db = await this.connect();
            const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error('Note not found');
            }
            console.log(`[${new Date().toISOString()}] Note deleted successfully. Deleted count: ${result.deletedCount}`);
            return result;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error deleting note:`, error);
            throw error;
        }
    }

    async getNoteById(collection, id) {
        try {
            console.log(`[${new Date().toISOString()}] Fetching note with ID: ${id} from collection: ${collection}`);
            const db = await this.connect();
            const note = await db.collection(collection).findOne({ _id: new ObjectId(id) });
            if (!note) {
                throw new Error('Note not found');
            }
            console.log(`[${new Date().toISOString()}] Successfully retrieved note`);
            return note;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error getting note by ID:`, error);
            throw error;
        }
    }
}

module.exports = new MongoDBService(); 