const requireModule = require.context('.', false,  /\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {
    // create the module name from filename
    if (!filename.includes('index')) {
      const moduleName = filename
        .replace(/(\.\/|\.js)/g, '')
        .replace(/^\w/, c => c.toUpperCase());
      modules[moduleName] = requireModule(filename).default || requireModule(filename);
    }
});

export default modules;