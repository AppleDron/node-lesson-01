const fs = require("node:fs/promises");
const path = require("node:path");
const cloudinary = require("cloudinary");
const { UPLOAD_DIR } = require("../constants/common");

cloudinary.config({
  cloud_name: "djqpbxu2u",
  api_key: "653153399237538",
  api_secret: "OcQfEFEcN10JeqNJ9VS0Cyot1ZY",
});

const saveFileToCloudinary = async () => {
  const res = await cloudinary.v2.uploader.upload(
    file.path,
    { public_id: file.filename },
    function (error, result) {
      console.log(result);
    }
  );

  await fs.unlink(file.path);

  return res.url;
};

module.exports = saveFileToCloudinary;
