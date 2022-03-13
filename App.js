import React, {Component} from 'react';
import Loading from './Loading';
import Bleep from './Bleep';


export default class App extends Component{
  state = {
    isLoading: false
  };

  render() {
    const { isLoading } = this.state;
    if ( isLoading==true ) {
    return <Loading />
    }
    else{
      return <Bleep />
    }
  }
}