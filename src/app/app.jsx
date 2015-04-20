import React from "react";
import Reflux from 'reflux';
import Page from 'page';

import { Router, Link } from './utils/Router.jsx';
import { RouterActions } from './actions/RouterActions.jsx';

//import StatusStore from './stores/StatusStore.jsx';
import HttpStatus from './components/HttpStatus.jsx';

import HomeView from './views/HomeView.jsx';
import SubredditsView from './views/SubredditsView.jsx';
import PostView from './views/PostView.jsx';

class Application extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			route: <HomeView />
		};
	}

	componentDidMount() {
        //this.unsubscribe = StatusStore.listen(this.onHttpStatus);

        // new Router({
        // 	base: "/?",
        // 	routes: [
        // 		{
        // 			path: "/",
        // 			handler: (ctx) => { this.setState({ route: <PostView params = {ctx._params} /> }) }
        // 		},
        // 		{
        // 			path: "/:subreddit/:section?",
        // 			handler: (ctx) => {
		      //   		console.log(ctx)
		      //   		this.setState({ route: <SubredditsView params = {ctx._params} /> })
		      //   	}
        // 		},
        // 		{
        // 			path: "/:subreddit/comments/:postId",
        // 			handler: (ctx) => {
		      //   		this.setState({ route: <PostView params = {ctx._params} /> })
		      //   	}
        // 		}
        // 	]
        // })

        Page.base("/uaweb-reddit/?");
        Page("*", (ctx, next) => { 
        	var params = ctx.params[0].split("/");
        	params.shift();
        	ctx._params = params;
        	RouterActions.routeChanged(ctx);
        	//console.log(ctx);
        	next();
        });
        Page("/", (ctx) => this.setState({ route: <HomeView /> }));
        Page("/:subreddit/comments/:postId", (ctx) => {
        		this.setState({ route: <PostView params = {ctx._params} /> })
        	}
        );
        Page("/:subreddit/:section?", (ctx) => {
        		console.log(ctx)
        		this.setState({ route: <SubredditsView params = {ctx._params} /> })
        	}
        );
        Page();

    }

	render() {
		return (
			<div className = "app">
				<div className = "app-wrapper">
					{ this.state.route }
				</div>
				<HttpStatus />
			</div>
		)
	}
}

React.render(<Application />, document.body);
