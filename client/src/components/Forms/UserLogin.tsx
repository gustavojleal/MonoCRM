import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { userFormConfig } from './schema/userLoginConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import { AppConfigContext } from '../../app/AppConfigProvider';
import FormBuilder from '../core/FormBuilder';


const UserLoginForm: React.FC = () => {
  const appConfig = React.useContext(AppConfigContext);
  const methods = useDynamicForm(userFormConfig)
  const navigate = useNavigate();

  const handleSubmit = async (data: { userName: string, password: string }) => {
    try {
      await AuthService.login(data);
      appConfig?.toggleLogged()
      navigate('/');


    } catch (error) {
      console.error('Erro no login:', error);
    }
  };
  return (
    <div className="contect-form-login">
      <h2>Login</h2>
      <FormBuilder
        formTitle="login_form"
        formConfig={userFormConfig}
        methods={methods}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default UserLoginForm;