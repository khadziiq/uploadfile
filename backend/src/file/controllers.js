const pool = require("../../db");
const queries = require("./queries");
const path = require("path");
const { Blob } = require("buffer");

const getFiles = (req, res) => {
  pool.query(queries.getFiles, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getFileById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getFileById, [id], (error, result) => {
    if (error) throw error;
    if (result.rowCount > 0) {
      const row = result.rows[0];
      const extname = path.extname(row.filename);
      let fileType = "image/jpeg";
      switch (extname) {
        case "png":
          fileType = "image/png";
        case "jpg":
          fileType = "image/jpeg";
        default:
          fileType = "image/jpeg";
          break;
      }

      const data = new Blob(row.filepars, { type: fileType });
      data.filename = row.filename;
      res.setHeader("Content-Length", row.filepars.length);
      console.log(data);
      res.write(data, "binary");
      res.end();
    }
    return res.status(404);
  });
};

const uploadFileByteArray = (req, res) => {
  const images = req.files.images;
  const buff = images.data;
  const name = Date.now() + path.extname(images.name);
  const image = new Uint8Array(Buffer.from(buff));
  // console.log(images.name);
  // console.log(buff);

  pool.query(queries.addFile, [name, image], (error, result) => {
    if (error) throw error;
    res.status(201).json({ status: "success", result });
  });
};

module.exports = {
  getFiles,
  getFileById,
  uploadFileByteArray,
};
