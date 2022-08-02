const getFiles = "SELECT * FROM file_upload";
const getFileById = "SELECT * FROM file_upload WHERE id= $1";
const addFile = "INSERT INTO file_upload(filename, filepars) VALUES ($1, $2)";

module.exports = {
  getFiles,
  getFileById,
  addFile,
};
