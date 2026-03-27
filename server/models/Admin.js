const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
     username: {
          type: String,
          required: true,
          unique: true
     },
     password_hash: {
          type: String,
          required: true
     },
     role: {
          type: String,
          default: "admin"
     }
}, {
     timestamps: true
});

const bcrypt = require('bcryptjs');


AdminSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password_hash);
};

module.exports = mongoose.model('Admin', AdminSchema);