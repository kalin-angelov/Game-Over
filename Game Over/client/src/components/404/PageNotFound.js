import { Link } from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <div className='ups'>
            <div className="titlePage">
                <h2>404</h2>
            </div>
            <div className='page-not-found'>
                <h3>Page Not Found</h3>
                <p>
                    The Page You Are Looking For Doesn't Exist Or Another Error Occurred. Go.......
                    <Link to='/'>Home</Link>
                </p>
            </div>
        </div>
    );
};
