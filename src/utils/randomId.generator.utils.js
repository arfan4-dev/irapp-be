export const generateId = (prefix) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `${prefix}-${randomDigits}`;
};
