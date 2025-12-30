const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;

        const feedback = new Feedback({
            name,
            email,
            rating,
            message
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: feedback
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        console.log('GET /api/feedback - Fetching all feedback...');
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        console.log(`Found ${feedback.length} feedback items.`);

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error('Error in getAllFeedback:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    submitFeedback,
    getAllFeedback
};
