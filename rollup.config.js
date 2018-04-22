import path from 'path';
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
    exclude: path.resolve('src/__tests_/**'),
    format: 'cjs',
    plugins: [
      eslint({ exclude: eslintExclude }),
      babel({ exclude: babelExclude })
    ]
  };

  return config;
}

const files = glob.sync(SRC_FOLDER, { nodir: true });

/* Map all files in src/ to dist/
 *
 *  currently not supported by rollup
 *
 *  */
const config = files.map(file => getRollUpConfig(
  file,
  {file: file.replace('src', 'dist')}
));

export default config;
