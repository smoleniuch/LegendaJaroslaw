import * as types from './types'

export function addRequest(scope = 'request'){
    return {
        type:types.ADD_REQUEST,
        payload:{
            scope
        }
    }
}

export function removeRequest(scope = 'request'){
    return {
        type:types.REMOVE_REQUEST,
        payload:{
            scope
        }
    }
}