import React from "react";
import { Link } from './../utils/Router.jsx';

export default class Tabs extends React.Component {

	render() {
		var items = this.props.items.map((item) => (<li><Link to = {item.link}>{item.text}</Link></li>));

		return (
			<nav className = { `_tabs ${ this.props.className }` }>
				<ul>{items}</ul>
			</nav>
		);
	}
}