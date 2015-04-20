import React from "react";
import Reflux from "reflux";

import { Link } from './../utils/Router.jsx';

import Post from './../components/Post.jsx';

import { PostLoad } from './../actions/PostActions.jsx';
import PostStore from './../stores/PostStore.jsx';

import Reddit from './../api/Reddit.jsx';

export default class PostView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			post: {},
			comments: [],
			subreddit: this.props.params[0]
		};
		//console.log(this.state)
		this.loadItems = this.loadItems.bind(this);
	}

	loadItems()
	 {
	 	var subreddit = this.props.params[0];
	 	var postId   = this.props.params[2];

		PostLoad(subreddit, postId)
			.then((res) => {
				this.setState({ 
					post: res[0].data.children[0], 
					comments: res[1].data.children
				});
			})
			.catch((err) => this.setState({error: err}));
	}

	componentDidMount() {
		this.loadItems();
	}

	componentWillReceiveProps(a) {
		this.loadItems();
	}

	render() {
		return (
			<div className = "app-post">
				<header className = "_header">
					<div className="_container">
						<h1><Link to = {`/${this.state.subreddit}`}>Back to {`/r/${this.state.subreddit}`}</Link></h1>
					</div>
				</header>
				<div className = "_container">
					<Post post = { this.state.post } comments = { this.state.comments } />
				</div>
				{ (this.state.error) ? (<div className = "_error">{ this.state.error.toString() }</div>) : null }
			</div>
		);
	}
}

PostView.defaultProps = { post: {}, comments: [] }