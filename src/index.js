import path from 'path';
import fs from 'fs';
import buildTree from './buildTree.js';
import parse from './parser.js';
import format from './formatters/index.js';

const extractFormat = (file) => path.extname(file).slice(1);

const getData = (filepath) => {
  const absPath = path.resolve(process.cwd(), filepath);
  return parse(fs.readFileSync(absPath, 'utf-8'), extractFormat(absPath));
};

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildTree(data1, data2);

  return format(outputFormat)(tree);
};
