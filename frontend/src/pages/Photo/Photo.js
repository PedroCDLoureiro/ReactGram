import "./Photo.css";

import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

// components
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { photo, loading, error, message } = useSelector(
        (state) => state.photo
    );

    // comments

    // load photo data

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // like and comments

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
        </div>
    );
};

export default Photo;
