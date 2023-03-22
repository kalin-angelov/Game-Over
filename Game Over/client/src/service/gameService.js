import { bodyCheck } from '../utils/bodyCheck';

const baseUrl = 'http://localhost:3030/data/gameList';

export const getAll = async () => {
    try {
        const response = await fetch(baseUrl);
        
        if (response.status === 200) {
            const result = await response.json();
            const games = Object.values(result);

            return games;
        } else if (response.status === 204) {

            return [];
        } 

        return [];
        
    } catch(err) {
        console.log(`Error: ${err}`);
        return [];
    }
};

export const getOne = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const result = await response.json();

        return result;
    }catch(err) {
        console.log(`Error: ${err}`);
    }
};

export const deleteOne = async (id, token) => {
    try {
        const response = await fetch(`${baseUrl}/${id}` , { 
            method: 'DELETE',
            headers:{
                'X-Authorization': token
            }
        });
        const result = await response.json();

        return result;
    } catch(err) {
        throw new Error(`Error: ${err}`);
    }
};

export const addOne = async (body, token) => {
    try {
        bodyCheck(body);

        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(body)
        });
    } catch(err) {
        throw Error(`Error: ${err}`);
    }
};

export const updateOne = async (id, body, token) => {
    try {
        bodyCheck(body);

        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();

        return result;
    } catch(err) {
        throw Error(`Error: ${err}`);
    }
};
