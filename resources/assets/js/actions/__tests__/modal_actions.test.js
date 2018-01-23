import * as modalActions from '../modal_actions'

describe('Test modal actions', () => {

  test('Action creators must return specific object based on passed arguments',() => {

    expect(modalActions.displayModal('TestowyModal')).toMatchObject({type:'DISPLAY_MODAL',payload:{name:'TestowyModal'}})
    expect(modalActions.deleteModal('TestowyModal')).toMatchObject({type:'DELETE_MODAL',payload:{name:'TestowyModal'}})
    expect(modalActions.hideModal('TestowyModal')).toMatchObject({type:'HIDE_MODAL',payload:{name:'TestowyModal',deleteIt:true}})
    expect(modalActions.hideModal('TestowyModal',false)).toMatchObject({type:'HIDE_MODAL',payload:{name:'TestowyModal',deleteIt:false}})

  })

})
