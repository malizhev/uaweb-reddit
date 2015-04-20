import Reflux from 'reflux';

export var HttpStatus = Reflux.createActions([
	"ready",
	"pending",
	"error"
]);