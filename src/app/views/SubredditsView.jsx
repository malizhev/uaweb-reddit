import React from "react";
import Reflux from "reflux";
import _ from "lodash";

import { Link } from './../utils/Router.jsx';
import Tabs from './../components/Tabs.jsx';
import Subreddit from './../components/Subreddit.jsx';

import Reddit from './../api/Reddit.jsx';

import ServiceWorker from './../utils/ServiceWorker.jsx';

import { SubredditLoad } from './../actions/SubredditActions.jsx';
import SubredditStore from './../stores/SubredditStore.jsx';

const PAGE_COUNT = 25; // Number of items per page
var pagesCached = 0;   // Counter of pages cached

export default class SubredditsView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			items: [],
			page: 0,
			subreddit: props.params[0] 
		};

		this.loadItems = this.loadItems.bind(this);
		this.readMore = this.readMore.bind(this);
		this.cachePages = this.cachePages.bind(this);
	}

	componentWillReceiveProps(props) {
		this.props = props;
		this.loadItems();
	}

	loadItems(params, append)
	 {
	 	var subreddit = this.props.params[0];
	 	var section   = this.props.params[1] || "hot";

		SubredditLoad(subreddit, section, params)
			.then((res) => {

				var items = (append) ? 
					this.state.items.concat(res.data.children) :
					res.data.children;

				this.setState({ 
					items: items,
					after: res.data.after, 
					before: res.data.before
				}); 

				this.cachePages({
					items: res.data.children, 
					after: res.data.after,
					subreddit: subreddit,
					section: section
				});
			})
			.catch((err) => this.setState({error: err}));
	}

	readMore(append) {
		this.setState({ page: ++this.state.page });
		this.loadItems({ 
			after: this.state.after,
			count: this.state.page * PAGE_COUNT
		}, append);
	}

	componentDidMount() {
		this.loadItems();
	}

	cachePages(params) {
		if (!ServiceWorker.hasSupport() || !ServiceWorker.hasControl()) return;

		var promises = [];

		params.items.forEach((item) => {
			var p = Reddit.getPost(params.subreddit, item.data.id);
			promises.push(p);
		});
		// Cache next page
		Promise.all(promises)
			.then(() => {
				pagesCached++;
				Reddit.getSubreddit(params.subreddit, params.section, { 
					after: params.after, count: PAGE_COUNT * pagesCached});
			});
	}

	render() {

		var tabsItems = [
			{ link: `/${this.state.subreddit}`, text: "Hot" },
			{ link: `/${this.state.subreddit}/new`, text: "New" },
			{ link: `/${this.state.subreddit}/rising`, text: "Rising" },
			{ link: `/${this.state.subreddit}/controversial`, text: "Controversial" },
			{ link: `/${this.state.subreddit}/top`, text: "Top" }
		];

		return (

			<div className = "app-subreddit">
				
				<header className = "_header">
					<div className="_container">
						<h1>{`/r/${this.state.subreddit}`}</h1>
						<Tabs items = { tabsItems } className = "app-subreddit-tabs" />
					</div>
				</header>

				<div className="_container">
					<Subreddit items = { this.state.items } />
				</div>

				{ (this.state.after) ? 
					(<button onClick = { this.readMore.bind(this, true) } className = "_btn _btn--load">Load more</button>) 
				: null }

				{ (this.state.error) ? (<div className = "_error">{ this.state.error.toString() }</div>) : null }
			</div>
		);
	}
}

SubredditsView.defaultProps = { items: [] }