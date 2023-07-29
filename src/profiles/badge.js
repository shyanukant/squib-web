import React, { useEffect, useState } from "react";
import { DisplayFollowInfo } from "./utils";
import { apiProfileDetail, apiFollowToggle } from "./lookup";
import { UserDisplay, UserPicture } from "./component";


export function ProfileBadge(props) {
    const { user, didFollowToggle, profileLoading, isOwner } = props
    let currentFollowStatus = (user && user.is_following) ? "Unfollow" : "Follow"
    currentFollowStatus = profileLoading ? "Loading..." : currentFollowStatus
    const btnClassName = "bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 py-2 rounded-xl text-white hover:bg-indigo-600 "

    const handleBadgeBtn = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentFollowStatus)
        }
       
    }
    
    return user ? <div className="container-sm">
        <div className="flex justify-between">
            <div>
                <UserPicture user={user} className="h-24 w-24 text-center text-4xl block " hideLink />
            </div>
            <div className=" inline align-bottom">
            { isOwner ?  <a href="edit/" className={btnClassName}>Edit</a> : 
            <button className={btnClassName}
                    onClick={handleBadgeBtn}>
                    {  currentFollowStatus  }
                </button>  }
            </div>
        </div>
        <p><UserDisplay className="text-4xl capitalize" user={user} inCludeFullName hideLink /></p>
        <p>{user.bio}</p>
        <p className="capitalize">{user.location}</p>
        <p>🔗<a href={user.link}>{user.link}</a></p>
        <DisplayFollowInfo user={user} className="font-thin" />


    </div> : null
}

export function ProfileBadgeComponent(props) {
    console.log(props)
    const { username, currentUser } = props
    const [profile, setProfile] = useState(null)
    const [didLookup, setDidLookup] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleProfileDetail = (response, status) => {
        if (status === 200) {
            setProfile(response)
            setIsOwner(currentUser === username)
        } else {
            alert("There was a error finding this profile ")
        }
    }
    console.log(profile, username)
    useEffect(() => {
        if (didLookup === false) {
            apiProfileDetail(username, handleProfileDetail)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])


    const handleFollowToggle = (actionVerb) => {
        // console.log(actionVerb)
        apiFollowToggle(username, actionVerb, (response, status) => {
            if (status === 200) {
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }

    return didLookup === false ? "Loading..." : profile ? <ProfileBadge
        user={profile}
        didFollowToggle={handleFollowToggle}
        profileLoading={profileLoading}
        isOwner = {isOwner} /> : null
}
