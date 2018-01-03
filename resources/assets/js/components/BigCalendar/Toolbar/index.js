import React from 'react';

const Toolbar = ({...props}) => {
  console.log(props)
  setTimeout(()=>{

    props.onNavigate()

  },5000)
  return (<div></div>)

}

export default Toolbar;
