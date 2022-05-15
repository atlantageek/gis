const fs=require('fs')
const Dom = require('xmldom').DOMParser;
const select = require('xpath');

const xml=fs.readFileSync(__dirname + '/foo.xml')
const doc=new Dom().parseFromString(xml);
const nodes = select(doc, '//layer');

const orderIds = nodes.map((node) => node.getAttribute('order_id'));
console.log(orderIds);

