export const bodyCheck = (body, model) => {
    const isTheBodyEmpty = (Object.values(body)).filter(x => x === '');

    if (isTheBodyEmpty.length > 0) {
        throw Error ('All Filed\'s Are Required!');
    }

    if (model === 'CRUD') {
        if (body.title.length < 4) {
            throw Error ('Title Must Be At Least 4 Character\'s Long!');
        }
        if (body.genre.length < 3) {
            throw Error ('Genre Must Be At Least 3 Character\'s Long!');
        }
        if (body.players < 0) {
            throw Error ('Number Of Players Can\'t Be Negative Number!');
        }
        if (body.players === 0) {
            throw Error ('Number Of Players Can\'t Be Zero (0)!');
        }
        if (body.summary.length < 10) {
            throw Error ('Summary Must Be At Least 10 Character\'s Long!');
        }
        if (!body.imageUrl.startsWith('http') || !body.imageUrl.startsWith('http')) {
            throw Error ('Invalid Image URL!');
        }
        if (body.summary.length > 500) {
            throw Error ('Summary Can\'t Be More Than 500 Character\'s Long!');
        }
    }
};