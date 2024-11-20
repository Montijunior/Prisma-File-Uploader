const { Router } = require("express");
const dashboardRouter = Router();
const dashboardControllers = require("../controllers/DashboardController");

// Get method to handle the dashboard request page
dashboardRouter.get("/dashboard", dashboardControllers.get_dashboard_page);

// Post method to handle users name
dashboardRouter.post(
  "/dashboard",
  dashboardControllers.post_dashboard_name_insert
);

// Export dashboard router
module.exports = dashboardRouter;
