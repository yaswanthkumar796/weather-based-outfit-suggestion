const axios = require('axios');

const testFeedback = async () => {
    try {
        console.log('--- Testing Feedback API ---');

        // 1. Submit Feedback
        console.log('\n1. Submitting test feedback...');
        const submitRes = await axios.post('http://localhost:5000/api/feedback', {
            name: "Test User",
            email: "test@example.com",
            rating: 5,
            message: "This is a test feedback message for verification."
        });
        console.log('✅ Submission Success:', submitRes.data.success);

        // 2. Fetch all feedback
        console.log('\n2. Fetching all feedback...');
        const fetchRes = await axios.get('http://localhost:5000/api/feedback');
        console.log('✅ Fetch Success:', fetchRes.data.success);
        console.log('📊 Feedback Count:', fetchRes.data.count);

        if (fetchRes.data.data.length > 0) {
            console.log('\nLatest Feedback Item:', JSON.stringify(fetchRes.data.data[0], null, 2));
        }

    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
    }
};

testFeedback();
