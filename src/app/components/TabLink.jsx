import React from "react";
import Router from "react-router";

var { Link } = Router;

export default class TabLink extends React.Component {

	render() {
		var { router } = this.context;
		var isActive = router.isActive(this.props.to, this.props.params, this.props.query);
		var className = isActive ? 'active' : '';
		console.log(this.props);
		var link = (
			<Link {...this.props} />
		);
		return <li className={className}>{link}</li>;
	}
};

TabLink.contextTypes = {
	router: React.PropTypes.func
};