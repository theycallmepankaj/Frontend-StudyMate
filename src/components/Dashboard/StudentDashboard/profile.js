import React, { useState, useEffect } from 'react';
import {
    FaUser, FaCamera, FaIdCard, FaEdit, FaSave,
    FaPhone, FaMapMarkerAlt, FaEnvelope, FaBookOpen
} from 'react-icons/fa';
import './profile.css';
import { getCurrentUser } from '../../auth/Auth';
import axios from 'axios';
import Endpoint, { BASE_URL } from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';

function StudentProfilePage() {
    let user = getCurrentUser();
    console.log("user.contact", user.profile.contact);
    const [userProfile, setUserProfile] = useState({
        name: user?.name,
        email: user?.email,
        role: user?.role,
        studentId: user?._id,
        profile: {
        imageName: user?.profile?.imageName || "",
        contact: user?.profile?.contact || "",
        address: user?.profile?.address || "",
        bio: user?.profile?.bio || ""
    }
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setEditedProfile(userProfile);
        setPreviewImage(Endpoint.FILE_BASE_URL + "/" + userProfile.profile.imageName);
    }, [userProfile]);

    const handleEditClick = () => setIsEditing(true);

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedProfile(userProfile);
        setPreviewImage(Endpoint.FILE_BASE_URL + "/" + userProfile.profile.imageName);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name" || name === "email") {
            setEditedProfile(prev => ({ ...prev, [name]: value }));
        } else {
            setEditedProfile(prev => ({
                ...prev,
                profile: { ...prev.profile, [name]: value }
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {setEditedProfile(prev => ({...prev,profileImageFile: file}));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("name", editedProfile.name);
        formData.append("email", editedProfile.email);
        formData.append("contact", editedProfile.profile.contact || "");
        formData.append("address", editedProfile.profile.address || "");
        formData.append("bio", editedProfile.profile.bio || "");

        if (editedProfile.profileImageFile) {
            formData.append("imageName", editedProfile.profileImageFile); // 👈 must match multer
        }

        try {
            const response = await axios.patch(`${Endpoint.CREATE_PROFILE}/${user._id}`,formData,{ withCredentials: true});

            setUserProfile(response.data.user);
            setIsEditing(false);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response.data.errorMessage);
        }
    };

    const getProfileImageUrl = () => {
        if (previewImage) return previewImage;
        return BASE_URL+`${userProfile.name.substring(0, 2).toUpperCase()}`;
    };

    return <>
        <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 page-title">Student Profile</h2>
                {!isEditing && (
                    <button className="btn btn-info edit-profile-btn" onClick={handleEditClick}>
                        <FaEdit className="mr-1" /> Edit Profile
                    </button>
                )}
            </div>

            <div className="card profile-card">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-4">
                        <FaUser className="mr-2 profile-section-icon" />
                        <h5 className="mb-0 profile-section-title">Personal Information</h5>
                    </div>

                    <div className="profile-header d-flex align-items-center mb-4">
                        <div className="profile-avatar mr-4 position-relative">
                            <img
                                src={BASE_URL+"/profile/"+user?.profile?.imageName}
                                alt="Profile"
                                className="rounded-circle"
                                width={80}
                                height={80}
                            />
                            {isEditing && (
                                <div className="camera-icon-overlay">
                                    <FaCamera />
                                    <input
                                        type="file"
                                        name="imageName"
                                        accept="image/*"
                                        className="camera-input"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="mb-1 profile-name">{userProfile.name}</h4>
                            <p className="text-muted mb-1 profile-details">Computer Science • Sophomore</p>
                            <span className="badge badge-student-id d-flex align-items-center">
                                <FaIdCard className="mr-1" /> Student ID: {userProfile.studentId}
                            </span>
                        </div>
                    </div>

                    <div className="row profile-details-grid">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={editedProfile.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="profile-text-display">{userProfile.name}</p>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={editedProfile.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="profile-text-display">{userProfile.email}</p>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="contact"
                                    className="form-control"
                                    value={editedProfile.profile.contact}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="profile-text-display">{userProfile.profile.contact}</p>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Location</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={editedProfile.profile.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="profile-text-display">{userProfile.profile.address}</p>
                            )}
                        </div>

                        <div className="col-12 mb-4">
                            <label className="form-label">Bio</label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    className="form-control"
                                    rows="3"
                                    value={editedProfile.profile.bio}
                                    onChange={handleChange}
                                ></textarea>
                            ) : (
                                <p className="profile-text-display">{userProfile.profile.bio}</p>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="d-flex justify-content-end mt-3">
                            <button type="button" className="btn btn-outline-secondary mr-2" onClick={handleCancelClick}>Cancel</button>
                            <button type="button" className="btn btn-info" onClick={handleSaveChanges}>
                                <FaSave className="mr-1" /> Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default StudentProfilePage;
