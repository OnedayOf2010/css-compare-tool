
const fs = require('fs');
let colors = require('colors/safe');
const css2json = require('css2json');

let DiffCount = 0;
const reg = new RegExp("'", "g");

function compareCss(filename1, filename2) {
  let css1 = fs.readFileSync(filename1).toString();
  let css2 = fs.readFileSync(filename2).toString();
  let json1 = css2json(css1);
  let json2 = css2json(css2);
  for (let prop in json1) {
    if (json1.hasOwnProperty(prop)) {
      let diff = getDiffProp(json1[prop], json2[prop])
      if (diff && diff.length > 0) {
        DiffCount++;
        logDiffInfo(prop, diff);
      }
    }
  }
}

function getDiffProp(val1, val2) {
  let diffs = [];
  for (let prop in val1) {
    if (val1.hasOwnProperty(prop)) {
      let v1 = val1[prop], v2 = val2[prop];
      if (prop == "background-image" || prop == "background") {
        v1 = v1.replace(reg, '"');
        v2 = v2.replace(reg, '"');
      }
      if (v1 != v2) {
        diffs.push({
          prop: prop,
          val1: val1[prop],
          val2: val2[prop]
        });
      }
    }
  }
  return diffs;
}

function logDiffInfo(selector, propInfos) {
  console.log(colors.green('--------------------------------------------'));
  console.log(colors.green(" " + DiffCount + " " + selector + "   diff prop : "));

  for (let propInfo of propInfos) {
    console.log(colors.red("     " + propInfo.prop + "  "));
    console.log(colors.bgGreen("new     :") + colors.yellow(propInfo.val1 + "  "));
    console.log(colors.bgGreen("old     :") + colors.yellow(propInfo.val2 + "  "));
  }




  console.log(colors.green('----------------------------------------------'));
}

// compareCss("old.css", "new.css");





