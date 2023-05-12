export default function category({ name, description, createdAt, userId,updatedAt }) {
    return {
        getName: () => name,
        getDescription: () => description,
        getCreatedAt: () => createdAt,
        getUserId: () => userId,
        getUpdatedAt: () => updatedAt,
    };
}
