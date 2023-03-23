export const Comment = ({
    user,
    text
}) => {
    return (
        <div className='comments-info'>
            <div className="comment-img">
                <figure><img src="/images/userPic.png" alt="userPic" /></figure>
            </div>
            <div className="comment-text">
                <h3>{user}:</h3>
                <p>{text}</p>
            </div>
        </div>
    );
};