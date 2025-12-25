import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbicloi01",
  api_key: "924469285696211",
  api_secret: "q_6iPK-bOawRif4R1tVXS28NF30",
  secure: true,
});

export default cloudinary;
