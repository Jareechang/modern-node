import glob from 'glob';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

const SRC_FOLDER = 'src/**'
const destination = 'build'
const defaultExclude = ['node_modules/**']
const babelExclude = [].concat(defaultExclude);
const eslintExclude = [].concat(defaultExclude);

function getRollUpConfig(input, output){
  const config = {
    input,
    output,
    plugins: [
      eslint({exclude: eslintExclude}),
      babel({exclude: babelExclude})
    ],
    external: [
      'supertest',
      'window-or-global'
    ]
  };

  return config;
}

function ignoreTestFiles(filePath) {
  const testRegex = new RegExp('.*?test.*?');
  return !testRegex.test(filePath);
}

const files = glob.sync(SRC_FOLDER, {nodir: true});
const filteredFiles = files.filter(ignoreTestFiles);
/* Map all files in src/ to dist/
 *
 *  currently not supported by rollup
 *
 *  */
const config = (
  filteredFiles
    .map(file => getRollUpConfig(file, {file: file.replace('src', 'dist'), format: 'cjs'}))
);

export default config;
