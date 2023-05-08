export default function deleteById(id, categoryRepository) {
    return categoryRepository.findById(id).then((post) => {
        if (!post) {
            throw new Error(`No post found with id: ${id}`);
        }
        return postRepository.deleteById(id);
    });
}
