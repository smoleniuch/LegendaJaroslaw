import _isString from 'lodash/isString'
import _camelCase from 'lodash/camelCase'

export default function isCamelCase(val){

  return _isString(val) && val === _camelCase(val)

}
