//console.log(process.argv);
var fs = require('fs');
var path = require("path");
var sum = 0;

// for (var i in process.argv) {
//     if (i > 1) {
//         sum = sum + Number(process.argv[i]);
//     }
// }
    
//var fileStr = fs.readFileSync(process.argv[2]).toString();
// var fileStr;
// function read(callback){
//     fs.readFile(process.argv[2], function a(err, data) {
//         if (err){
//             console.log("couldnt read file " + err);
//             return;    
//         } else {
//             fileStr = String(data);
//         }
//         callback();
//     });
// }

// function print(){
//     var nlarr = fileStr.split("\n");
//     console.log(nlarr.length - 1);
// }
// console.log("argv[2] = " + process.argv[2] + 
//             "\nargv[3] = " + process.argv[3]);
var fileList;
function readir(callback) {
    fs.readdir(process.argv[2], function a(err, data){
        if (err){
            console.log("couldnt get path " + err);
            return;
        } else {
            fileList = String(data);
        }
        callback(fileList);
    });
}
function filter(list) {
    // console.log("callback called");
    var filter = list.filter(function(fn){
        return path.extname(fn) === "."+String(process.argv[3]);
    });
    console.log(filter);
    
}
readir(filter);
//read(print);