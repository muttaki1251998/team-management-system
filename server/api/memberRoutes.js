const express = require('express');
const router = express.Router();
const { addTeamMember, getAllTeamMember, editTeamMember, deleteTeamMember, getMember } = require('../controllers/memberController');

router.post('/add-member', addTeamMember);
router.get('/get-members', getAllTeamMember);
router.get('/get-member/:id', getMember);
router.put('/update-member/:id', editTeamMember);
router.delete('/delete/:id', deleteTeamMember);

module.exports = router;
 
