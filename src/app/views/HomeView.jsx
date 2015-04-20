import React from "react";

import { Router } from "./../utils/Router.jsx";

export default class HomeView extends React.Component {

	componentDidMount() {
		React.findDOMNode(this.refs.search).focus();
	}

	onSubmit(e) {
		e.preventDefault();
		var subreddit = React.findDOMNode(this.refs.search).value.trim();
		Router.navigateTo(`/${subreddit}`);
	}

	render() {
		return (
			<div className = "app-main">
				<form onSubmit = { this.onSubmit.bind(this) }>
					<div className = "_search">
						<input type="text" id = "search" ref = "search" placeholder = "Enter subreddit's name" />
						<button>Go</button>
					</div>
					
				</form>
			</div>
		)
	}
}