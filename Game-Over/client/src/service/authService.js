const baseUrl = 'http://localhost:3030/users';

export const register = async (body) => {
    try {
        const list = sessionStorage.getItem('list');

        if (list) {
            const isTaken = list.includes(body.username);

            if (isTaken) {
                throw Error('A User With The Same Username Already Exists!')
            }
        }
       
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {

            if (!list) {
                sessionStorage.setItem('list', body.username);
            } else {
                sessionStorage.setItem('list', `${list}, ${body.username}`);
            }

            const result = await response.json();
            return result;
        }

        if (response.status === 204) {
            return {};
        }

        throw await response.json();
    } catch (err) {
        throw Error(err.message);
    }

};

export const login = async (body) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status === 200) {
        const result = await response.json();

        return result;
    }

    throw Error('Invalid Email Or Password!');
};