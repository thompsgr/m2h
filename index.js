#!/usr/bin/env node
const fs = require('fs');


function parse(file) {
    let [name, ext] = file.split('.');    
    return {
        name: name,
        ext: ext
    }
}

function isMarkdown(file) {
    return file.ext === 'md';
}

// set directories from args if provided
const indir = process.argv[2] || 'doc/';
console.log(`markdown directory (input): ${indir}`);
const outdir = process.argv[3] || 'public/';
console.log(`html directory (output): ${outdir}`);

let data = '', html = '', toc = '';

const files = fs.readdirSync(indir).map(parse).filter(isMarkdown);
process.stdout.write(`processing ${files.length} files: `);


files.forEach(function(file) {
    process.stdout.write(`.`);    
    toc += `\t\t<li><a href='${file.name}.html'>${file.name}</a></li>\n`;
    data = fs.readFileSync(`${indir}/${file.name}.${file.ext}`, 'utf8');
    let htmlText = data
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')    
	.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    fs.writeFileSync(`${outdir}/${file.name}.html`, htmlText);
});
process.stdout.write('done\n');

// write toc
fs.writeFileSync(`${outdir}/toc.html`, `<h1>Table of Contents</h1>\n<nav>\n\t<ol>\n${toc}\t</ol>\n</nav>\n`);
console.log(`table of contents written`);

console.log(`processing complete.`);
