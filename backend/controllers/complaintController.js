const Complaint = require("../models/Complaint");

// Create complaint (student)
const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      user: req.user.id, // from token
    });

    res.status(201).json({
      message: "Complaint created",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  Get logged-in user's complaints (student)
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  Get all complaints (staff/supervisor/admin)
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate(
      "user",
      "name email"
    );

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update complaint status (staff/supervisor)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // update status
    complaint.status = status || complaint.status;

    await complaint.save();

    res.status(200).json({
      message: "Complaint updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔥 EXPORT ALL FUNCTIONS
module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
};

