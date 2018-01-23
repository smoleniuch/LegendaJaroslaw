import _escapeRegExp from 'lodash/escapeRegExp'

export default function existsInString(value, string, flags = 'im'){

  var regExp = new RegExp(_escapeRegExp(value),flags)

  return regExp.test(string)

}
