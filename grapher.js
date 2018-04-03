const fs = require('fs');

let parsed = [];
// exclude comics, spells, and "who's on first"
let exclude = ["Ao2B8XnNyxQrFHzEhDsk4c", "8KdSa7DqsB29AVwttUe2pZ", "T2azcrJ4TH9Fn1eTakXxbg"];

let out = fs.createWriteStream('out.gv', {flags: 'w'});
out.write('digraph {\n');

function gvEscape(string) {
  return string.replace(/"/g, '\"')
    .replace(/&/g, "%26")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}

function getID(id) {
  // ignore some
  if (exclude.indexOf(id) > -1) {
    return;
  }

  let toParse = [];
  let connections = [];

  let data = JSON.parse(fs.readFileSync("json/"+ id + ".json"));
  if (id === 'root') {
    data.entries = data.Menu.entries;
  }

  out.write(`\n"${id}"[label=<<table>\n`);
  // uncomment to add id header
  // out.write(`<tr><td>${id}</td></tr>`);
  data.entries.forEach((ent, idx) => {
    let next = ent.reaction.subMenu;
    out.write(`<tr><td port="${idx}">${gvEscape(ent.label)}</td></tr>\n`);

    // has a connection
    if (next !== undefined && next !== "") {
      connections.push(`"${id}":"${idx}"->"${next}"`);
      // not already parsed
      if (parsed.indexOf(next) < 0) {
        toParse.push(next);
        parsed.push(next);
      }
    }
  });
  out.write("</table>>];\n");

  out.write(connections.join("\n"));

  toParse.forEach(getID);
}

// let root = JSON.parse(fs.readFileSync("json/root.json"));
// root.Menu.entries.forEach(ent => {
//   getID(ent.reaction.subMenu);
// });
getID('root');
out.write('}\n');
