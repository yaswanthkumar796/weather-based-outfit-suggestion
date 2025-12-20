const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
     username: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     }
}, {
     timestamps: true
});

// Match user entered password to password in database (Plain Text)
AdminSchema.methods.matchPassword = async function (enteredPassword) {
     return enteredPassword === this.password;
};

module.exports = mongoose.model('Admin', AdminSchema);