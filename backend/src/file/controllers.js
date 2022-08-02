const pool = require("../../db");
const queries = require("./queries");
const path = require("path");
// const { Blob } = require("buffer");

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
    res.status(200).json(result.rows);
  });
};

const uploadFile = (req, res) => {
  let finalImageUrl =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  res.json({ status: "success", image: finalImageUrl });
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
  uploadFile,
  getFileById,
  uploadFileByteArray,
};
