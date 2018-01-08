export default function wrapComponentName(Component, name){

  var currentName = Component.displayName || Component.name || 'Component';

  Component.displayName = `${name}(${currentName})`

}
