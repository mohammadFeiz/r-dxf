import {saveAs} from 'file-saver';

var getDXF = function(list){
  var get = {
    line:function({x1,y1,x2,y2}){
      var line = '';
      line +=
        "LINE" + "\r\n" +
        "8" + "\r\n" +
        "1" + "\r\n" +
        "62" + "\r\n" +
        "0" + "\r\n" +
        "10" + "\r\n" +
        (x1) + "\r\n" +
        "20" + "\r\n" +
        (y1) * -1 + "\r\n" +
        "30" + "\r\n" +
        "0.0" + "\r\n" +
        "11" + "\r\n" +
        (x2) + "\r\n" +
        "21" + "\r\n" +
        (y2) * -1 + "\r\n" +
        "31" + "\r\n" +
        "0.0" + "\r\n" +
        "0" + "\r\n";
      return line;
    },
    circle:function({x,y,radius}){
      var circle = '';
      circle +=
        "CIRCLE" + "\r\n" +
        "8" + "\r\n" +
        "1" + "\r\n" +
        "62" + "\r\n" +
        "0" + "\r\n" +
        "10" + "\r\n" +
        (x) + "\r\n" +
        "20" + "\r\n" +
        (y) * -1 + "\r\n" +
        "30" + "\r\n" +
        "0.0" + "\r\n" +
        "40" + "\r\n" +
        (radius) + "\r\n" +
        "0" + "\r\n";
      return circle;
    },
    rectangle:function({start,end}){
      var [x1,y1] = start,[x2,y2] = end;
      var rectangle = '';
      rectangle += this.line({x1:x1,y1:y1,x2:x2,y2:y1});
      rectangle += this.line({x1:x2,y1:y1,x2:x2,y2:y2});
      rectangle += this.line({x1:x2,y1:y2,x2:x1,y2:y2});
      rectangle += this.line({x1:x1,y1:y2,x2:x1,y2:y1});
      return rectangle;
    },
    arc:function({x,y,radius,startAngle,endAngle}){
      var arc = '';
      arc +=
        "ARC" + "\r\n" +
        "8" + "\r\n" +
        "1" + "\r\n" +
        "62" + "\r\n" +
        "0" + "\r\n" +
        "10" + "\r\n" +
        (x) + "\r\n" +
        "20" + "\r\n" +
        (y) * -1 + "\r\n" +
        "30" + "\r\n" +
        "0.0" + "\r\n" +
        "40" + "\r\n" +
        (radius) + "\r\n" +
        "50" + "\r\n" +
        (startAngle) + "\r\n" +
        "51" + "\r\n" +
        (endAngle) + "\r\n" +
        "0" + "\r\n";
      return arc;
    }

  }
  var entities = '';
  for(var i = 0; i < list.length; i++){
    var {type} = list[i];
    entities += get[type](list[i])
  }
  var dxfText =
  "0" + "\r\n" +
  "SECTION" + "\r\n" +
  "2" + "\r\n" +
  "ENTITIES" + "\r\n" +
  "0" + "\r\n";
  dxfText+= entities;      
  dxfText +=
  "ENDSEC" + "\r\n" +
  "0" + "\r\n" +
  "EOF";
  console.log(dxfText);
  var filename = prompt("Please enter DXF file name");
  if (filename === null) { return; }
  var blob = new Blob([dxfText], { type: "text/plain" });
  saveAs(blob, filename + ".dxf");
}