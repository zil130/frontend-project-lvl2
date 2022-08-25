import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Comparison of JSON-files with a nested structure', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const diff = genDiff(file1, file2);
  const correctResult = readFile('expected_file.txt').trim();
  expect(diff).toBe(correctResult);
});

test('Comparison of YAML-files with a nested structure', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const diff = genDiff(file1, file2);
  const correctResult = readFile('expected_file.txt').trim();
  expect(diff).toBe(correctResult);
});