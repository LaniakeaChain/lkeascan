import React, { CSSProperties } from 'react';

import { FAINT_GREY } from 'data/data-style';

interface Props {
  style?: CSSProperties;
  errorMessage?: string;
}

export function ErrorMessageFetch(props: Props) {
  const { errorMessage, style } = props;
  return (
    <>
      <style jsx>{`
        div.ErrorMessageFetch {
          color: ${FAINT_GREY};
          width: 100%;
          font-size: 22px;
          line-height: 22px;
          padding: 42px 0;
          text-align: center;
        }
      `}</style>

      <div style={style} className="ErrorMessageFetch">
        {errorMessage ? errorMessage : 'Something went wrong'}
      </div>
    </>
  );
}
