import _camelCase from 'lodash/camelCase'


export default function pascalCase(string){

  var camelCase = _camelCase(string)

  return camelCase.replace(/^./,(m)=>m.toUpperCase())

}
