import findAll from '../../application/use_cases/category/findAll';
import countAll from '../../application/use_cases/category/countAll';
import addNewCategory from '../../application/use_cases/category/add';
import findById from '../../application/use_cases/category/findById';
import updateById from '../../application/use_cases/category/updateById';
import deleteCategoryById from '../../application/use_cases/category/deleteById';

export default function categoryController(
    categoryDbRepository,
    categoryDbRepositoryImpl,
    cachingClient,
    categoryCachingRepository,
    categoryCachingRepositoryImpl,
) {
    const dbRepository = categoryDbRepository(categoryDbRepositoryImpl());
    const cachingRepository = categoryCachingRepository(categoryCachingRepositoryImpl()(cachingClient));
    // Fetch all the posts of the logged in user
    const fetchAllCategory = (req, res, next) => {
        const params = {};
        const response = {};

        // Dynamically created query params based on endpoint params
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                params[key] = req.query[key];
            }
        }
        // predefined query params (apart from dynamically) for pagination
        // and current logged in user
        params.page = params.page ? parseInt(params.page, 10) : 1;
        params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
        params.userId = req.user.id;

        findAll(params, dbRepository)
            .then((categorys) => {
                response.categorys = categorys;
                const cachingOptions = {
                    key: 'category_',
                    expireTimeSec: 30,
                    data: JSON.stringify(categorys),
                };
                // cache the result to redis
                cachingRepository.setCache(cachingOptions);
                return countAll(params, dbRepository);
            })
            .then((totalItems) => {
                response.totalItems = totalItems;
                response.totalPages = Math.ceil(totalItems / params.perPage);
                response.itemsPerPage = params.perPage;
                return res.json(response);
            })
            .catch((error) => next(error));
    };

    const fetchCategoryById = (req, res, next) => {
        findById(req.params.id, dbRepository)
            .then((category) => {
                if (!category) {
                    throw new Error(`No category found with id: ${req.params.id}`);
                }
                res.json(category);
            })
            .catch((error) => next(error));
    };

    const addNewCategorys = (req, res, next) => {
        const { name, description } = req.body;
        addNewCategory({
            name,
            description,
            userId: req.user.id,
            categoryRepository: dbRepository
        }).then((category) => {
                const cachingOptions = {
                    key: 'category_',
                    expireTimeSec: 30,
                    data: JSON.stringify(category),
                };
                // cache the result to redis
                cachingRepository.setCache(cachingOptions);
                return res.json('post added');
            })
            .catch((error) => next(error));
    };

    const deleteCategorysById = (req, res, next) => {
        deleteCategoryById(req.params.id, dbRepository)
          .then(() => res.json('Category sucessfully deleted!'))
          .catch((error) => next(error));
        };
    
      const updateCategoryById = (req, res, next) => {
        const { name, description } = req.body;
    
        updateById({
          id: req.params.id,
          name,
          description,
          userId: req.user.id,
          categoryRepository: dbRepository
        })
          .then((message) => res.json(message))
          .catch((error) => next(error));
      };

    return {
        fetchAllCategory,
        fetchCategoryById,
        addNewCategorys,
        updateCategoryById,
        deleteCategorysById
    };
}
