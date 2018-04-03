# XKCD 9175 Scraper

This is a scraper for [XKCD comic #1975, "Right Click"](https://xkcd.com/1975/), which involves a right click menu with far too many options. These two scripts try to make it a bit easier to explore.

## Output
Some sample output, up-to-date as of this writing, can be found in `out.dot` and `out.svg`. I probably won't keep these up to date. Note that both are rather large, so you'll want to download them instead of opening them in browser. I haven't had much luck with SVG viewers other than Inkscape.

## Usage
These scripts are written in NodeJS, so you'll need that. Run `npm install` to get `nodejs-fetch`, which is used in `scraper.js`.

`scraper.js` will download all `.json`s accesible from the menus, while `grapher.js` will parse them into a graphviz `dot` file. To convert this to an SVG, run `dot out.dot -o out.svg -Tsvg` (you will, of course, need graphviz).

Note that I've excluded a few submenus from the output, since they are very large. These include comics, spells, and "who's on first". Simply edit the list of excludes in `grapher.js` to include them.

## Contributing
The output is usable, but could easily be cleaned up. If you have suggestions/bugs/whatever, feel free to open an issue or pull request.
