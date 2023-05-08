import { AxiosError } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../app/api/authApi';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { Button, FormError, InputText } from '../../../../UI';
import { ILoginValues } from '../../helpers/types';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, {data, error, isLoading}] = authApi.useLoginMutation();

    // const initialValues: ILoginValues = {
    //     email: '',
    //     password: ''
    // }

    const initialValues: ILoginValues = {
        email: 'senya228@kek.ru',
        password: 'qwerty1234'
    }

    const handleSubmit = async (values: ILoginValues, actions: FormikHelpers<ILoginValues>) => {
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            const kek = await login({email: values.email, password: values.password}).unwrap();
            dispatch(authSlice.actions.login(kek.token))
            navigate(RoutePaths.TEST_PAGE)
            console.log(kek, kek.token, data?.token, error, isLoading)
        } catch (e) {
            setErrorForm((e as AxiosError).status === 401 ? 'Неправильный логин или пароль' : 'Что-то пошло не так')
        }
        actions.setSubmitting(false);
        actions.resetForm();
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
                    readonly={formik.isSubmitting}
                />
                <InputText 
                    name='password' 
                    label='Password'
                    type='password'
                    value={values.password} 
                    onChange={formik.handleChange}
                    hasError={!!errors.password}
                    contentError={errors.password}
                    readonly={formik.isSubmitting}
                />
                {!errorForm ? null : <FormError content={errorForm}/>}
                <Button content='Login' type='submit' disabled={formik.isSubmitting}/>
            </form>
        </div>
    );
};

export {LoginForm};