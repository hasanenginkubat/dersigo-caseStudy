const express = require("express");
const users = require("./usersRoutes")
const post = require("./postRoutes")

const router = express.Router();

router.use(express.json());

router.use("/users", users);
router.use("/post", post);




module.exports = router;
