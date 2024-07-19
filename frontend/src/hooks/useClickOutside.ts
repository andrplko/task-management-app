import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (value: boolean) => void,
  isOpen: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const { target } = e;

      if (target instanceof Node && !ref.current?.contains(target)) {
        callback(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return function removeListener() {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
};

export default useClickOutside;
