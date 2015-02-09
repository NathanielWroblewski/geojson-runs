var toGeoJSON = require('togeojson'),
    fs = require('fs'),
    jsdom = require('jsdom').jsdom;

// set id and path constants
var ID = process.argv[2],
    GPX_PATH = '../../gpx-runs/' + ID + '.gpx',
    KML_PATH = '../../kml-runs/' + ID + '.kml',
    GEO_JSON_PATH = '../' + ID + '.json';

if (!ID) {
  console.log('Please pass in the run id, i.e. $ node to_geo_json 0001')
  return false
}

function parse(path) {
  return jsdom(fs.readFileSync(path, 'utf8'))
}

// format param either 'gpx' or 'kml'
function convert(format, file) {
  return JSON.stringify(toGeoJSON[format](file, { styles: true }))
}

function write(json) {
  fs.writeFile(GEO_JSON_PATH, json);
}

var json = convert('gpx', parse(GPX_PATH))
write(json)
