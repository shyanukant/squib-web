import React from "react";
import { useState, useEffect } from "react";
import { apiCreateTweet, apiTweetDetail} from "./lookup";
import { TweetList } from "./tweetlist";
import { FeedList } from "./feedlist";
import { Tweet } from "./tweet";

export function TweetComponent(props) {
    // console.log(props)
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet, status) => {
        // backend api response 
        // console.log(newTweet, status)
        if (status === 201) {
            setNewTweets([newTweet, ...newTweets])
        } else {
            alert("The error occurred, Please try again later!!")
            console.log(newTweet)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        const newValue = textAreaRef.current.value
        // create tweet in server  - backend api reqest
        apiCreateTweet(newValue, handleNewTweet)
        textAreaRef.current.value = '';
    }

    useEffect(() => {
        if (newTweets.length !== 0){
            setNewTweets([]);
        }
    }, [newTweets])

    return <div className={props.className}>
        { canTweet === true && <div className="col-span-12 my-5 ">
        <form  onSubmit={handleSubmit}>
                <textarea className="border-b-2 rounded-lg shadow-lg p-3 border-gray-200 w-11/12" name="message" ref={textAreaRef} required={true}></textarea><br />
                <button className="float-right bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 py-2 rounded-2xl text-white hover:bg-indigo-600" name="Tweet" >Tweet</button>
            </form>
            
        </div>
        }
        <TweetList newTweets={newTweets} {...props} />
    </div>
}

export function FeedComponent(props) {
    // console.log(props)
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet, status) => {
        // backend api response 
        // console.log(newTweet, status)
        if (status === 201) {
            setNewTweets([newTweet, ...newTweets])
        } else {
            alert("The error occurred, Please try again later!!")
            console.log(newTweet)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        const newValue = textAreaRef.current.value
        // create tweet in server  - backend api reqest
        apiCreateTweet(newValue, handleNewTweet)
        textAreaRef.current.value = '';
    }

    useEffect(() => {
        if (newTweets.length !== 0){
            setNewTweets([]);
        }
    }, [newTweets])

    return <div className={props.className}>
        { canTweet === true && <div className="col-span-12 my-5 ">
            <form  onSubmit={handleSubmit}>
                <textarea className="border-b-2 rounded-lg shadow-lg p-3 border-gray-200 w-11/12" name="message" ref={textAreaRef} required={true}></textarea><br />
                <button className="float-right bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 py-2 rounded-2xl text-white hover:bg-indigo-600" name="Tweet" >Tweet</button>
            </form>
        </div>
        }
        <FeedList newTweets={newTweets} {...props} />
    </div>
}

export function TweetDetailComponent(props){
    const {tweetId} = props
    const [tweet, setTweet] = useState(null)
    const [didLookup, setDidLookup] = useState(false)

    const handleLookupDetail = (response, status) => {
        // console.log(response, status)
        if (status === 200){
            setTweet(response)
        }else{
            alert("There was a error finding your tweet!!")
        }
    } 

    useEffect(() => {
        if (didLookup === false ){
            apiTweetDetail(tweetId, handleLookupDetail)
            setDidLookup(true)
        }
    }, [tweetId, didLookup, setDidLookup])

    return tweet === null ? null : <Tweet tweet = {tweet} className={props.className}/>

}