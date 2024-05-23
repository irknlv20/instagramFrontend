import { editUser } from "@/app/store/slices/userSlice";
import EmojiPicker from "@emoji-mart/react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile({closeModal}){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser)
    const [login, setLogin] = useState(user.login);
    const [fullname, setFullname] = useState(user.fullname);
    const [biography, setBiography] = useState(user.biography);
    const [gender, setGender] = useState(user.gender);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const handleChangeLogin = (event) => {
        const newText = event.target.value;
        if(newText.length<=20){
            setLogin(newText);
        }
    }
    const handleChangeFullname = (event) => {
        const newText = event.target.value;
        if(newText.length<=30){
            setFullname(newText);
        }
    }
    const handleChangeBiography = (event) => {
        const newText = event.target.value;
        if(newText.length<=100){
            setBiography(newText);
        }
    }
    const handleEditProfile = () => {
        if(fullname && login){
            dispatch(editUser(login,fullname,biography,gender))
            closeModal();
        } else {
            alert("Заполните обязательные поля!")
        }
    }
    const handleEmojiAction = () => {
        if(isEmojiOpen){
            setIsEmojiOpen(false)
        } else if(!isEmojiOpen){
            setIsEmojiOpen(true)
        }
    }
    const handleEmojiSelect = (emoji) => {
        setBiography(prevContent => {
            return(prevContent + emoji.native)
        })
    }
    return(
        <section>
            <div className="modalWindow">
                        <button 
                            onClick={closeModal}
                            className="modalWindow-closeButton"
                        >
                            &times;
                        </button>
                <div className="edit-profile">
                    <div className="edit-profile-header">
                        <h4>Edit Your Profile</h4>
                    </div>
                    <div className="edit-profile-container">
                        <div className="edit-profile-container-el">
                            <small>Login*</small>
                            <input 
                                value={login}
                                onChange={handleChangeLogin}
                                placeholder="Write your login..."
                                type="text" 
                            />
                            <span>{login.length}/{20}</span>
                        </div>
                        <div className="edit-profile-container-el">
                            <small>Fullname*</small>
                            <input 
                                value={fullname}
                                onChange={handleChangeFullname}
                                placeholder="Write your fullname..."
                                type="text" 
                            />
                            <span>{fullname.length}/{30}</span>
                        </div>
                        <div className="edit-profile-container-el">
                            <small>Biography</small>
                            <textarea 
                                value={biography}
                                onChange={handleChangeBiography}
                                placeholder="Write your biography..."
                                name="" 
                                id="" 
                                cols="30" 
                                rows="3"
                            />
                            <img
                                onClick={handleEmojiAction} 
                                src="/images/icons/smileIcon.svg" alt="" 
                            />
                            {isEmojiOpen && <div className="edit-profile-container-el-emoji">
                                <EmojiPicker
                                    theme={'light'} 
                                    emojiSize={14} 
                                    perLine={6} 
                                    maxFrequentRows={0} 
                                    searchPosition={'none'}
                                    previewPosition={'none'}
                                    onEmojiSelect={handleEmojiSelect}
                                />
                            </div>}
                            <span>{biography?.length}/{100}</span>
                        </div>
                        <div className="edit-profile-container-el">
                            <small>Gender</small>
                            <div>
                                <input 
                                    type="radio"
                                    name="gender"
                                    onClick={() => setGender(1)}
                                    id="genderMen"
                                    checked={gender === 1}
                                />
                                <label htmlFor="genderMen">Men</label>
                            </div>
                            <div>
                                <input 
                                    type="radio"
                                    name="gender"
                                    onClick={() => setGender(2)}
                                    id="genderWomen"
                                    checked={gender === 2}
                                />
                                <label htmlFor="genderWomen">Women</label>
                            </div>
                        </div>
                        <button onClick={handleEditProfile}>Apply</button>
                    </div>
                </div>
            </div>
        </section>    
    )
}