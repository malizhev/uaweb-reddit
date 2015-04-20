import React from "react";
import Page from "page";

import { RouterActions } from './../actions/RouterActions.jsx';
import RouteStore from './../stores/RouteStore.jsx';

export class Router {

	constructor(params) {
		// Page(params.base);
		// Page("*", (ctx, next) => { 
  //       	var params = ctx.params[0].split("/");
  //       	params.shift();
  //       	ctx._params = params;
  //       	RouterActions.routeChanged(ctx);
  //       	next();
  //       });
		// params.routes.forEach((route) => {
		// 	Page(route.path, route.handler.bind(this));
		// });
		//Page();
	}

	static navigateTo(route, event) {
		if (event) event.preventDefault();
		Page(route);
	}
}


export class Link extends React.Component {

	constructor(props) {
		super(props);
		this.state = props;
		this.onRouteChanged = this.onRouteChanged.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = RouteStore.listen(this.onRouteChanged);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onRouteChanged(ctx) {
		this.setState({
			currPath: ctx.path
		});
	}



	render() {

		var href = this.props.to;
		var className = (href === this.state.currPath) ? "active" : "";
		var linkComponent = (
			<a href = {"/?" + this.props.to} className = {className} onClick = { Router.navigateTo.bind(this, this.props.to) }>
				{ this.props.children }
			</a>);
		return linkComponent;
	}
}