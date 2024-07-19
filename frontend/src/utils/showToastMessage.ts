import { ToastOptions, toast } from 'react-toastify';

const showToastMessage = (
  message: string | undefined,
  options?: ToastOptions
) => toast(message, options);

export { showToastMessage };
