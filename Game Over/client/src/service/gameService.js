import { bodyCheck } from '../utils/bodyCheck';

const baseUrl = 'http://localhost:3030/data/gameList';

const request = async (url, method, token, body) => {

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
            bodyCheck(body);
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
        throw new Error(`Error: ${err}`);
        
    }

}

export const getAll = () => {
    return request(`${baseUrl}`, "GET")
};

export const getOne = (id) => {
    return request(`${baseUrl}/${id}`, "GET");
};

export const updateOne = async (id, body, token) => {
    return request(`${baseUrl}/${id}`, "PUT", token, body);
};

export const deleteOne = async (id, token) => {
    return request(`${baseUrl}/${id}`, "DELETE", token);
};

export const addOne = async (body, token) => {
    return request(baseUrl, "POST", token, body);
};