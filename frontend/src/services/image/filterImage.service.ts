const filterImageFunction = (searchQuery:any,tagQuery:any,images:any) => {
    const normalizedQuery = searchQuery.toLowerCase(); // make it case-insensitive
    const filteredImages = images.filter((image: any) => {
        const hasSearch = normalizedQuery.length > 0;
        const hasTagQuery = tagQuery.length > 0;
      
        // If neither search nor tag filtering is requested, show all
        if (!hasSearch && !hasTagQuery) return true;
      
        // Search matches
        const tagMatch = image.tags.some(
          (tag: string) =>
            tag.toLowerCase().includes(normalizedQuery) ||
            tag.toLowerCase().startsWith(normalizedQuery)
        );
        const nameMatch = image.user?.name?.toLowerCase().includes(normalizedQuery);
        const emailMatch = image.user?.email
          ?.toLowerCase()
          .includes(normalizedQuery);
      
        // Tag array match
        const tagMatch2 = image.tags.some((tag: string) =>
          tagQuery.some(
            (matchTag: string) => tag.toLowerCase() === matchTag.toLowerCase()
          )
        );
      
        return (hasSearch && (tagMatch || nameMatch || emailMatch)) || tagMatch2;
    })

    return filteredImages
}

export default filterImageFunction