'use client'
import { END_POINT } from "@/app/config";
import { newPost } from "@/app/store/slices/postSlice";
import { getUser } from "@/app/store/slices/userSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

export default function NewPost({isModalOpen,closeModal}){
    const dispatch = useDispatch();
    const router = useRouter();
    const curUser = useSelector((state) => state.user.user)
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState("");
    const filters = [
        {
            id: 1,
            name: 'Original',
            style: '',
        },
        {
            id: 2,
            name: 'Clarendon',
            style: '',
        },
        {
            id: 3,
            name: 'Gingham',
            style: '',
        },
        {
            id: 4,
            name: 'Moon',
            style: '',
        },
        {
            id: 5,
            name: 'Lark',
            style: '',
        },
        {
            id: 6,
            name: 'Reyes',
            style: '',
        },
        {
            id: 7,
            name: 'Juno',
            style: '',
        },
        {
            id: 8,
            name: 'Slumber',
            style: '',
        },
        {
            id: 9,
            name: 'Crema',
            style: '',
        },
        {
            id: 10,
            name: 'Ludwig',
            style: '',
        },
        {
            id: 11,
            name: 'Aden',
            style: '',
        },
        {
            id: 12,
            name: 'Perpetua',
            style: '',
        },
    ]
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setPhoto(event.target.files[0]);
        setSelectedImage(uploadedImage);
        nextStep();
    };
    const handleFilterSelect = (index) => {
        setSelectedFilter(index);
        console.log(index);
    }
    const handleChangeCaption = (event) => {
        const newText = event.target.value
        if(newText.length <= 200) {
            setCaption(newText);
        }
    }
    const handleChangeLocation = (event) => {
        const newText = event.target.value
        if(newText.length <= 30) {
            setLocation(event.target.value)
        }
    }
    const closeModalWindow = () => {
        closeModal();
        setSelectedFilter(null);
        setCurrentStep(1);
        setCaption("");
        setLocation("");
    }
    const sharePost = () => {
        if(caption && location){
            dispatch(newPost(curUser.login, photo, caption, location))
            closeModalWindow();
            dispatch(getUser(curUser.login));
            router.push('/profile');
        } else {
            alert('Заполните все поля!')
        }
    }
    return (
        <section>
            {isModalOpen && <div className="newPost">
                    <button 
                        onClick={closeModalWindow}
                        className="modalWindow-closeButton"
                    >
                        &times;
                    </button>
                    {currentStep == 1 &&<div className="newPost-modal">
                        <div className="newPost-header">
                            <h4>Create new post</h4>
                        </div>
                        <form className="newPost-form">
                            <img src="/images/icons/newPostIcon.png" alt="" />
                            <p>Select a photo from computer</p>
                            <input onChange={handleImageUpload} type="file" id="mediaInput" accept="image/*"/>
                            <label htmlFor="mediaInput" id="chooseFileLabel">Select from computer</label>
                        </form>
                    </div>}
                    {currentStep == 2 &&<div className="editPost-modal">
                        <div className="editPost-header">
                            <button onClick={prevStep}>
                                <img src="/images/icons/arrowLeft.svg" alt="" />
                            </button>
                            <h4>Edit</h4>
                            <button onClick={nextStep}>Next</button>
                        </div>
                        <div className="editPost-container">
                            <div className="editPost-container-left">
                                <img src={URL.createObjectURL(selectedImage)} alt="" />
                            </div>
                            <div className="editPost-container-right">
                                <div className="editPost-container-right-header">
                                    <h5>Filters</h5>
                                </div>
                                <div className="editPost-container-right-filters">
                                    {
                                        filters.map((filter, index) => (
                                            <React.Fragment key={index}>
                                                <div
                                                    onClick={() => handleFilterSelect(index)}
                                                    className={`editPost-filter ${selectedFilter === index ? "editPost-filter-selected" : ""}`}
                                                >
                                                    <img src="/images/icons/filterIcon.png" alt="" />
                                                    <span>{filter.name}</span>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>}
                    {currentStep == 3 &&<div className="editPost-modal">
                        <div className="editPost-header">
                            <button onClick={prevStep}>
                                <img src="/images/icons/arrowLeft.svg" alt="" />
                            </button>
                            <h4>Create new post</h4>
                            <button onClick={sharePost}>Share</button>
                        </div>
                        <div className="editPost-container">
                            <div className="editPost-container-left">
                                <img src={URL.createObjectURL(selectedImage)} alt="" />
                            </div>
                                <div className="sharePost-container">
                                    <div>
                                        {curUser.photoUrl && <img src={`${END_POINT}/${curUser.photoUrl}`} alt="" className="user-profile-logo" />}
                                        {!curUser.photoUrl && <img src={`images/icons/profilePicture.svg`} alt="" className="user-profile-logo" />}
                                        <h5>{curUser.login}</h5>
                                    </div>
                                    <div className="sharePost-container-input">
                                        <small>Location*</small>
                                        <input
                                            value={location}
                                            type="text"
                                            onChange={handleChangeLocation}
                                            placeholder="Write a location..."
                                        />
                                        <span>{location.length}/{30 - location.length}</span>
                                    </div>
                                    <div className="sharePost-container-textarea">
                                        <small>Caption*</small>
                                        <textarea
                                            value={caption}
                                            onChange={handleChangeCaption}
                                            rows="10"
                                            cols="50"
                                            maxLength="200"
                                            placeholder="Write a caption..."
                                        ></textarea>
                                        <span>{caption.length}/{200 - caption.length}</span>
                                    </div>
                                </div>
                            </div>
                    </div>}
                </div>
            }
        </section>
    )
}