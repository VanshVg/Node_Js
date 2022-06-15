const express = require("express");
const controller = require("../controllers/controller");
const upload = require("../middlewares/upload");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/add",
  upload.single("profile_pic"),
  [
    body("first_name").isLength({
      min: 3,
    }),
    body("last_name").isLength({
      min: 3,
    }),
    body("user_name").isLength({
      min: 5,
      max: 11,
    }),
    body("pinCode").isLength({
      max: 6,
    }),
    body("email").isEmail().normalizeEmail(),
  ],
  controller.add
);
router.get("/show", controller.show);
router.put("/update/:id", controller.update);
router.delete("/remove/:id", controller.remove);

module.exports = router;
