import "./Photo.css";

import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

// components
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";
import Likes from "../../components/Likes";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPhoto, like, comment } from "../../slices/photoSlice";

const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);

    const { photo, loading, error, message } = useSelector(
        (state) => state.photo
    );

    const [commentText, setCommentText] = useState();

    // load photo data

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // insert a like

    const handleLike = () => {
        dispatch(like(photo._id));

        resetMessage();
    };

    // insert a comment

    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id,
        };

        dispatch(comment(commentData));

        setCommentText("");

        resetMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <Likes photo={photo} user={user} handleLike={handleLike} />

            <div className="message-container">
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </div>
            <div className="comments">
                {photo.comments && (
                    <>
                        <h3>Comentários: ({photo.comments.length})</h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder="Insira o seu comentário..."
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                            />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && (
                            <p>Não há comentários...</p>
                        )}
                        {photo.comments.map((comment, index) => (
                            <div className="comment" key={index}>
                                <div className="author">
                                    {comment?.userImage && (
                                        <img
                                            src={`${uploads}/users/${comment.userImage}`}
                                            alt={comment?.userName || "Usuário"}
                                        />
                                    )}
                                    <Link to={`/users/${comment?.userId}`}>
                                        <p>{comment?.userName || "Usuário"}</p>
                                    </Link>
                                </div>
                                <p>{comment?.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Photo;
