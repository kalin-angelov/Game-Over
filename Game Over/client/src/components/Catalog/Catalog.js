import { GamesList } from './GamesList';
import { GoToTopButton } from '../GoToTopButton/GoToTopButton';

export const Catalog = () => {
    return (
        <section>
            <GamesList />

            <GoToTopButton />
        </section>
    );
};