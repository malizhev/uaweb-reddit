import React from "react";

import TabLink from "./TabLink.jsx";

export class TabsRibbon extends React.Component {

	render() {
		return (
			<nav className = "_tabs">
				<ul>
					{this.props.children}
				</ul>
			</nav>
		);
	}
}

export class TabsRibbonItem extends React.Component {
	render() {
		var iconClass = "icon " + this.props.icon;
		return (
			<TabLink to = {this.props.link} className = {iconClass}>{this.props.name}</TabLink>
		);
	}
}