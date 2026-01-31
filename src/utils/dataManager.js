/**
 * Simulates optimized MongoDB queries on a local dataset.
 * Supports filtering, sorting, and search.
 */
export const queryData = (data, options = {}) => {
    let result = [...data];
    const { search, filters, sort } = options;

    // Simulate Search
    if (search) {
        const query = search.toLowerCase();
        result = result.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(query)
            )
        );
    }

    // Simulate Filters
    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                result = result.filter(item => item[key] === filters[key]);
            }
        });
    }

    // Simulate Sorting
    if (sort) {
        const { field, order } = sort;
        result.sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return result;
};
