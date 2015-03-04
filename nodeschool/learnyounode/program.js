//console.log(process.argv);
var fs = require('fs');
var sum = 0;

// for (var i in process.argv) {
//     if (i > 1) {
//         sum = sum + Number(process.argv[i]);
//     }
// }
    
//var fileStr = fs.readFileSync(process.argv[2]).toString();
var fileStr;
function read(){
    fs.readFile(process.argv[2], function done(err, data) {
        if (err){
            console.log("couldnt read file " + err);
            return;    
        } else {
            fileStr = String(data);
        }
    });
}
read();
var nlarr = fileStr.split("\n");

console.log(nlarr.length - 1);
