const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_db_connection_string' with your actual MongoDB connection string)
mongoose.connect('your_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Define Mongoose schemas and models for Project, Category, and Task

// Example Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  progress: Number,
});

const Task = mongoose.model('Task', taskSchema);

// API routes for CRUD operations

// Example route to create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTask = new Task({ title, description, deadline, progress: 0 });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add routes for updating, deleting, and retrieving tasks

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
