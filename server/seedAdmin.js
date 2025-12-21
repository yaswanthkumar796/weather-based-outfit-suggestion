const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
          console.log(`MongoDB Connected: ${conn.connection.host}`);

          // Hash password
          const salt = await bcrypt.genSalt(10);
          const password_hash = await bcrypt.hash('admin123', salt);

          // Check if admin exists
          let admin = await Admin.findOne({ username: 'admin' });

          if (admin) {
               console.log('Admin user exists. Updating password...');
               admin.password_hash = password_hash;
               // Clear legacy password field if exists
               if (admin.password) {
                    admin.password = undefined;
               }
               await admin.save();
               console.log('Admin password updated (hashed).');
          } else {
               // Create admin
               admin = await Admin.create({
                    username: 'admin',
                    password_hash: password_hash,
                    role: 'admin'
               });
               console.log('Admin user created successfully');
               console.log('Username: admin');
               console.log('Password: admin123 (now hashed in DB)');
          }

          process.exit();
     } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1);
     }
};

seedAdmin();
