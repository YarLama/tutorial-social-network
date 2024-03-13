import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { IconButton, InputTextarea } from '../../../../UI';
import { ContactDesriptionFormUpdateValues } from './helpers/types';

interface IContactDescriptionUpdateFormProps {
    contactId: number;
    desription: string | null;
}

const ContactDescriptionUpdateForm: React.FC<IContactDescriptionUpdateFormProps> = ({desription, contactId}) => {
    
    const initialValues: ContactDesriptionFormUpdateValues = {
        description: desription
    }

    const handleSubmit = (values: ContactDesriptionFormUpdateValues, actions: FormikHelpers<ContactDesriptionFormUpdateValues>) => {
        console.log(values);
    }

    const handleCancelClick = () => {

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit
    })

    const {errors, values, isSubmitting} = formik;
    
    return (
        <div className='contact-description-update-form'>
            <FormikProvider value={formik}>
                <div className='tooltip'>
                    <IconButton 
                        icon='edit'
                        size='xs'
                    />
                    <IconButton 
                        icon='edit'
                        size='xs'
                    />
                </div>
                <div className='description-box'>
                    <InputTextarea 
                        name='description'
                        value={values.description ?? ''}
                        maxLength={254}
                    />
                </div>
            </FormikProvider>
        </div>
    );
};

export {ContactDescriptionUpdateForm};