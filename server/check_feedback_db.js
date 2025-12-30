const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Feedback = require('./models/Feedback');

dotenv.config();

const checkFeedback = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Feedback.countDocuments();
        const items = await Feedback.find();
        console.log('--- FEEDBACK CHECK ---');
        console.log('Count:', count);
        console.log('Items:', JSON.stringify(items, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkFeedback();
