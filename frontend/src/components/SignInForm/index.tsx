import { FieldValues, SubmitHandler } from 'react-hook-form';
import Form from '@components/ui/Form';
import AuthLink from '@components/ui/AuthLink';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { signInSchema } from '@utils/validation/validationSchema';
import useSignInMutation from '@hooks/useSignInMutation';
import Routes from '@constants/routes';
import useAxiosInterceptors from '@hooks/useAxiosInterceptors';
import { setUser } from '@context/actions/authActions';
import { useAuthContext } from '@context/AuthContext';
import styles from './SignInForm.module.scss';

interface FormFields extends FieldValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { mutateAsync: signIn } = useSignInMutation();
  const { dispatch } = useAuthContext();

  useAxiosInterceptors();

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    const response = await signIn(data);

    setUser(dispatch, response.user);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sing In</h2>
      <Form<FormFields> schema={signInSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors, isDirty, isValid } }) => (
          <>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="user@example.com"
              registration={register('email')}
              error={errors.email}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              registration={register('password')}
              error={errors.password}
            />
            <Button type="submit" disabled={!isDirty || !isValid}>
              Sign In
            </Button>
            <AuthLink to={Routes.SIGN_UP} />
          </>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
