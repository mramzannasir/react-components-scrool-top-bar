import React, { Component } from 'react';
import Loading from './loading.gif';
export default class Spinner extends Component {
  render() {
    return (
      <img className='mx-auto' src={Loading} alt="" srcSet="" />
    );
  }
}
