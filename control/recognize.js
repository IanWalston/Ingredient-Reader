const tesseract = require("node-tesseract-ocr");

const ingredientread = () => {
  //configuration options for tesseract
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3
  };

  //path where the image you want to read is
  const imgpath = "uploads/image.png";

  return new Promise(function(resolve, reject) {
    tesseract.recognize(imgpath, config).then((text, err) => {
      if (err) reject(err);
      resolve(text);
    });
  });
};

module.exports = ingredientread;
