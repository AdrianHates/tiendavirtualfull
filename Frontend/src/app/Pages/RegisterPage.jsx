import SignUpForm from '../../components/SignUpForm';
import "../../styles/RegisterPage.css"

const RegisterPage = () => {
  return (
    <div id='registro'>
      <h1>Registro de usuario</h1>
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;