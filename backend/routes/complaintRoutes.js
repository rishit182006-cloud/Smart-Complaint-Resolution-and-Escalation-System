const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  assignComplaint,
  getAssignedComplaints } = require("../controllers/complaintController");


  
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



//  Get assigned complaints
router.get(
  "/assigned",
  protect,
  authorizeRoles("staff", "supervisor"),
  getAssignedComplaints
);



//  Assign complaint
router.put(
  "/assign/:id",
  protect,
  authorizeRoles("admin", "supervisor"),
  assignComplaint
);



//  Update status
router.put(
  "/:id",
  protect,
  authorizeRoles("staff", "supervisor"),
  updateComplaintStatus
);



module.exports = router;