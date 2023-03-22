import { Link } from 'react-router-dom';

export const Game = (game) => {
    return (
        <div className="col-md-12 margin_bottom">
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <div className="two-box">
                        <figure><img src={game.imageUrl} alt="{game.title}" /></figure>
                    </div>
                </div>
                <div className="Games">
                    <h3>{game.title}</h3>
                    <p>Players: {game.players}</p>
                    <p>Platform: {game.platform}</p>
                    <p>Genre: {game.genre}</p>
                    <Link to={`/details/${game._id}`} state={game}>Details</Link>
                </div>
            </div>
        </div>
    );
};
