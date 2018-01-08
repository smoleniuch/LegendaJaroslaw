import pascalCase from 'Utilities/pascal_case'


// imports are file from context
// only work when file doesnt export using default options
// only work with export { moduleName } syntax
// this is usefull if you want to import alot of modules from directory
// check this https://webpack.js.org/guides/dependency-management/#context-module-api
function importAll (r) {

  var cache = {};

  r.keys().forEach(key => {

    cache = Object.assign(cache, r(key))

  });


  return cache

}

export default importAll
