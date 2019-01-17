const tesseract = require("node-tesseract-ocr");

// path of the image to be scanned

const ingredientread = () => {
  //configuration options for tesseract
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3
  };

  const imgpath = "uploads/image.png";
  //tesseract method
  tesseract
    .recognize(imgpath, config)
    .then(text => {
      try {
        //find index of word 'ingredients'
        const ingredientsindex = /ingredients/i.exec(text).index;

        //remove text before the word ingredients
        const parse1 = text.slice(ingredientsindex, -1);

        //remove the word ingredients and possibly a preceeding colon, also remove newline characters
        const parse2 = parse1.replace(/ingredients:? /i, "").replace(/\n/g, "");

        //put comma seperated words into array
        const parse3 = parse2.split(/[(,)\(\)]/);

        //remove white space from the begining of each array item
        const parse4 = [];
        parse3.forEach(item => {
          parse4.push(item.replace(/^\s+/, ""));
        });

        return console.log(parse4);
      } catch (err) {
        console.log(
          `~~~"I can't find the word ingredients. Here's what I've found: "`
        );
        console.log("");
        console.log(text);
        console.log("");
        console.log(`~~~"that's all I can see"`);
        process.exit();
      }
    })
    .catch(err => {
      console.log("error:", err);
    });
};

exports.read = ingredientread;