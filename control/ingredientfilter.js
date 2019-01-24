const ingredientfilter = (text) => {

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

 return (parse4);

}

module.exports = ingredientfilter