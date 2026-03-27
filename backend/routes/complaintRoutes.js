const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus } = require("../controllers/complaintController");


  
// Only student can create complaint
router.post("/", protect, authorizeRoles("student"), createComplaint);



//  Student views own complaints
router.get("/my", protect, authorizeRoles("student"), getMyComplaints);



//  Staff / Supervisor / Admin view all
router.get(
  "/",
  protect,
  authorizeRoles("staff", "supervisor", "admin"),
  getAllComplaints
);



//  Update status
router.put(
  "/:id",
  protect,
  authorizeRoles("staff", "supervisor"),
  updateComplaintStatus
);



module.exports = router;