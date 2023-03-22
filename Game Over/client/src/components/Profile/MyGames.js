import { Link } from 'react-router-dom';

export const MyGames = ({ game }) => {
    return (
        <div className="two-items">
            <Link to={`/details/${game._id}`} >
                <img src={game.imageUrl} alt="{game.title}" />
            </Link>
        </div>
    );
};
