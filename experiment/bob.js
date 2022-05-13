var xpath = require('xpath')
  , dom = require('xmldom').DOMParser

const fs = require("fs");
const xml = fs.readFileSync(`${__dirname}/capabilities.xml`, "utf8");
//console.log(xml)
console.log("2")
var doc = new dom().parseFromString(xml)
var nodes = xpath.select('//*[local-name()="Layer"][@cascaded="0"]', doc)
console.log(nodes)
console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
//console.log("Node: " + nodes[0].toString())
