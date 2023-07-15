export const replaceWithId = (url: string, id: any): string => {
    if (id === null) return '';
    return url.replace(':id', id.toString())
}