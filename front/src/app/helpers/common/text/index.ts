export const convetToFullName = (firstName: string, lastName: string, middleName: string | null): string => {
    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
}