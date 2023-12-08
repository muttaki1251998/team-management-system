const express = require('express');
const router = express.Router();
const { addTeamMember } = require('../controllers/memberController');

router.post('/add-member', addTeamMember);

module.exports = router;

