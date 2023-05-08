import post from '../../../src/entities/post';

export default function updateById({ id, title, description, createdAt, isPublished, userId, categoryRepository }) {
    // validate
    if (!title || !description) {
        throw new Error('title and description fields are mandatory');
    }
    const updatedCategory = post({
        title,
        description,
        createdAt,
        isPublished,
        userId,
    });

    return categoryRepository.findById(id).then((foundCategory) => {
        if (!foundCategory) {
            throw new Error(`No post found with id: ${id}`);
        }
        return postRepository.updateById(id, updatedCategory);
    });
}
