const baseUrl = 'http://localhost:3030/users';

export const register = async (body) => {
    const response = await fetch(`${baseUrl}/register`, {
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

    if (response.status === 204) {
        return {};
    }

    throw await response.json();
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

    throw Error ('Invalid Email Or Password!');
};