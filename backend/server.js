const express = require('express');
const cors = require('cors');
const mongodbService = require('./mongodb.service');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.post('/api/notes', async (req, res) => {
    try {
        if (!req.body || !req.body.title || !req.body.content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const result = await mongodbService.createNote('notes', req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await mongodbService.getNotes('notes');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/notes/:id', async (req, res) => {
    try {
        const note = await mongodbService.getNoteById('notes', req.params.id);
        res.json(note);
    } catch (error) {
        if (error.message === 'Note not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/notes/:id', async (req, res) => {
    try {
        if (!req.body || !req.body.title || !req.body.content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const result = await mongodbService.updateNote('notes', req.params.id, req.body);
        res.json(result);
    } catch (error) {
        if (error.message === 'Note not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const result = await mongodbService.deleteNote('notes', req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Note not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 