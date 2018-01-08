import _isString from 'lodash/isString'
import _camelCase from 'lodash/camelCase'

return default function isCamelCase(val) => {

  return _isString(val) && val === _camelCase(val)

}
