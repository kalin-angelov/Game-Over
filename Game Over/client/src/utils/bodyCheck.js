export const bodyCheck = (body, model) => {
    const isTheBodyEmpty = (Object.values(body)).filter(x => x === '');

    if (isTheBodyEmpty.length > 0) {
        throw Error('All Filed\'s Are Required!');
    }

    if (model === 'CRUD') {
        if (body.title.length < 4) {
            throw Error('Title Must Be At Least 4 Character\'s Long!');
        }
        if (body.genre.length < 3) {
            throw Error('Genre Must Be At Least 3 Character\'s Long!');
        }
        if (body.players < 0) {
            throw Error('Number Of Players Can\'t Be Negative Number!');
        }
        if (body.players === 0) {
            throw Error('Number Of Players Can\'t Be Zero (0)!');
        }
        if (body.summary.length < 10) {
            throw Error('Summary Must Be At Least 10 Character\'s Long!');
        }
        if (!body.imageUrl.startsWith('http') || !body.imageUrl.startsWith('http')) {
            throw Error('Invalid Image URL!');
        }
        if (body.summary.length > 500) {
            throw Error('Summary Can\'t Be More Than 500 Character\'s Long!');
        }
    }

    if (model === 'USER') {
        const { rePassword, ...bodyData } = body;

        if (bodyData.username.length < 5) {
            throw Error('Username Must Be At Least 5 Character\'s Long!');
        }
        if (!/[a-zA-Z0-9]+@[a-zA-z]+\.[a-zA-Z]+/.test(bodyData.email)) {
            throw Error('Invalid Email, Example *****@***.***');
        }
        if (bodyData.password.length < 6) {
            throw Error('Password Must Be At Least 6 Character\'s Long!');
        }
        if (rePassword !== bodyData.password) {
           throw Error('Password\'s Don\'t Match!');
        }

        return bodyData;
    }
};