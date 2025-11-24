const axios = require('axios');

const testAuth = async () => {
    try {
        // 0. Register (ignore if exists)
        console.log('Attempting Registration...');
        try {
            await axios.post('http://localhost:4000/admin/register', {
                username: 'admin',
                password: '123'
            });
            console.log('Registration Successful');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('User already exists (expected)');
            } else {
                console.log('Registration Failed:', error.message);
            }
        }

        // 1. Login
        console.log('\nTesting Login...');
        const loginRes = await axios.post('http://localhost:4000/admin/login', {
            username: 'admin',
            password: '123'
        });
        console.log('Login Successful, Token:', loginRes.data.token ? 'Received' : 'Missing');
        const token = loginRes.data.token;

        // 2. Access Protected Route
        console.log('\nTesting Protected Route (/admin/me)...');
        const meRes = await axios.get('http://localhost:4000/admin/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Protected Route Access Successful:', meRes.data.username === 'admin');

        // 3. Access Protected Route without Token
        console.log('\nTesting Protected Route without Token...');
        try {
            await axios.get('http://localhost:4000/admin/me');
        } catch (error) {
            console.log('Access Denied as expected:', error.response.status === 401);
        }

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
};

testAuth();
