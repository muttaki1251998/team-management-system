const TeamMember = require('../model/TeamMember');

exports.addTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    const savedMember = await newMember.save();
    res.status(201).send(savedMember);
  } catch (error) {
    res.status(400).send(error);
  }
};
