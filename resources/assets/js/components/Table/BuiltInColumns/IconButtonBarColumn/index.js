import React from 'react'
import IconButtonBar from './Component'
import Icon from 'Components/Icon'
export default ({iconButtons,display, ...column}) => ({
    Header:'',
    width:100,
    sortable:false,
    resizable:false,

    Cell:rowInfo => <IconButtonBar {...{rowInfo,iconButtons,display}}/>,
    Aggregated:rowInfo => <IconButtonBar {...{rowInfo,iconButtons,display}}/>,
    ...column
})