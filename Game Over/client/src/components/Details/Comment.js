export const Comment = ({
    comment
}) => {
    return (
        <div className='comments-info'>
            <div className="comment-img">
                <figure><img src="/images/userPic.png" alt="userPic" /></figure>
            </div>
            <div className="comment-text">
                <h3>User 0607:</h3>
                <p>{comment}</p>
            </div>
        </div>
    );
};