import _isFunction from 'lodash/isFunction'
import _isString from 'lodash/isString'
import _mapValues from 'lodash/mapValues'
import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import moment from 'moment'


export const required = v => {

    return [null,'',undefined].includes(v)  || (_isArray(v) && v.length === 0) ? 'Pole Wymagane.': undefined  

}

export const sameAsValue = (valueNameToCompare, customError = '') => {

  return (value, allValues,_) => {

      return allValues[valueNameToCompare] === value? undefined: customError

  };

  return TestFunc

}


export const email = (v) => {

  var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexp.test(v) ? undefined : 'Nieprawidłowy adres email.'

}

export const minLength = ( min, customError = '') => {

  return (value,_,props) => {

    var error = ''

    return _isString(value) && value.length >= min? undefined : customError

  };

}

// {
//
//   password:[required],
//   password_confirmation:[required,sameAsValue('password')],
//
// }

export function validateGenerator(formValidations = {}){

  return (values, props) => {

    // return errors
    return _mapValues(formValidations, (fieldValidations, fieldName) => {

      fieldValidations = [].concat(fieldValidations)

      var fieldErrors = fieldValidations.reduce((errors, validate)=>{

        if(!_isFunction(validate)){throw new Error(`Validator must be function.Instead ${typeof validate } (${validate}) given.`)}

        var error = validate(values[fieldName],values)

        return error === undefined? errors: errors.concat(error)

      },[])

      return fieldErrors[0]; //first error

    })

  }

}

export function isValidTimeSpan(value){

  var from = moment(_get(value,'from'), 'HH:mm')
  var to = moment(_get(value,'to'), 'HH:mm')
 
  return from.isValid() && to.isValid() && from.isBefore(to)? undefined : 'Nieprawidłowy przedział'
  

}

export function isValidTimeSpanOptional(value){

  var fromTimeInput = _get(value,'from')
  var toTimeInput = _get(value, 'to')

  var from = moment(fromTimeInput, 'HH:mm')
  var to = moment(toTimeInput, 'HH:mm')

  if (!fromTimeInput && !toTimeInput){return undefined}

  return from.isValid() && to.isValid() && from.isBefore(to)? undefined : 'Nieprawidłowy przedział'
  

}
