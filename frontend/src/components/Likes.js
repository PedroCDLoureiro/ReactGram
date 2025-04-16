import "./Likes.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

const Likes = ({ photo, user, handleLike }) => {
    return (
        <div className="like">
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill />
                    ) : (
                        <BsHeart onClick={() => handleLike(photo)} />
                    )}
                    <p>
                        {photo.likes.length}
                        {photo.likes.length === 1 ? " curtida" : " curtidas"}
                    </p>
                </>
            )}
        </div>
    );
};

export default Likes;
