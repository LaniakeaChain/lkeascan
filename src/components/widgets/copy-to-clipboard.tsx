import Clipboard from 'clipboard';
import React, { useEffect, useRef } from 'react';

interface Props {
  contentToCopy: string;
  onClick(isSuccess: boolean): void;
  children: JSX.Element;
}

export function CopyToClipboard({ children, contentToCopy, onClick }: Props) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const clipboard = new Clipboard(ref.current);
    clipboard.on('success', () => onClick(true));
    clipboard.on('error', () => onClick(false));
    return () => clipboard.destroy();
  }, [onClick]);

  return (
    <div ref={ref} data-clipboard-text={contentToCopy}>
      {children}
    </div>
  );
}
