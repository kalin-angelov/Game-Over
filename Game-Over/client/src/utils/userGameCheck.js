export const userGameCheck = (data, userId) => {
    const result = data.filter(game => game._ownerId === userId);

    return result;
}; 