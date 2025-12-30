const Admin = require('../models/Admin');
const Request = require('../models/Request');
const Outfit = require('../models/Outfit');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
     });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = async (req, res) => {
     const { username, password } = req.body;
     console.log('Login attempt:', { username });

     const admin = await Admin.findOne({ username });

     if (admin && (await admin.matchPassword(password))) {
          console.log('Login successful');
          res.json({
               _id: admin._id,
               username: admin.username,
               token: generateToken(admin._id),
          });
     } else {
          console.log('Invalid credentials');
          res.status(401).json({ message: 'Invalid username or password' });
     }
};

// @desc    Get all outfit requests
// @route   GET /api/admin/requests
// @access  Private/Admin
const getRequests = async (req, res) => {
     try {
          const requests = await Request.find({ status: 'Pending' }).sort({ createdAt: -1 });
          res.json(requests);
     } catch (error) {
          res.status(500).json({ message: 'Server Error' });
     }
};

// @desc    Approve a request
// @route   POST /api/admin/requests/:id/approve
// @access  Private/Admin
const approveRequest = async (req, res) => {
     try {
          const request = await Request.findById(req.params.id);

          if (!request) {
               return res.status(404).json({ message: 'Request not found' });
          }

          // Create new Outfit from Request
          const outfit = new Outfit({
               name: request.name,
               description: request.description,
               weatherCondition: request.weatherCondition,
               tempMin: request.tempMin,
               tempMax: request.tempMax,
               season: request.season,
               items: request.items,
               imageUrl: request.imageUrl,
               category: request.category
          });

          await outfit.save();

          // Update Request status
          request.status = 'Approved';
          await request.save();

          res.json({ message: 'Outfit approved', outfit });
     } catch (error) {
          res.status(500).json({ message: 'Server Error', error: error.message });
     }
};

// @desc    Reject a request
// @route   POST /api/admin/requests/:id/reject
// @access  Private/Admin
const rejectRequest = async (req, res) => {
     try {
          const request = await Request.findById(req.params.id);

          if (!request) {
               return res.status(404).json({ message: 'Request not found' });
          }

          request.status = 'Rejected';
          await request.save();

          res.json({ message: 'Request rejected' });
     } catch (error) {
          res.status(500).json({ message: 'Server Error' });
     }
};

// @desc    Create an initial admin (Utility route, remove in production or secure it)
// @route   POST /api/admin/seed
// @access  Public
const seedAdmin = async (req, res) => {
     const { username, password } = req.body;
     try {
          const adminExists = await Admin.findOne({ username });
          if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

          const bcrypt = require('bcryptjs');
          const salt = await bcrypt.genSalt(10);
          const password_hash = await bcrypt.hash(password, salt);

          const admin = await Admin.create({ username, password_hash });
          res.status(201).json({
               _id: admin._id,
               username: admin.username,
               createdAt: admin.createdAt
          });
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
}

module.exports = {
     authAdmin,
     getRequests,
     approveRequest,
     rejectRequest,
     seedAdmin
};
