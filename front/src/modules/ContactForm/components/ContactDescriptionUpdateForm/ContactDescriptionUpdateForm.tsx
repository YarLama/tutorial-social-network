import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteContactMutation, useUpdateContactMutation } from '../../../../app/api/contactApi';
import { convertToFullName } from '../../../../app/helpers/common/text';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { Avatar } from '../../../../components';
import { Button, InputTextarea } from '../../../../UI';
import { prepareContactDescriptionUpdateData } from './helpers/prepareSubmit';
import { ContactDesriptionFormUpdateValues } from './helpers/types';
import './styles/style.scss'

interface IContactDescriptionUpdateFormProps {
    contactId: number;
}

const ContactDescriptionUpdateForm: React.FC<IContactDescriptionUpdateFormProps> = ({contactId}) => {
    
    const { contacts } = useAppSelector(state => state.contactReducer)
    const currentContact = contacts.find(el => el.id === contactId);

    if (!currentContact) return null;

    const [isDescriptionUpdated, setIsDescriptionUpdated] = useState<boolean>(false);
    const { user } = currentContact;
    const { isMobile } = useWindowSize()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ deleteContact ] = useDeleteContactMutation();
    const [ updateContact ] = useUpdateContactMutation();

    const initialValues: ContactDesriptionFormUpdateValues = {
        description: currentContact.description ?? ''
    }

    const handleSubmit = async (values: ContactDesriptionFormUpdateValues, actions: FormikHelpers<ContactDesriptionFormUpdateValues>) => {
        try {
            const data = prepareContactDescriptionUpdateData(values, currentContact.id);
            const responce = await updateContact(data).unwrap();
            dispatch(contactSlice.actions.updateContact({
                id: currentContact.id,
                description: data.description !== '' ? data.description : null,
                user: user
            }));
            actions.resetForm({
                values: {
                    description: data.description ?? ''
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdateField = () => {
        setIsDescriptionUpdated(values.description !== initialValues.description)
    }

    const handleMessageClick = () => {
        navigate(replaceWithId(RoutePaths.MESSAGE_PAGE_WITH_ID, user.id))
    }

    const handleAvatarClick = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, user.id))
    }

    const handleDeleteClick = async () => {
        try {
            if (currentContact) {
                await deleteContact({id: currentContact.id}).unwrap();
                dispatch(contactSlice.actions.deleteContact(currentContact));
            }
        } catch (e) {
            console.log(e);
        }
    }  

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        onReset: () => setIsDescriptionUpdated(false)
    })

    const handleCancelClick = () => {
        formik.resetForm();
    }

    const {errors, values, isSubmitting} = formik;

    useEffect(() => {
        handleUpdateField();
    }, [values])
    
    return (
        <div className='contact-description-update-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div onClick={handleAvatarClick} className='avatar-box'>
                        <Avatar 
                            src={user.photos.length ? getImageUrl(user.photos[0].image) : undefined}
                            size='m'
                        />
                    </div>
                    <div className='name-box'>
                        {convertToFullName(user.first_name, user.last_name, user.middle_name)}
                    </div>
                    <div className='description-box'>
                        <InputTextarea 
                            name='description'
                            label={ !isMobile ? 'Description' : undefined}
                            value={values.description ?? ''}
                            maxLength={254}
                        />
                    </div>
                    <div className='tooltip'>
                            {
                                !isDescriptionUpdated ?
                                <>
                                    <Button 
                                        content='Message'
                                        size='s'
                                        onClick={handleMessageClick}
                                    />
                                    <Button 
                                        content='Delete'
                                        size='s'
                                        onClick={handleDeleteClick}
                                    />
                                </>
                                : 
                                <>
                                    <Button 
                                        content='Update'
                                        size='s'
                                        type='submit'
                                    />
                                    <Button 
                                        content='Cancel'
                                        size='s'
                                        onClick={handleCancelClick}
                                        type='button'
                                    />
                                </>
                            }            
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {ContactDescriptionUpdateForm};