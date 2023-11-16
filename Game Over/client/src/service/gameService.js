import { bodyCheck } from '../utils/bodyCheck';

const baseUrl = 'http://localhost:3030/data/games';

const request = async (url, method, token, body, bodyModel) => {

    const options = {
        method: method,
        headers: {}
    }

    if (token) {
        options.headers = {
            'X-Authorization': token
        }
    }

    if (body !== undefined) {
        options.headers = {
            'content-type': 'application/json',
            'X-Authorization': token
        }
        options.body = JSON.stringify(body)
    }

    try {
        if (body) {
            bodyCheck(body, bodyModel);
        }

        const response = await fetch(url, options);

        if (response.status === 200) {
            const result = await response.json();

            return result;
        } else if (response.status === 204) {

            return [];
        }

        return [];

    } catch (err) {
        throw Error(err.message);
    }

}

export const getAllGames = () => {
    return request(`${baseUrl}`, "GET")
};

export const getGame = (id) => {
    return request(`${baseUrl}/${id}`, "GET");
};

export const updateGame= async (id, body, token) => {
    return request(`${baseUrl}/${id}`, "PUT", token, body, "CRUD");
};

export const deleteGame = async (id, token) => {
    return request(`${baseUrl}/${id}`, "DELETE", token);
};

export const addGame = async (body, token) => {
    return request(baseUrl, "POST", token, body, "CRUD");
};