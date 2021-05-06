//npm install concat fs-extra --save-dev

const fs = require('fs-extra');
const concat = require('concat');

(async function () {
    const files = [
        './dist/demo-microapp/polyfills.js',
        './dist/demo-microapp/main.js',
        './dist/demo-microapp/runtime.js',
        //'./dist/demo-microapp/vendor.js',
    ];
    console.log('Concat - verify if exist Directory...');
    await fs.ensureDir('elements');
    await concat(files, 'elements/elements.js');
    console.log('Concat - begin concatenating files..');
    await fs.copyFile('./dist/demo-microapp/styles.css', 'elements/styles.css');
    console.log('Concat - concatenating completed!');
})();