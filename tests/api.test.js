const app = require('../src/server');
const request = require('supertest');

describe('Backend API Tests', () => {
  
  describe('Health Check', () => {
    test('GET /health should return 200', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('Users API', () => {
    test('GET /api/users should return list of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });

    test('GET /api/users/:id should return a user', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
    });

    test('GET /api/users/:id with invalid id should return 404', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Data API', () => {
    test('POST /api/data should create new data entry', async () => {
      const response = await request(app)
        .post('/api/data')
        .send({ title: 'Test Entry', description: 'Test Description' });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Entry');
    });

    test('POST /api/data without title should return 400', async () => {
      const response = await request(app)
        .post('/api/data')
        .send({ description: 'No Title' });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('GET /api/data should return data entries', async () => {
      const response = await request(app).get('/api/data');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('Echo API', () => {
    test('GET /api/echo/:message should return echo', async () => {
      const response = await request(app).get('/api/echo/hello');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('hello');
    });
  });

  describe('Stats API', () => {
    test('GET /api/stats should return statistics', async () => {
      const response = await request(app).get('/api/stats');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.statistics).toHaveProperty('totalUsers');
      expect(response.body.statistics).toHaveProperty('totalDataEntries');
    });
  });

  describe('404 Handler', () => {
    test('Invalid route should return 404', async () => {
      const response = await request(app).get('/invalid-route');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });
});
