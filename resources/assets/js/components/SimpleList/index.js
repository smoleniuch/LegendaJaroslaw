import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimpleList extends Component {
    render() {

        var {data, type} = this.props

        var children = data.map( value => <li>{value}</li>)

        return (
            <div className="simple-list-container">
                 {type === 'ordered'?(<ol>{children}</ol>):<ul>{children}</ul>}
                </div>

        );
    }
}

SimpleList.defaultProps = {
    data:[],
    type:'ordered'
}

export default SimpleList;