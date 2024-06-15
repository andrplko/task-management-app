import { ToastOptions, toast } from 'react-toastify';

const showToastMessage = (message: string, options?: ToastOptions) =>
  toast(message, options);

export { showToastMessage };
