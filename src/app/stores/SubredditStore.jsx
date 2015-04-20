import Reflux from 'reflux';

import { SubredditLoad } from './../actions/SubredditActions.jsx';
import Reddit from './../api/Reddit.jsx';

var SubredditStore = Reflux.createStore({

	init: function() {
    	this.listenTo(SubredditLoad, "onSubredditLoad");
	},

	onSubredditLoad: function(...params) {

		Reddit.getSubreddit(...params)
			.then((data) => {
				SubredditLoad.completed(data); 
			})
			.catch((err) => SubredditLoad.failed(err));

	}

});

export default SubredditStore;