import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, FormError, InputText } from '../../../../UI';
import { getLoginToken } from '../../api/loginRequest';
import { ILoginValues } from '../../helpers/types';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');

    // const initialValues: ILoginValues = {
    //     email: '',
    //     password: ''
    // }

    const initialValues: ILoginValues = {
        email: 'senya228@kek.ru',
        password: 'qwerty1234'
    }

    const handleSubmit = async (values: ILoginValues, actions: FormikHelpers<ILoginValues>): Promise<void> => {
        setErrorForm('')
        const responce = getLoginToken(values.email, values.password);
        responce.then((data) => {
            console.log(data)
        }).catch((error: Error) => {
            actions.setSubmitting(false);
            setErrorForm(error.message)
        }).finally(() => {
            actions.resetForm()
        })
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
            <p style={{color: 'white'}}>
                senya228@kek.ru<br/>
                qwerty1234
            </p>
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
                {!errorForm ? null : <FormError content={errorForm}/>}
                <Button content='Login' type='submit' disabled={formik.isSubmitting}/>
            </form>
        </div>
    );
};

export {LoginForm};