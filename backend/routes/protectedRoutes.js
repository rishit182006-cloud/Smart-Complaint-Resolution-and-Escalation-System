const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");




//  General protected route (any logged-in user)
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});



//  Only admin
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});



// Staff + Supervisor
router.get(
  "/staff",
  protect,
  authorizeRoles("staff", "supervisor"),
  (req, res) => {
    res.json({ message: "Staff/Supervisor access granted" });
  }
);



module.exports = router;