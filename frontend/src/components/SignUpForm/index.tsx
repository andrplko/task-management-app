import { FieldValues, SubmitHandler } from 'react-hook-form';
import AuthLink from '@components/ui/AuthLink';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Form from '@components/ui/Form';
import { signUpSchema } from '@utils/validation/validationSchema';
import useSignUpMutation from '@hooks/useSignUpMutation';
import Routes from '@constants/routes';
import styles from './SignUpForm.module.scss';

interface FormFields extends FieldValues {
  username: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const { mutate: signUp } = useSignUpMutation();

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    signUp(data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <Form<FormFields> schema={signUpSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors, isDirty, isValid } }) => (
          <>
            <Input
              id="username"
              label="Username"
              type="username"
              placeholder="Username"
              registration={register('username')}
              error={errors.username}
            />
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
              Sign Up
            </Button>
            <AuthLink to={Routes.SIGN_IN} />
          </>
        )}
      </Form>
    </div>
  );
};

export default SignUpForm;
