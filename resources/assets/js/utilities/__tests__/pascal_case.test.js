import pascalCase from '../pascal_case.js'

describe('pascalCase utility function',()=>{

  test('should change it to pascal case', () => {

    expect(pascalCase('testMe')).toBe('TestMe')
    expect(pascalCase('this is not possible')).toBe('ThisIsNotPossible')
    expect(pascalCase('snake_case')).toBe('SnakeCase')

  })

})
