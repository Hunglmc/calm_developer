import post from '../../../src/entities/post';

export default function addCategory({ title, description, createdAt, isPublished, userId, postRepository }) {
    // TODO: add a proper validation (consider using @hapi/joi)
    if (!title || !description) {
        throw new Error('title and description fields cannot be empty');
    }

    const newCategory = post({ title, description, createdAt, isPublished, userId });

    return postRepository.add(newCategory);
}
