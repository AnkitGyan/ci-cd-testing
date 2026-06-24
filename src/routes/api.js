const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// In-memory data store for testing
const store = {
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'user' }
  ],
  data: []
};

// Get all users
router.get('/users', (req, res) => {
  try {
    logger.info('Fetching all users');
    res.status(200).json({
      success: true,
      count: store.users.length,
      data: store.users
    });
  } catch (error) {
    logger.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = store.users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    logger.info(`Fetched user: ${user.name}`);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error fetching user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new data entry
router.post('/data', (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }
    
    const newData = {
      id: store.data.length + 1,
      title,
      description: description || '',
      createdAt: new Date().toISOString()
    };
    
    store.data.push(newData);
    logger.info(`New data entry created: ${title}`);
    
    res.status(201).json({
      success: true,
      message: 'Data entry created successfully',
      data: newData
    });
  } catch (error) {
    logger.error('Error creating data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all data
router.get('/data', (req, res) => {
  try {
    logger.info('Fetching all data entries');
    res.status(200).json({
      success: true,
      count: store.data.length,
      data: store.data
    });
  } catch (error) {
    logger.error('Error fetching data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Echo endpoint
router.get('/echo/:message', (req, res) => {
  try {
    const { message } = req.params;
    logger.info(`Echo request: ${message}`);
    
    res.status(200).json({
      success: true,
      message: `Echo: ${message}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error in echo endpoint', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Statistics endpoint
router.get('/stats', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      statistics: {
        totalUsers: store.users.length,
        totalDataEntries: store.data.length,
        serverTime: new Date().toISOString(),
        uptime: process.uptime()
      }
    });
  } catch (error) {
    logger.error('Error fetching stats', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
