import Reflux from 'reflux';

import { PostLoad } from './../actions/PostActions.jsx';
import Reddit from './../api/Reddit.jsx';

var PostStore = Reflux.createStore({

	init: function() {
    	this.listenTo(PostLoad, "onPostLoad");
	},

	onPostLoad: function(...params) {

		Reddit.getPost(...params)
			.then((data) => {
				PostLoad.completed(data); 
			})
			.catch((err) => { 
				PostLoad.failed(err); 
			});

	}

});

export default PostStore;