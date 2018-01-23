import isCamelCase from '../is_camel_case.js'

describe('isCamelCase utility function',() => {

  test('it should evaluate to true if its camel case', () => {

    expect(['imCamel','smTrulyCamel','im'].every((example)=>isCamelCase(example))).toBeTruthy();

  })

  test('it should evaluate to false if its not camel case', () => {

    expect(['ImCamel','fire_it_up','test Me Dear'].every((example)=>!isCamelCase(example))).toBeTruthy();

  })

})
