import * as types from './types'

export function getMotivationalQuotes(){

    return {
        type:types.GET_MOTIVATIONAL_QUOTES_REQUEST,
        payload:{
            request:{
                url:'/motivational-quotes',
            },
            notify:{
                error:{
                    message:'Nie można pobrać motywujących cytatów'
                }
            }
        }
    }


}

export function getMotivationalQuoteAuthors(){
    return {
        type:types.GET_MOTIVATIONAL_QUOTES_AUTHORS_REQUEST,
        payload:{
            request:{
                url:'/motivational-quote-authors',
            },
            notify:{
                error:{
                    message:'Nie można pobrać autorow motywujących cytatów'
                }
            }
        }
    }
}

export function updateMotivationalQuoteAuthor(id, data){

    return {
        type:types.UPDATE_MOTIVATIONAL_QUOTE_AUTHOR_REQUEST,
        payload:{
            request:{
                method:'post',
                url:`/motivational-quote-authors/${id}`,
                data,
            },
            notify:{
                success:{
                    message:'Edycja autora motywującego cytatu powiodła się'
                },
                error:{
                    message:'Edycja autora motywującego cytatu nie powiodła się'
                }
            }
        }
    }
}

export function updateMotivationalQuote(id, data){
    return {
        type:types.UPDATE_MOTIVATIONAL_QUOTE_REQUEST,
        payload:{
            request:{
                method:'put',
                url:`/motivational-quotes/${id}`,
                data,
            },
            notify:{
                success:{
                    message:'Edycja motywującego cytatu powiodła się'
                },
                error:{
                    message:'Edycja motywującego cytatu nie powiodła się'
                }
            }
        }
    }
}

export function deleteMotivationalQuote(id){
    return {
        type:types.DELETE_MOTIVATIONAL_QUOTE_REQUEST,
        payload:{
            request:{
                method:'delete',
                url:`/motivational-quotes/${id}`,
            },
            notify:{
                success:{
                    message:'Usuwanie motywującego cytatu powiodło się'
                },
                error:{
                    message:'Usuwanie motywującego cytatu nie powiodło się'
                }
            }
        }
    }
}

export function deleteMotivationalQuoteAuthor(id){
    return {
        type:types.DELETE_MOTIVATIONAL_QUOTE_AUTHOR_REQUEST,
        payload:{
            request:{
                method:'delete',
                url:`/motivational-quote-authors/${id}`,
            },
            notify:{
                success:{
                    message:'Usuwanie autora oraz jego motywujących cytatów powiodło się'
                },
                error:{
                    message:'Usuwanie autora oraz jego motywujących cytatów nie powiodło się'
                }
            }
        }
    }
}

export function addMotivationalQuote(data){
    return {
        type:types.ADD_MOTIVATIONAL_QUOTE_REQUEST,
        payload:{
            request:{
                method:'post',
                url:`/motivational-quotes`,
                data,
            },
            notify:{
                success:{
                    message:'Dodawanie motywującego cytatu powiodło się'
                },
                error:{
                    message:'Dodawanie motywującego cytatu nie powiodło się'
                }
            }
        }
    }
}