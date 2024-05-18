const cloudinary = require("cloudinary").v2;

cloudinary.v2.config({
  cloud_name: "dvuc7cgns",
  api_key: "752226257144352",
  api_secret: "nXuVmOFSa9vcq9g6ymSBiASuuns",
  secure: true,
});

module.exports = { cloudinary };
