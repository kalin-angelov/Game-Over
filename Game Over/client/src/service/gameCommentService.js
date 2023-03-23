import { bodyCheck } from '../utils/bodyCheck';

const baseUrl = 'http://localhost:3030/jsonstore';

export const addOneComment = async (id, body) => {
    try {
        bodyCheck(body);

        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();

        return result;
    } catch (err) {
        throw Error(`Error: ${err}`);
    }

};

export const getAllComments = async (id) => {
    try {
        
        const response = await fetch(`${baseUrl}/${id}`);

        if (response.status === 200) {
            const result = await response.json();
            const comments = Object.values(result);

            return comments;
        } else if (response.status === 204) {

            return [];
        }

        return [];
    } catch (err) {
        throw Error(`Error: ${err}`);
    }

};