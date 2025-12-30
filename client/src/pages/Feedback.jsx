import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        message: ''
    });
    const [status, setStatus] = useState({
        submitting: false,
        error: null,
        success: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, error: null, success: false });

        try {
            await axios.post('http://localhost:5000/api/feedback', formData);
            setStatus({ submitting: false, error: null, success: true });
            setFormData({ name: '', email: '', rating: 5, message: '' });
        } catch (err) {
            setStatus({
                submitting: false,
                error: err.response?.data?.message || 'Something went wrong. Please try again.',
                success: false
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Share Your Feedback
                    </h1>
                    <p className="text-blue-200/80 text-lg">
                        Help us improve WeatherFit with your suggestions and reviews.
                    </p>
                </div>

                {/* Feedback Form */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {status.success ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                <span className="text-4xl text-emerald-400">✓</span>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2 text-emerald-400">Thank You!</h2>
                            <p className="text-blue-100/70 mb-8">Your feedback has been submitted successfully.</p>
                            <button
                                onClick={() => setStatus({ ...status, success: false })}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-all font-medium"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-2 pl-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-blue-200 mb-2 pl-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-2 pl-1">Rating</label>
                                <div className="flex items-center gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, rating: num }))}
                                            className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-all ${formData.rating >= num
                                                    ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                                                    : 'bg-white/5 border-white/10 text-white/40'
                                                }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                    <span className="ml-2 text-yellow-400 font-medium">{formData.rating} / 5</span>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-2 pl-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you think..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-white/20 resize-none"
                                ></textarea>
                            </div>

                            {/* Error Message */}
                            {status.error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                    {status.error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status.submitting}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${status.submitting
                                        ? 'bg-blue-600/50 cursor-not-allowed text-white/50'
                                        : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                            >
                                {status.submitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Note */}
                <p className="text-center mt-8 text-blue-200/40 text-sm">
                    Your feedback is important to us. We regularly review all submissions.
                </p>
            </div>
        </div>
    );
};

export default Feedback;
