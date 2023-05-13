import React from 'react';

import { ACTIVE_PURPLE_TEXT_MOBILE, MOBILE_GREY_TEXT } from 'data/data-style';

export function MetadataUploadContent() {
  return (
    <>
      <style jsx>{`
        span.text {
          color: ${MOBILE_GREY_TEXT};
        }
        span.blue-text {
          color: ${ACTIVE_PURPLE_TEXT_MOBILE};
        }
      `}</style>
      <>
        <span className="text">
          {`Drag a file here or `}
          <span className="blue-text">browse</span>
          {` for a file to upload.`}
        </span>
      </>
    </>
  );
}
