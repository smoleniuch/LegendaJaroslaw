import * as types from './types'

export function showButtonLoading(scope = 'default'){

    return {
        type:types.SHOW_LOADING,
        payload:{
            scope
        }
    }

}

export function hideButtonLoading(scope){

    return {
        type:types.HIDE_LOADING,
        payload:{
            scope
        }
    }

}