const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
          console.log(`MongoDB Connected: ${conn.connection.host}`);

          // Check if admin exists
          let admin = await Admin.findOne({ username: 'admin' });

          if (admin) {
               console.log('Admin user exists. Updating password...');
               admin.password = 'admin123';
               await admin.save();
               console.log('Admin password reset to: admin123');
          } else {
               // Create admin
               admin = await Admin.create({
                    username: 'admin',
                    password: 'admin123'
               });
               console.log('Admin user created successfully');
               console.log('Username: admin');
               console.log('Password: admin123');
          }

          process.exit();
     } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1);
     }
};

seedAdmin();
