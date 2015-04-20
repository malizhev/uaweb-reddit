import React from "react";
import Remarkable from "remarkable";
import moment from "moment";
import _ from "lodash";

import { Link } from './../utils/Router.jsx';


var md = new Remarkable({html: true});

function htmlDecode(input){
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function parseMD(input) {
	return md.render(htmlDecode(input));
}

class Post extends React.Component {

	render() {
		var post = this.props.item;
		var postBody = (post.is_self) ?
			( 
				<div>
					<h2 className = "_post-body-title">{ post.title }</h2>
					<div className = "_post-body-content" dangerouslySetInnerHTML={{__html: parseMD(post.selftext)}}></div>
				</div>
			) :
			( <h2 className = "_post-body-title"><a href = { post.url } target = "_blank">🔗 {post.title }</a></h2> )

		return (
			<div className = "_post-body">
				{ postBody }
			</div>
		);
		
	}
}

class Comments extends React.Component {

	render() {
		return (
			<div className = "_post-comments">
				<ul>
					{ _.sortBy(this.props.items, 'data.created').reverse().map((comment) => {
						return (
							<li key = { comment.data.id } className = "_post-comments-item">
								<p className = "_post-comments-header">
									<span>Author: <strong>{ comment.data.author }</strong></span>
									<span>Time: <strong>{ moment.unix(comment.data.created).format('MMMM Do YYYY, h:mm:ss a') }</strong></span>
								</p>
								<div dangerouslySetInnerHTML={{__html: parseMD(comment.data.body)}}></div>
								{ (comment.data.replies) ? (<Comments items = {comment.data.replies.data.children} />) : null }
							</li>
							)
						} ) 
					}
				</ul>
			</div>
			
		);
	}
}

export default class PostComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var post = this.props.post.data || {};
		var comments = this.props.comments;

		return (
			<div className="_post">
				<Post item = { post } />
				{(comments.length) ? <Comments items = { comments } /> : <div className = "_post-comments--empty">No comments</div> }
			</div>
		);
	}
};