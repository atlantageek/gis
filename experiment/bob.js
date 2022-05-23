"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var xml2js = require("xml2js");
var fs = require("fs");
var Wms = /** @class */ (function () {
    function Wms() {
    }
    Wms.prototype.foundLayerGetNames = function (data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            if ('LAYER' in data[i]) {
                result = __spreadArray(__spreadArray([], result, true), this.findLayerNames(data[i]['LAYER']), true);
            }
            else if ('NAME' in data[i]) {
                console.log('Found Name' + (data[i]['NAME']));
                result.push(data[i]['NAME']);
            }
        }
        console.log("Found Layers" + result.length);
        return result;
    };
    Wms.prototype.findLayerNames = function (data) {
        //console.log('Find Layers')
        var result = [];
        if ((typeof data) == 'object' && !Array.isArray(data)) {
            for (var key in data) {
                if (key != 'LAYER') {
                    //console.log('Layer found')
                    //console.log(data[key])
                    result = __spreadArray(__spreadArray([], result, true), this.findLayerNames(data[key]), true);
                }
                else {
                    console.log(key);
                    result = __spreadArray(__spreadArray([], this.foundLayerGetNames(data[key]), true), result, true);
                    console.log(result);
                }
            }
        }
        else if ((typeof data) == 'object' && Array.isArray(data)) {
            //console.log('array found')
            for (var i = 0; i < data.length; i++) {
                result = __spreadArray(__spreadArray([], this.findLayerNames(data[i]), true), result, true);
            }
        }
        return result;
    };
    Wms.prototype.getWmsLayerOptions = function (filename) {
        var _this = this;
        console.log("getting Capabilities");
        var data = fs.readFileSync('foo.txt', 'utf8');
        console.log("Processed);");
        var parser = new xml2js.Parser({ strict: false, trim: true });
        var wms_layer_options = [];
        parser.parseString(data, function (err, result) {
            debugger;
            wms_layer_options = _this.findLayerNames(result).flat();
        });
        return wms_layer_options;
    };
    return Wms;
}());
console.log("Starting");
var wms = new Wms();
console.log(wms.getWmsLayerOptions("./capabilities3.xml"));
