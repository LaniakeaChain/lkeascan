import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<Element>,
  onClickOutside: () => void,
  disabled: boolean,
) => {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [disabled, onClickOutside, ref]);
};

export default useClickOutside;
