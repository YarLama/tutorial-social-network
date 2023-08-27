import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { photoApi } from '../../../../app/api/photoApi';
import { userApi } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { getPhoneWithoutSymbols } from '../../../../app/helpers/common/text';
import { getImageUrl, getLocalImageUrl } from '../../../../app/helpers/http';
import { UserModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { Avatar } from '../../../../components';
import { Button, InputFile, InputPhone, InputText, InputTextarea } from '../../../../UI';
import { prepareSettingAvatarData, prepareSettingUserData } from '../../helpers/prepareSubmit';
import { SettingFormValues } from '../../helpers/types';
import { validateSettingValues } from '../../helpers/validateSettingValues';
import './styles/style.scss';

interface ISettingForm {
    userInfo: UserModelType;
}

const SettingForm: React.FC<ISettingForm> = ({userInfo}) => {

    const [isSettingUpdated, setIsSettingUpdated] = useState<boolean>(false);
    const { id: userId } = getUserInfoFromLocalToken();
    const [ updateUser ] = userApi.useUpdateUserMutation();
    const [ createPhoto ] = photoApi.useCreatePhotoMutation();
    const [ setAvatarState ] = photoApi.useSetAvatarStateMutation();
    const dispatch = useAppDispatch();
    const { avatar: ava} = useAppSelector(state => state.userReducer)

    const initialValues: SettingFormValues = {
        firstName: userInfo.first_name,
        middleName: userInfo.middle_name ?? '',
        lastName: userInfo.last_name,
        phone: userInfo.phone,
        email: userInfo.email,
        description: userInfo.description,
        avatar: userInfo.avatar?.image ?? null
    }

    const handleSubmit = async (values: SettingFormValues, actions: any) => {
        try {
            actions.setSubmitting(true);
            const userBody = prepareSettingUserData(
                values.firstName,
                values.lastName,
                values.middleName,
                values.phone,
                values.email,
                values.description
            );
            const avatarBody = values.avatar ? prepareSettingAvatarData(String(userId), values.avatar) : null;
            const userResponce = await updateUser({id: String(userId), data: userBody}).unwrap();
            const avatarResponce = (!isAvatarChanged() && avatarBody) ? await createPhoto(avatarBody).unwrap() : null;
            const setAvatarStateResponce =  avatarResponce ? await setAvatarState(String(avatarResponce.id)).unwrap() : null;
            console.log(avatarResponce, setAvatarStateResponce)
            dispatch(userSlice.actions.setUserAndAvatar({user:userResponce, avatar: setAvatarStateResponce}));
            actions.setSubmitting(false);
        } catch (e) {
            actions.setSubmitting(false);
            console.log(e);
        }
    }

    const isAvatarChanged = (): boolean => {
        const initialAvatar = initialValues.avatar ? (initialValues.avatar as string).split('/').slice(-1)[0] : null;
        const valuesAvatar = values.avatar ? (values.avatar as File).name : null;
        const isAvatarChanged = (!!values.avatar === !!initialValues.avatar) && (valuesAvatar === initialAvatar);
        return isAvatarChanged;
    }

    const handleUpdateField = () => {
        const updatedFirstName = values.firstName === initialValues.firstName;
        const updatedMiddleName = values.middleName === initialValues.middleName;
        const updatedLastName = values.lastName === initialValues.lastName;
        const updatedPhone = getPhoneWithoutSymbols(values.phone) === getPhoneWithoutSymbols(initialValues.phone);
        const updatedEmail = values.email === initialValues.email;
        const updatedDescription = values.description === initialValues.description;
        const updateCondition = updatedFirstName 
        && updatedMiddleName 
        && updatedLastName 
        && isAvatarChanged() 
        && updatedPhone 
        && updatedEmail 
        && updatedDescription;
        setIsSettingUpdated(!updateCondition);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateSettingValues,
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
                    <div className='setting-form-user-avatar'>
                        <Avatar src={isAvatarChanged() ? getImageUrl(initialValues.avatar) : getLocalImageUrl(values.avatar)} size='m'/>
                        <InputFile 
                            name='avatar' 
                            content='Update avatar photo' 
                            value={values.avatar} 
                        />
                    </div>
                    <div className='setting-form-user-info'>
                        <InputText 
                            name='firstName'
                            label='First Name'
                            value={values.firstName}
                            contentError={errors.firstName}
                        />
                        <InputText 
                            name='middleName'
                            label='Middle Name'
                            value={values.middleName ?? ''}
                            contentError={errors.middleName}
                        />
                        <InputText 
                            name='lastName'
                            label='Last Name'
                            value={values.lastName}
                            contentError={errors.lastName}
                        />
                        <InputText 
                            name='email'
                            label='E-mail'
                            value={values.email}
                            contentError={errors.email}
                        />
                        <InputPhone 
                            name='phone'
                            label='Phone number'
                            value={values.phone}
                            contentError={errors.phone}
                        />
                        <InputTextarea 
                            name='description'
                            label='About Me'
                            value={values.description ?? ''}
                        />
                    </div>
                    <div className='setting-post-toolkit'>
                        <Button content='Update Settings' type='submit' disabled={!isSettingUpdated || formik.isSubmitting}/>
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {SettingForm};