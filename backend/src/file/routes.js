const { Router } = require("express");
const controller = require("./controllers");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

const router = Router();

router.get("/", controller.getFiles);
router.post("/uploadImage", controller.uploadFileByteArray);
router.post("/upload", upload.single("photo"), controller.uploadFile);
router.get("/:id", controller.getFileById);

module.exports = router;
