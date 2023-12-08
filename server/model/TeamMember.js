const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  role: {
    type: String,
    enum: ['regular', 'admin']
  }
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
