import React, { useEffect } from 'react';

import { childrenWithProps } from 'utils/react';

interface Props {
  onClose?(): void;
  children: any;
}

export function DropdownWrapper(props: Props) {
  const { children, onClose } = props;

  useEffect(() => {
    const handleWindowClick = () => {
      onClose();
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [onClose]);

  return <div onClick={(e) => e.stopPropagation()}>{childrenWithProps(children, { onClose })}</div>;
}
