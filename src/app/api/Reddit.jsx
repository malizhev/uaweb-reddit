import { HttpStatus } from './../actions/StatusActions.jsx';
import 'whatwg-fetch';

const API_URL = "//api.reddit.com/";

function checkStatus(response) {  
	if (response.status >= 200 && response.status < 300) {
    	return Promise.resolve(response); 
  	} else {
  		onError();
		return Promise.reject(new Error(response.statusText));  
	}  
}

function parseJson(response) {
	HttpStatus.ready(); 
	return response.json();
}

function onError(err) {
	HttpStatus.error();
	return Promise.reject(err);
}

function toParams(data) {
	return Object.keys(data).map(function(k) {
    	return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
	}).join('&');
}

export default class RedditAPI {

	static getSubreddit(name, section, params) {

		let requestURL = API_URL + `r/${name}/${section}`;

		if (params) requestURL += `?${toParams(params)}`;

		HttpStatus.pending();

		return fetch(requestURL)
			.then(checkStatus)
			.then(parseJson)
			.catch(onError);
	}

	static getPost(subreddit, postId) {

		HttpStatus.pending();

		return fetch(API_URL + `r/${subreddit}/comments/${postId}`)
			.then(checkStatus)
			.then(parseJson)
			.catch(onError);
	}
}