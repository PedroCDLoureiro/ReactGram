import "./Home.css";

// components
import Likes from "../../components/Likes";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    // load all photos

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    // like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id));

        resetMessage();
    };

    if (loading) {
        <p>Carregando...</p>;
    }

    return (
        <div id="home">
            {photos &&
                photos.map((photo) => (
                    <div key={photo._id}>
                        <PhotoItem photo={photo} />
                        <Likes
                            photo={photo}
                            user={user}
                            handleLike={handleLike}
                        />
                        <Link className="btn" to={`/photos/${photo._id}`}>
                            Ver mais
                        </Link>
                    </div>
                ))}
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Ainda não há fotos publicadas,{" "}
                    <Link to={`/users/${user._id}`}>clique aqui</Link>
                </h2>
            )}
        </div>
    );
};

export default Home;
