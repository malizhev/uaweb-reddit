import Reflux from "reflux";
import { RouterActions } from './../actions/RouterActions.jsx';

var RouteStore = Reflux.createStore({

	listenables: RouterActions,

	onRouteChanged: function(ctx) {
		this.trigger(ctx);
	}

});

export default RouteStore;