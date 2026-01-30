const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🚀 Testing Book My Film API...\n');
  
  try {
    // Test 1: Get all movies
    console.log('1. Testing GET /movies');
    const moviesResponse = await axios.get(`${BASE_URL}/movies`);
    console.log(`✅ Movies endpoint working - Found ${moviesResponse.data.length} movies\n`);
    
    // Test 2: Get all theaters
    console.log('2. Testing GET /theaters');
    const theatersResponse = await axios.get(`${BASE_URL}/theaters`);
    console.log(`✅ Theaters endpoint working - Found ${theatersResponse.data.length} theaters\n`);
    
    // Test 3: Test user registration
    console.log('3. Testing POST /auth/register');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      phone: '1234567890',
      preferredLanguage: 'english'
    };
    
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ User registration working');
    console.log(`   User ID: ${registerResponse.data.user.id}`);
    console.log(`   Token received: ${registerResponse.data.token ? 'Yes' : 'No'}\n`);
    
    // Test 4: Test user login
    console.log('4. Testing POST /auth/login');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login working');
    console.log(`   Token received: ${loginResponse.data.token ? 'Yes' : 'No'}\n`);
    
    // Test 5: Test protected route
    console.log('5. Testing GET /auth/profile (protected)');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`
      }
    });
    console.log('✅ Protected route working');
    console.log(`   User name: ${profileResponse.data.name}\n`);
    
    console.log('🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data?.message || error.message);
    if (error.response?.status) {
      console.error(`   Status: ${error.response.status}`);
    }
  }
}

// Run tests
testAPI();