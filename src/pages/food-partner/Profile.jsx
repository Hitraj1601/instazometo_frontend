import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [id])


    return (
        <main className="profile-page">
            {/* Header with Back Button and Name */}
            <header className="profile-header-top">
                <button 
                    className="profile-back-button"
                    onClick={() => navigate('/home')}
                    aria-label="Go back to home"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="profile-header-title">{profile?.name || "Food Partner"}</h1>
                <div className="profile-header-spacer"></div>
            </header>

            {/* Profile Photo Section */}
            <section className="profile-photo-section">
                <img 
                    className="profile-avatar" 
                    src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" 
                    alt={profile?.name || "Food Partner"} 
                />
            </section>

            {/* Profile Info Section */}
            <section className="profile-info-section">
                <div className="profile-info-main">
                    <div className="profile-text">
                        <h2 className="profile-name">{profile?.name || "Food Partner"}</h2>
                        <p className="profile-description">{profile?.address || "Address not available"}</p>
                        
                        {/* Contact Information */}
                        <div className="profile-contact">
                            <div className="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <span className="contact-text">{profile?.email || "Email not available"}</span>
                            </div>
                            <div className="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <span className="contact-text">{profile?.phone || "Phone not available"}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">{profile?.totalMeals || 0}</span>
                            <span className="stat-label">Total Meals</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{profile?.customersServed || 0}</span>
                            <span className="stat-label">Customers Served</span>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v.id} className="profile-grid-item">
                        {/* Placeholder tile; replace with <video> or <img> as needed */}


                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted ></video>


                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile