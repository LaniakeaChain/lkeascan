import React from 'react';

import { NotFound404 } from 'components/pages/_error/not-found-404';

export interface IErrorProps {
  statusCode: number;
}

function Error(props: IErrorProps) {
  if (props.statusCode === 404) {
    return <NotFound404 />;
  } else {
    return (
      <p>
        {props.statusCode
          ? `An error ${props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}

(Error as any).getInitialProps = ({ err, res }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
