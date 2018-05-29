import React from 'react'
import {Route} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import ChatWidget from 'Components/ChatWidget';
import 'react-chat-widget/lib/styles.css';
import Logo from 'Components/Logo'
import MainNavBar from 'Containers/MainNavBar'
import './style.scss'

const Test = () => <div>1</div>

export default function({children}){

  return (
    <div className="app-layout">
          <MainNavBar />
          {children}
          <ChatWidget />

    </div>
  )

}
