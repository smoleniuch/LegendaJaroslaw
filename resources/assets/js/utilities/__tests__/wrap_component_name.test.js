import wrapComponentName from '../wrap_component_name.js'

describe('wrapComponentName utility function', () => {

  test('Should set component name with current one', () => {

    var FakeComponent = {displayName:'FakeComponent'}
    wrapComponentName(FakeComponent,'Mamboo')
    expect(FakeComponent.displayName).toBe('Mamboo(FakeComponent)')

  })

})
