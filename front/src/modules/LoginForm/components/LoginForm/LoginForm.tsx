import { AxiosError } from 'axios';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../app/api/authApi';
import { AuthLoginRequest } from '../../../../app/api/authApi/types';
import { replaceWithId } from '../../../../app/helpers/http';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { Button, FormError, InputText } from '../../../../UI';
import { prepareLoginData } from '../../helpers/prepareSubmit';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login] = authApi.useLoginMutation();

    // const initialValues: AuthLoginRequest = {
    //     email: '',
    //     password: ''
    // }

    // const initialValues: AuthLoginRequest = {
    //     email: 'SichulyAdmin@kek.ru',
    //     password: 'kekar1025'
    // }

    const initialValues: AuthLoginRequest = {
        email: 'chuhin228@mail.ru',
        password: 'chuhin228'
    }

    const handleSubmit = async (values: AuthLoginRequest, actions: FormikHelpers<AuthLoginRequest>) => {
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            const body = prepareLoginData(values.email, values.password);
            const responce = await login(body).unwrap();
            dispatch(authSlice.actions.login(responce.token));
            actions.resetForm();
        } catch (e) {
            setErrorForm((e as AxiosError).status === 401 ? 'Неправильный логин или пароль' : 'Что-то пошло не так')
        }
        actions.setSubmitting(false);
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
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                    {!errorForm ? null : <FormError content={errorForm}/>}
                    <Button content='Login' type='submit' disabled={formik.isSubmitting}/>
                </form>
            </FormikProvider>
        </div>
    );
};

export {LoginForm};