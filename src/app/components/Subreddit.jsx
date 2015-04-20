import React from "react";
import moment from "moment";

import { Link } from './../utils/Router.jsx';

export default class Subreddit extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="_subreddit">
				<ul>
					{ this.props.items.map((item) => {

						var formattedDate = moment.unix(item.data.created).format('MMMM Do YYYY, h:mm:ss a')

						return ( 
							<li key = { item.data.id } className = "_subreddit-item"> 
								<Link to = {`/${item.data.subreddit}/comments/${item.data.id}`}>
									<span className = "_subreddit-item-title">{ item.data.title }</span>
									<span className = "_subreddit-item-sub">
										<span className = "_subreddit-item-author">Author: <strong>{ item.data.author }</strong></span>
										<span className = "_subreddit-item-comments">Comments: <strong>{ item.data.num_comments }</strong></span>
									</span>
									<span className = "_subreddit-item-sub">
										<span className = "_subreddit-item-domain">({ item.data.domain })</span>
										<span className = "_subreddit-item-created">{ formattedDate }</span>
									</span>
								</Link>
							</li>
						)
						})
					}
				</ul>
			</div>
		);
	}
};