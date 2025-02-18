import FormWrapper from './FormWrapper';

const SignUpForm = () => {
  return (
    <FormWrapper
      formTitle="Sign Up"
      formDescription="Please fill in the form to create an account."
      formType="signup">
      <p>This is a signup form</p>
    </FormWrapper>
  );
};

export default SignUpForm;
