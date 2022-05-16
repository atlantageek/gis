const xml2js = require('xml2js')
const fs = require('fs')

const xml=fs.readFileSync(__dirname + '/foo.xml')
xml2js.parseString(xml,(err,result) => {
	console.log(JSON.stringify(result,null,4))
});
//const doc=new Dom().parseFromString(xml);
//const nodes = select(doc, '//layer');

//const orderIds = nodes.map((node) => node.getAttribute('order_id'));
//console.log(orderIds);

