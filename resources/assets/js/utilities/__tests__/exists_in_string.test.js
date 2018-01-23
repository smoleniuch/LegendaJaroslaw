import existsInString from '../exists_in_string.js'

describe('existsInString utility function',()=>{

  test('Should return true if string contains specific value',()=>{

    var stringToTest = 'im here'

    expect(existsInString('im',stringToTest)).toBeTruthy();
    expect(existsInString('here',stringToTest)).toBeTruthy();
    expect(existsInString('im here',stringToTest)).toBeTruthy();

    stringToTest = 'speciacl regexp characters like this [a-b] // \\ $%uni test'

    expect(existsInString('-b]',stringToTest)).toBeTruthy();
    expect(existsInString('%uni',stringToTest)).toBeTruthy();
    expect(existsInString('\\',stringToTest)).toBeTruthy();

  })

  test('Should return false if string does not contains specific value',()=>{

    var stringToTest = 'i am not even here'

    expect(existsInString('yes',stringToTest)).toBeFalsy();
    expect(existsInString('there',stringToTest)).toBeFalsy();
    expect(existsInString('evening',stringToTest)).toBeFalsy();

    stringToTest = 'speciacl regexp characters like this [a-b] // \\ $%uni test'

    expect(existsInString('-b][]',stringToTest)).toBeFalsy();
    expect(existsInString('%uni"',stringToTest)).toBeFalsy();
    expect(existsInString('\\&',stringToTest)).toBeFalsy();

  })

})
