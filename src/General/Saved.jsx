import React, { useEffect, useState } from 'react';
import '../styles/reels.css';
import axios from 'axios';
import ReelFeed from '../components/ReelFeed';

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/food/save', { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods
          .filter((item) => item?.food && item.food._id) // ✅ Filter out null or malformed entries
          .map((item) => ({
            _id: item.food._id,
            video: item.food.video,
            description: item.food.description,
            likeCount: Number(item.food.likeCount) || 0,
            savesCount: Number(item.food.saveCount) || 0,
            commentsCount: Number(item.food.commentsCount) || 0,
            foodPartner: item.food.foodPartner,
          }));

        setVideos(savedFoods);
      })
      .catch((error) => {
        console.error('Error fetching saved foods:', error);
      });
  }, []);

  const removeSaved = async (item) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/food/save',
        { foodId: item._id },
        { withCredentials: true }
      );
      
      if (response.data.saved === false) {
        // Item was unsaved, remove it from the list
        setVideos((prev) => prev.filter((v) => v._id !== item._id));
      } else {
        // Update the count - ensure it never goes below 0
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: Math.max(0, (Number(v.savesCount) || 0) - 1) }
              : v
          )
        );
      }
    } catch (error) {
      console.error('Error removing saved item:', error);
    }
  };

  const handleLike = async (item) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/food/like',
        { foodId: item._id },
        { withCredentials: true }
      );
      
      // Update the like count in the local state
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { 
                ...v, 
                likeCount: response.data.liked 
                  ? (Number(v.likeCount) || 0) + 1 
                  : Math.max(0, (Number(v.likeCount) || 0) - 1)
              }
            : v
        )
      );
    } catch (error) {
      console.error('Error liking/unliking item:', error);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onLike={handleLike}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
