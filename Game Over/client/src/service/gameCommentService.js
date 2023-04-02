import { bodyCheck } from '../utils/bodyCheck';

const baseUrl = 'http://localhost:3030/jsonstore';

const request = async (url, method, body) => {

    const options = {
        method: method,
        headers: {}
    }

    if (body) {
        options.headers = {
            'content-type': 'application/json',
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
        throw Error(err.message);
    }

}

export const addOneComment = async (id, body) => {
    return request(`${baseUrl}/${id}`,"POST", body);
};

export const getAllComments = async (id) => {
    return request(`${baseUrl}/${id}`,"GET");
};

export const getOneComment = async (gameId,id) => {
    return request(`${baseUrl}/${gameId}/${id}`,"GET");
};

export const deleteComment = async (gameId,id) => {
    return request(`${baseUrl}/${gameId}/${id}`,"DELETE");
};

export const updateComment = async (gameId, id, body) => {
    return request(`${baseUrl}/${gameId}/${id}`,"PUT", body);
};

export const likeComment = async (gameId, id, body) => {
    return request(`${baseUrl}/${gameId}/${id}`,"PUT", body);
};