import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { UserModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { Button, InputText, InputTextarea } from '../../../../UI';

interface ISettingForm {
    userInfo: UserModelType;
}

type testType = {
    firstName: string;
    middleName: string | null;
    lastName: string;
    description: string | null;
    avatar?: File | string | null;
}

const SettingForm: React.FC<ISettingForm> = ({userInfo}) => {

    const [isSettingUpdated, setIsSettingUpdated] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const initialValues: testType = {
        firstName: userInfo.first_name,
        middleName: userInfo.middle_name,
        lastName: userInfo.last_name,
        description: userInfo.description,
        avatar: userInfo.avatar?.image
    }

    const handleSubmit = async (values: testType, actions: any) => {
        console.log(values)
    }

    const handleUpdateField = () => {

    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const { values, errors} = formik;

    useEffect(() => {
        handleUpdateField();
    }, [values])

    return (
        <div className='setting-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div style={{width: '200px', height: '200px', backgroundColor: 'gray'}}>Avatar</div>
                    <div className='setting-form-user-info'>
                        <InputText 
                            name='firstName'
                            label='First Name'
                            value={values.firstName}
                        />
                        <InputText 
                            name='middleName'
                            label='Middle Name'
                            value={values.middleName ?? ''}
                        />
                        <InputText 
                            name='lastName'
                            label='Last Name'
                            value={values.lastName}
                        />
                        <InputTextarea 
                            name='description'
                            label='About Me'
                            value={values.description ?? ''}
                        />
                    </div>
                    <div className='setting-post-toolkit'>
                        <Button content='Update Settings' type='submit'/>
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {SettingForm};