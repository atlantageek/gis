import * as xml2js from 'xml2js'
import * as fs from 'fs';

class Wms {
 foundLayerGetNames(data:[],depth:number):string[] {
    
    let result:string[]=[];
    for (let i=0;i<data.length;i++) {
      
      if ('LAYER' in data[i]) {
        result=[...result,...this.findLayerNames(data[i],'LAYER',depth)];
      }
      else if ('NAME' in data[i]) {
        result.push(data[i]['NAME'])
      }
    }
    return result;
  }

  findLayerNames(data:any, prevkey:string, depth:number):string[] {
    let result:string[]=[];
    if ((typeof data) == 'object' && !Array.isArray(data)) {
      for(const key in data) {

        if (key == 'LAYER') {
          result=[...this.foundLayerGetNames(data[key],depth+1), ...result];
        }
        else if (key == '$') {
          
          result=[...result, ...this.findLayerNames(data[key],prevkey,depth+1)]
        }
        else{
          result=[...result, ...this.findLayerNames(data[key],key,depth+1)]
        }
      }
    }
    else  if ((typeof data) == 'object' && Array.isArray(data)) {
      //console.log('array found')
      for (let i=0;i<data.length;i++) {
        result=[...this.findLayerNames(data[i], prevkey,depth+1),...result]
      }

      
    }
    return result;
  }
  getWmsLayerOptions(filename:string):string[] {
    let data=fs.readFileSync(filename,'utf8');
    const parser = new xml2js.Parser({ strict: false, trim: true });
    let wms_layer_options=[];
    parser.parseString(data, (err, result) => {
      debugger;
      wms_layer_options=this.findLayerNames(result,'ROOT',0).flat()
     
    });
    return wms_layer_options.flat();

  }
    
}
console.log("Starting")
let wms=new Wms();

let result=wms.getWmsLayerOptions("./capabilities2.xml");
console.log("=========================================================");
console.log(result);
