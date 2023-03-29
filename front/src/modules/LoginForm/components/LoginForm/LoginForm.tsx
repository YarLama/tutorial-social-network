import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { Button, InputText } from '../../../../UI';
import { getLoginToken } from '../../api/loginRequest';
import { ILoginValues } from '../../helpers/types';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const initialValues: ILoginValues = {
        email: '',
        password: ''
    }

    const handleSubmit = async (values: ILoginValues, actions: FormikHelpers<ILoginValues>): Promise<void> => {
        console.log('Submit start', values)  
        const kek = await getLoginToken(values.email, values.password);
        console.log(kek)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateLoginValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='login-form'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <InputText 
                    name='email' 
                    label='E-mail'
                    value={values.email} 
                    onChange={formik.handleChange}
                    hasError={!!errors.email}
                    contentError={errors.email}
                />
                <InputText 
                    name='password' 
                    label='Password'
                    value={values.password} 
                    onChange={formik.handleChange}
                    hasError={!!errors.password}
                    contentError={errors.password}
                />
                <Button content='Login' type='submit' disabled={formik.isSubmitting}/>
            </form>
        </div>
    );
};

export {LoginForm};