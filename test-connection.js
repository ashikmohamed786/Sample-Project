const http = require('http');

console.log('🔍 Testing server connection...\n');

// Test if server is running
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log('✅ Server is running!');
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📄 Response:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.log(data);
    }
    console.log('\n🎉 Connection test successful!');
    console.log('You can now access: http://localhost:5000');
  });
});

req.on('error', (error) => {
  console.log('❌ Connection failed:', error.message);
  console.log('\n🔧 Troubleshooting steps:');
  console.log('1. Make sure the server is running: node server.js');
  console.log('2. Check if port 5000 is available');
  console.log('3. Try running: start-server-debug.bat');
});

req.on('timeout', () => {
  console.log('⏰ Connection timeout - server might not be running');
  req.destroy();
});

req.end();