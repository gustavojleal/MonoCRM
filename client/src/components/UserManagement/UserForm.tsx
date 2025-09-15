import React from 'react';
import { UserService } from "../../services/UserService";
import { userFormConfig } from '../Forms/schema/userFormConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import FormBuilder from '../core/FormBuilder';
import { User } from '../../common/types/types'

const UserForm: React.FC = () => {
  const methods = useDynamicForm(userFormConfig)

  const handleSubmit = async (data: User) => {
    try {
      const authData = await UserService.create(data);
      console.log('User created successfully:', authData);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };
  return (
    <div className="contect-form-login">
      <h2>New User</h2>
      <FormBuilder
        formTitle="New User"
        formConfig={userFormConfig}
        methods={methods}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default UserForm;