// Helper to construct filter query string
export function buildFilterQuery(searchParams: URLSearchParams){
    const search = searchParams.get("search") || "";
    const categories = searchParams.getAll("category");
    const styles = searchParams.getAll("style");
    const materials = searchParams.getAll("material");
    const weightRanges = searchParams.getAll("weight").length > 0
        ? searchParams.getAll("weight")
        : searchParams.getAll("weightRange");
    const priceRanges = searchParams.getAll("price").length > 0
        ? searchParams.getAll("price")
        : searchParams.getAll("priceRange");

    let filters: string[] = [];

    if (search.trim()) {
        filters.push(`filters[name][$contains]=${search}`);
    }

    categories.forEach(c =>
        filters.push(`filters[$and][0][category][category][$eq]=${encodeURIComponent(c)}`)
    );
    styles.forEach((s, index) =>
        filters.push(`filters[$or][${index}][style][style][$eq]=${encodeURIComponent(s)}`)
    );
    materials.forEach((m, index) =>
        filters.push(`filters[$or][${index}][material][material][$eq]=${encodeURIComponent(m)}`)
    );

    weightRanges.forEach((range, index) => {
        const [min, max] = range.split("-").map(Number);
        filters.push(`filters[$or][${index}][weight][$gte]=${min}`);
        filters.push(`filters[$or][${index}][weight][$lte]=${max}`);
    });

    priceRanges.forEach((range, index) => {
        const [min, max] = range.split("-").map(Number);
        filters.push(`filters[$or][${index}][price][$gte]=${min}`);
        filters.push(`filters[$or][${index}][price][$lte]=${max}`);
    });

    return filters.length > 0 ? `&${filters.join("&")}` : "";
};
