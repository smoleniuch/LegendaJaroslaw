import React from 'react'

import { Content, Body } from "Components/Modal";
import Button from 'react-bootstrap/lib/Button';

class ConfirmationModalContent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            promiseState:null
        }

        this.onConfirm = this.onConfirm.bind(this)
    }
    
    render(){

        var { question } = this.props

        return (
            <Content title="Potwierdz">
            <Body>
                {question}
                <br />
                <br />
                <Button disabled={this.state.promiseState === 'pending'} onClick={this.props.hideModal} > Nie </Button>
                <Button className="pull-right" disabled={this.state.promiseState === 'pending'} onClick={this.onConfirm}> Tak </Button>
                
            </Body>
            </Content>
        )

    }

    onConfirm(){
        this.setState({promiseState:'pending'}, ()=>this.props.afterConfirmPromiseGenerator().then(this.props.hideModal))
    }
}

ConfirmationModalContent.defaultProps = {
    afterConfirmPromiseGenerator:_ => new Promise((resolve,reject) => resolve())
}

export {ConfirmationModalContent}