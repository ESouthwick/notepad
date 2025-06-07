require('dotenv').config();

console.log('Testing environment variables:');
console.log('Current working directory:', process.cwd());
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'exists' : 'missing');
console.log('PORT:', process.env.PORT); 