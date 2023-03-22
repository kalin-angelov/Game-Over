export const bodyCheck = (body) => {
    const isTheBodyEmpty = (Object.values(body)).filter(x => x === '');

    if (isTheBodyEmpty.length > 0) {
        throw Error('All Filed\'s Are Required!');
    }
};
