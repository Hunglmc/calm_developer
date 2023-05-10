import category from '../../../src/entities/category';

export default function addCategory({ name, description, createdAt, userId, categoryRepository }) {
    // TODO: add a proper validation (consider using @hapi/joi)
    if (!title || !description) {
        throw new Error('name and description fields cannot be empty');
    }

    const newCategory = category({ name, description, createdAt, userId });

    return categoryRepository.add(newCategory);
}
