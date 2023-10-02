const addZeroPrefixToDate = (date: number): string => {
    return date < 10 ? `0${date}` : `${date}`;
}

export const getDate = (timestamp: string): string => {
    const date = new Date(timestamp);

    return `${addZeroPrefixToDate(date.getDate())}.${addZeroPrefixToDate(date.getMonth() + 1)}.${date.getFullYear()} ${addZeroPrefixToDate(date.getHours())}:${addZeroPrefixToDate(date.getMinutes())}`;
}