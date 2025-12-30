const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

const debugAdmin = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
          console.log(`MongoDB Connected: ${conn.connection.host}`);

          // Find admin
          const admin = await Admin.findOne({ username: 'admin' });

          if (admin) {
               console.log('--- ADMIN USER FOUND ---');
               console.log('ID:', admin._id);
               console.log('Username:', admin.username);
               console.log('Password (Stored):', admin.password);
               console.log('------------------------');

               // Test match
               const isMatch = await admin.matchPassword('admin123');
               console.log(`Testing password 'admin123': ${isMatch ? 'MATCH' : 'FAIL'}`);
          } else {
               console.log('❌ ADMIN USER NOT FOUND');
          }

          process.exit();
     } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1);
     }
};

debugAdmin();
