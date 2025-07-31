const escapeODataValue = (value) => value.replace(/'/g, "''");

export const buildODataQuery = ({ category, search, startDate, endDate }) => {
    const filters = [];

    if (search) {
        const lowerSearch = escapeODataValue(search.toLowerCase());
        filters.push(`(contains(tolower(NewsTitle),'${lowerSearch}'))`);
    }

    if (category) {
        filters.push(`Category eq '${category}'`);
    }

    if (startDate) {
        filters.push(`CreatedDateTime ge ${new Date(startDate).toISOString()}`);
    }

    if (endDate) {
        filters.push(`CreatedDateTime le ${new Date(endDate).toISOString()}`);
    }

    return filters.length ? `$filter=${filters.join(' and ')}` : '';

};