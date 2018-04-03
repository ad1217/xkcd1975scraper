const fs = require('fs');
const fetch = require("node-fetch");

let root = "https://xkcd.com/1975/alto/menu/";

let retrieved = [];

function getID(id) {
  fetch(root + id).then(r => r.json())
    .then(data => {
      console.log(data.id);
      fs.writeFileSync("json/" + id + ".json", JSON.stringify(data));
      data.entries.forEach(ent => {
        let next = ent.reaction.subMenu;
        // not already retrieved
        if (retrieved.indexOf(next) < 0 && next !== undefined && next !== "") {
          console.log(ent);
          getID(ent.reaction.subMenu);
          retrieved.push(next);
        }
      });
    });
}

try {
  fs.mkdirSync('json');
} catch (err) {
  if (err.code !== 'EEXIST') {
    throw err;
  }
}

fetch("https://xkcd.com/1975/alto/root").then(r => r.json())
  .then(data => {
    fs.writeFileSync("json/root.json", JSON.stringify(data));
    data.Menu.entries.forEach(ent => {
      getID(ent.reaction.subMenu);
    });
  });
