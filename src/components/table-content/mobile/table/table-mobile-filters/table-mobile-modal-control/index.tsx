import React, { useEffect } from 'react';

import { ButtonApply } from 'components/inputs/button-apply';
import { ButtonReset } from 'components/inputs/button-reset';
import { WHITE } from 'data/data-style';

import { TableMobileModalHeader } from '../table-mobile-modal/table-mobile-modal-header';
import { TableMobileModalMask } from '../table-mobile-modal/table-mobile-modal-mask';
import { TableMobileModalWrapper } from '../table-mobile-modal/table-mobile-modal-wrapper';

interface Props {
  children: JSX.Element;
  onApply(): void;
  onCloseModal(): void;
  onReset(): void;
  title: string;
}

export function TableMobileModalControl({
  children,
  onApply,
  onCloseModal,
  onReset,
  title,
}: Props) {
  useEffect(() => {
    document.getElementById('__next').style.display = 'none';
    window.scrollTo(0, 0);

    return () => {
      document.getElementById('__next').style.display = 'block';
    };
  }, []);

  return (
    <>
      <TableMobileModalMask style={{ backgroundColor: WHITE, width: 272 + 48 }} />
      <TableMobileModalWrapper>
        <div>
          <TableMobileModalHeader onCloseModal={onCloseModal}>{title}</TableMobileModalHeader>
          {children}
        </div>
        <div style={{ marginTop: 148 }}>
          <ButtonReset onClick={onReset} />
          <ButtonApply onClick={onApply} />
        </div>
      </TableMobileModalWrapper>
    </>
  );
}
