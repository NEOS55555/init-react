import React, { Component } from 'react';
import '@/assets/css/default.scss'
import 'antd/dist/antd.css';
import 'braft-editor/dist/index.css'
import './App.scss';
import './media.scss';




export default class App extends Component {
	state = {
		isShow: false
	}

	render () {
		const { isShow } = this.state;
	  return (
	  	<div>App</div>
	  );
	}
}
