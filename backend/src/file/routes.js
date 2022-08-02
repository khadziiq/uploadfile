const { Router } = require("express");
const controller = require("./controllers");

const router = Router();

router.get("/", controller.getFiles);
router.post("/upload", controller.uploadFileByteArray);
router.get("/:id", controller.getFileById);

module.exports = router;
