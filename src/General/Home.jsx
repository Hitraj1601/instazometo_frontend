import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/reels.css'
import ReelFeed from '../components/ReelFeed'


const Home = () => {
    const [videos, setVideos] = useState([])
    
    useEffect(() => {
        console.log("Home component mounted, fetching videos...")
        axios.get("http://localhost:5000/api/food/all", { withCredentials: true })
            .then(response => {
                console.log("API response:", response.data)
                // The API returns data in response.data.data, not response.data.foodItems
                const videos = (response.data.data || []).map(video => ({
                    ...video,
                    likeCount: Number(video.likeCount) || 0,
                    savesCount: Number(video.saveCount) || 0,
                    commentsCount: Number(video.commentsCount) || 0
                }));
                setVideos(videos)
            })
            .catch(err => {
                console.error("Failed to fetch videos:", err)
                console.log("Backend might not be running. Please start backend server.")
                setVideos([]) // fallback
            })
    }, [])


    
    async function likeVideo(item) {
        try {
            const response = await axios.post("http://localhost:5000/api/food/like", { foodId: item._id }, {withCredentials: true})

            if(response.data.liked){
                console.log("Video liked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { 
                    ...v, 
                    likeCount: Math.max(0, (Number(v.likeCount) || 0) + 1) 
                } : v))
            }else{
                console.log("Video unliked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { 
                    ...v, 
                    likeCount: Math.max(0, (Number(v.likeCount) || 0) - 1) 
                } : v))
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function saveVideo(item) {
        try {
            const response = await axios.post("http://localhost:5000/api/food/save", { foodId: item._id }, { withCredentials: true })
            
            if(response.data.saved){
                console.log("Video saved");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { 
                    ...v, 
                    savesCount: Math.max(0, (Number(v.savesCount) || 0) + 1) 
                } : v))
            }else{
                console.log("Video unsaved");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { 
                    ...v, 
                    savesCount: Math.max(0, (Number(v.savesCount) || 0) - 1) 
                } : v))
            }
        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

    return (
        <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
    />  
    )
}

export default Home