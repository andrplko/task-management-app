import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, ZodTypeDef } from 'zod';
import styles from './Form.module.scss';

interface FormProps<TFormValues extends FieldValues, Schema> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  schema?: Schema;
}

const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >,
>({
  onSubmit,
  children,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    mode: 'all',
    resolver: schema && zodResolver(schema),
  });

  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(onSubmit)}
      className={styles.form}
    >
      {children(methods)}
    </form>
  );
};

export default Form;
