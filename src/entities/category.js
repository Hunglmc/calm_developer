export default function category({ title, description, createdAt, isPublished = false, userId }) {
    return {
        getTitle: () => title,
        getDescription: () => description,
        getCreatedAt: () => createdAt,
        isPublished: () => isPublished,
        getUserId: () => userId,
    };
}
