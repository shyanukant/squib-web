import { BackendLookup } from "../lookup";
import { prodUrl } from "../lookup";

export function apiCreateTweet(newTweets, callback) {
    BackendLookup('POST', 'tweets/create/', callback, { content: newTweets })
    }

export function apiDeleteTweet(tweetId, callback){
    BackendLookup('POST', `tweets/${tweetId}/delete`, callback)
}
    
export function apiActionTweet(tweetId, action, callback){
    let data = { id : tweetId, action : action }
    BackendLookup('POST', 'tweets/action/', callback, data)
}
    
export function apiLoadTweets(username , callback, nextUrl) {
    let endpoint = 'tweets/'
    if (username){
        endpoint = `tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace(prodUrl, "")
    }
    BackendLookup('GET', endpoint , callback)
    }

export function apiFeedTweets(callback, nextUrl) {
    let endpoint = 'tweets/feed/'
    if (nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace(prodUrl, "")
    }
    BackendLookup('GET', endpoint , callback)
    }

export function apiTweetDetail(tweetId, callback){
    BackendLookup('GET', `tweets/${tweetId}/`, callback)
}