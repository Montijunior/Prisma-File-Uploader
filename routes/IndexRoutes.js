const { Router } = require("express");
const IndexController = require("../controllers/IndexController");
const IndexRouter = Router();

IndexRouter.get("/", IndexController.get_home_page);

module.exports = IndexRouter;
