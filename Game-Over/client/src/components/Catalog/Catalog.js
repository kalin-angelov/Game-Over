import { GamesList } from './GamesList';
import { GoToTopButton } from '../GoToTopButton/GoToTopButton';

export const Catalog = () => {
    return (
        <div>
            <GamesList />

            <GoToTopButton />
        </div>
    );
};