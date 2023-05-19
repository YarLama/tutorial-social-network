import { AxiosError } from 'axios';
import { Formik, FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../app/api/authApi';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { Button, FormError, InputPhone, InputText } from '../../../../UI';
import { prepareRegistrationData } from '../../helpers/prepareSubmit';
import { RegistrationFormValues } from '../../helpers/types';
import { validateRegistrationValues } from '../../helpers/validateRegistrationValues';

const RegistrationForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [registration] = authApi.useRegistrationMutation();

    const initialValues: RegistrationFormValues = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    // const initialValues: RegistrationFormValues = {
    //     first_name: 'Test1',
    //     last_name: 'Tester',
    //     phone: '79043642561',
    //     email: 'test1@test.ru',
    //     password: 'test1',
    //     confirm_password: 'test1'
    // }

    const handleSubmit = async (values: RegistrationFormValues, actions: FormikHelpers<RegistrationFormValues>) => {
        
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            const body = prepareRegistrationData(
                values.first_name,
                values.last_name,
                values.phone,
                values.email,
                values.password
            )
            const user = await registration(body).unwrap();
            dispatch(authSlice.actions.login(user.token));
            actions.resetForm();
            navigate(RoutePaths.TEST_PAGE);
        } catch (e) {
            setErrorForm((e as AxiosError).status === 400 ? 'Такой пользователь уже существует' : 'Что-то пошло не так')
        }
        actions.setSubmitting(false);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateRegistrationValues,
        validateOnChange: false,
        onSubmit: handleSubmit,
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='registration-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <InputText 
                        name='first_name'
                        label='First name'
                        value={values.first_name}
                        contentError={errors.first_name}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='last_name'
                        label='Last name'
                        value={values.last_name}
                        contentError={errors.last_name}
                        readonly={formik.isSubmitting}
                    />
                    <InputPhone 
                        name='phone'
                        label='Phone'
                        value={values.phone}
                        contentError={errors.phone}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='email' 
                        label='E-mail'
                        value={values.email} 
                        contentError={errors.email}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='password' 
                        label='Password'
                        type='password'
                        value={values.password} 
                        contentError={errors.password}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='confirm_password' 
                        label='Confirm Password'
                        type='password'
                        value={values.confirm_password} 
                        contentError={errors.confirm_password}
                        readonly={formik.isSubmitting}
                    />
                    {!errorForm ? null : <FormError content={errorForm}/>}
                    <Button content='Registration' type='submit' disabled={formik.isSubmitting}/>
                </form>
            </FormikProvider>
        </div>
    );
};

export {RegistrationForm};