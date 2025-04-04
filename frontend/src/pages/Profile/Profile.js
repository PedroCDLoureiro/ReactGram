import "./Profile.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import {
    publishPhoto,
    resetMessage,
    getUserPhotos,
} from "../../slices/photoSlice";

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto,
    } = useSelector((state) => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    // new form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // submit new photo
    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image,
        };

        // build form data
        const formData = new FormData();

        // Adiciona os dados ao FormData
        Object.keys(photoData).forEach((key) => {
            formData.append(key, photoData[key]);
        });

        // send photo to api
        dispatch(publishPhoto(formData));

        setTitle("");
        setImage("");

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (user.length === 0) {
        return <p>Usuário não encontrado</p>;
    }

    return (
        <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img
                        src={`${uploads}/users/${user.profileImage}`}
                        alt={user.name}
                    />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título para a foto:</span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title || ""}
                                />
                            </label>
                            <label>
                                <span>Foto:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && (
                                <input type="submit" value="Postar" />
                            )}
                            {loadingPhoto && (
                                <input
                                    type="submit"
                                    disabled
                                    value="Postando..."
                                />
                            )}
                        </form>
                    </div>
                    {errorPhoto && <Message msg={messagePhoto} type="error" />}
                    {messagePhoto && !errorPhoto && (
                        <Message msg={messagePhoto} type="success" />
                    )}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos &&
                        photos.map((photo) => (
                            <div className="photo" key={photo._id}>
                                {photo.image && (
                                    <img
                                        src={`${uploads}/photos/${photo.image}`}
                                        alt={photo.title}
                                    />
                                )}
                                {id === userAuth._id ? (
                                    <div className="actions">
                                        <Link to={`/photos/${photo._id}`}>
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill />
                                        <BsXLg />
                                    </div>
                                ) : (
                                    <Link
                                        className="btn"
                                        to={`/photos/${photo._id}`}
                                    >
                                        Ver mais
                                    </Link>
                                )}
                            </div>
                        ))}
                    {photos.length === 0 && <p>Nenhuma foto publicada</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
