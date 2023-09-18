export const convertToFullName = (firstName: string, lastName: string, middleName: string | null): string => {
    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
}

export const getPhoneWithoutSymbols = (phone: string): string => phone.replace(/\D/g, '');
