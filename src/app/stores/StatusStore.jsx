import Reflux from "reflux";
import { HttpStatus } from './../actions/StatusActions.jsx';

var StatusStore = Reflux.createStore({

	listenables: HttpStatus,

	onReady: function() {
		this.trigger("ready");
	},

	onPending: function() {
		this.trigger("pending");
	},

	onError: function() {
		this.trigger("error");
	}
});

export default StatusStore;