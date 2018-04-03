const fs = require('fs');

let parsed = [];
// exclude comics, spells, and "who's on first"
let exclude = ["Ao2B8XnNyxQrFHzEhDsk4c", "8KdSa7DqsB29AVwttUe2pZ", "T2azcrJ4TH9Fn1eTakXxbg"];

function gvEscape(string) {
  return string.replace(/"/g, '\"')
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getID(id) {
  // ignore some
  if (exclude.indexOf(id) > -1) {
    return [];
  }

  let graph = [];
  let toParse = [];
  let connections = [];

  let data = JSON.parse(fs.readFileSync("json/"+ id + ".json"));
  if (id === 'root') {
    data.entries = data.Menu.entries;
  }

  graph.push(`\n"${id}"[label=<<table border="0" cellborder="1" cellspacing="0">`);
  // uncomment to add id header
  // graph.push(`<tr><td>${id}</td></tr>`);
  data.entries.forEach((ent, idx) => {
    let next = ent.reaction.subMenu;
    graph.push(`<tr><td port="${idx}">${gvEscape(ent.label)}</td></tr>`);

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
  graph.push("</table>>];");

  return graph.concat(connections,
                      toParse.map(getID).reduce(
                        (sum, elt) => sum.concat(elt), []));
}

let graph = [].concat('digraph {', getID('root'), '}');

fs.writeFileSync("out.dot", graph.join('\n'));
