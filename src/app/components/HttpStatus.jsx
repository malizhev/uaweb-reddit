import React from "react";
import Reflux from "reflux";

import StatusStore from "./../stores/StatusStore.jsx";

export default class HttpStatusComponent extends React.Component {

	constructor(params) {
		super(params);
		this.state = { httpStatus: {} };
		this.onHttpStatus = this.onHttpStatus.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = StatusStore.listen(this.onHttpStatus);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onHttpStatus(status) {
		this.setState({
			httpStatus: status
		});
	}

	render() {
		return (<div>{ this.state.httpStatus === "pending" ? (<div className = "loadingBar"></div>) : null }</div>)
	}
}