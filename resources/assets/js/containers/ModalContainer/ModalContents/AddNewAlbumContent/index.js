import React from 'react'

import { Content, Body } from "Components/Modal";
import Button from 'react-bootstrap/lib/Button';
import AlbumForm from './AlbumForm'

class AddNewAlbumContent extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render(){

        return (
            <Content title="Dodaj Album">
            <Body>

                <AlbumForm currentAlbum={this.props.currentAlbum} hideModal={this.props.hideModal}/>
                
            </Body>
            </Content>
        )

    }

}


export {AddNewAlbumContent}