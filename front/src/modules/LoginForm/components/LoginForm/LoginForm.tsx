import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt, setLocalToken } from '../../../../app/helper/tokenHelpers';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { Button, FormError, InputText } from '../../../../UI';
import { getLoginToken } from '../../api/loginRequest';
import { ILoginValues } from '../../helpers/types';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const initialValues: ILoginValues = {
    //     email: '',
    //     password: ''
    // }

    const initialValues: ILoginValues = {
        email: 'senya228@kek.ru',
        password: 'qwerty1234'
    }

    const handleSubmit = (values: ILoginValues, actions: FormikHelpers<ILoginValues>): void => {
        setErrorForm('')
        actions.setSubmitting(true)
        const responce = getLoginToken(values.email, values.password);
        responce.then((data) => {
            console.log(data, parseJwt(data.token))
            setLocalToken(data.token);
            dispatch(authSlice.actions.authorizationSuccess(data.token))
            navigate(RoutePaths.TEST_PAGE)
        }).catch((error: Error) => {
            setErrorForm(error.message)
        }).finally(() => {
            actions.setSubmitting(false);
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