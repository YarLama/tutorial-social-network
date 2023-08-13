export type SettingFormValues = {
    firstName: string;
    middleName: string | null;
    lastName: string;
    description: string | null;
    phone: string;
    email: string;
    avatar?: File | string | null;
}

export type SettingFormErrors = {
    firstName?: string | null,
    lastName?: string | null,
    middleName?: string | null,
    description?: string | null,
    phone?: string | null;
    email?: string | null;
    avatar?: File | string | null; 
}