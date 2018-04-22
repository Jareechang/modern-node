const globalIgnorePatterns = ['node_modules']
const exceptionIgnorePatterns = [];
const ignorePatterns = globalIgnorePatterns.concat(exceptionIgnorePatterns);

module.exports = {
    verbose: true,
    roots: ['src'],
    coveragePathIgnorePatterns: ignorePatterns,
    transformIgnorePatterns: ignorePatterns
};
