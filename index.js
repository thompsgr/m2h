#!/usr/bin/env node
const fs = require('fs');

const showdown = require('showdown');
showdown.setOption('tables', true);
const converter = new showdown.Converter();

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
const indir = process.argv[2] || 'source/';
console.log(`markdown directory (input): ${indir}`);
const outdir = process.argv[3] || 'public/';
console.log(`html directory (output): ${outdir}`);

let data = '', html = '', toc = '';

const files = fs.readdirSync(indir).map(parse).filter(isMarkdown);
process.stdout.write(`processing ${files.length} files: `);

files.forEach(function(file) {
    process.stdout.write(`.`);    
    toc += `<li><a href='${file.name}.html'>${file.name}</a></li>`;
    data = fs.readFileSync(`${indir}/${file.name}.${file.ext}`, 'utf8');
    html = converter.makeHtml(data);
    fs.writeFileSync(`${outdir}/${file.name}.html`, html);
});
process.stdout.write('done\n');

// write toc
fs.writeFileSync(`${outdir}/toc.html`, `<nav><ol>${toc}</ol></nav>`);
console.log(`table of contents written`);

console.log(`processing complete.`);
