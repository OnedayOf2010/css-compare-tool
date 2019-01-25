# css-compare-tool
it is a tool using for compare tow css is really equal

## Prepare
```bash
   npm install css2json
   npm install colors
```
## Usage
``` bash
    node compare.css
```
## Problems:
If there is a css like below :
```css
background: #5c9ccc url(data:image/png;base64,iVBORw0KGgoA...) top repeat-x;
```
it will split by ";" in css2json (version : v 0.0.4)
change the code like this:
```js
    var reg = new RegExp("image/png;base64", "g");
    var regback = new RegExp("image/png+&+base64", "g");
    var declarations = css.substring(lbracket + 1, rbracket)
      .replace(reg, "image/png+&+base64").split(";")
      .map(function (declaration) {
        return declaration.trim().replace(regback, "image/png;base64");
      }).filter(function (declaration) {
        return declaration.length > 0;
      });   
```
it will be work well.
