const TeamMember = require("../model/TeamMember");

exports.addTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    const savedMember = await newMember.save();
    res.status(201).send(savedMember);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllTeamMember = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({});
    res.status(200).send(teamMembers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).send({ message: "Team member not found." });
    }
    res.status(200).send(teamMember);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editTeamMember = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(404).send({ message: "Team member not found." });
    }
    res.status(200).send(updatedMember);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).send({ message: "Team member not found." });
    }
    res.status(200).send({ message: "Team member successfully deleted." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting team member.", error: error });
  }
};
