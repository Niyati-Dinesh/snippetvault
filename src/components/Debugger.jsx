import React from 'react'
import NavBar from './NavBar';
import IntroSection from './IntroSection';
export default function Debugger() {
  const [auth , setAuth]=useState()
  const log = ["SignIn", "SignUp"];
  const home = ["Add Snippet +"];
  if (!auth,isEmpty()){
    return (<NavBar buttons={log}/> , <IntroSection/>);
  }
  else if (auth){
    return (<NavBar buttons={home}></NavBar>)
  }

  
}
