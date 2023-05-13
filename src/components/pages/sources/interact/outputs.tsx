import React from 'react';

import { TextLink } from 'components/table-content/desktop/table/table-data-row/text-link';
import { formatIntegersWithComma } from 'utils/format';

export function Outputs({ desc, receipt, values }) {
  if (values === null) {
    return null;
  }

  const types = desc.outputs.map((o) => o.type);
  const valuesArray = Array.isArray(values) ? values : [values];

  return (
    <>
      <style jsx>{`
        .Output {
          padding: 1rem 0.75rem;
          margin: 1rem 0;
          background-color: rgb(251, 251, 251);
          position: relative;
        }
        .label {
          position: absolute;
          top: 0;
          right: 0;
          padding: 3px 5px;
          color: #ccc;
        }
      `}</style>
      {types.length > 0 && (
        <div className="Output">
          <small className="label">Output</small>
          {types.map((t, i) => (
            <Output key={`${desc.name}-${t}-${i}`} value={valuesArray[i]} type={t} />
          ))}
        </div>
      )}
      {receipt !== null && (
        <div className="Output">
          <small className="label">Receipt</small>
          <Receipt receipt={receipt} />
        </div>
      )}
    </>
  );
}

function Receipt({ receipt }) {
  const { transactionHash } = receipt;

  return (
    <TextLink
      style={{ fontSize: '14px' }}
      href="/transactions/[detailsHash]"
      as={`/transactions/${transactionHash}`}
    >
      {transactionHash}
    </TextLink>
  );
}

function Output({ type, value }) {
  function convert() {
    if (type === 'string') {
      return value;
    } else if (type.startsWith('uint')) {
      return formatIntegersWithComma(value);
    } else if (type === 'address') {
      return value;
    } else if (type === 'bool') {
      return value ? 'true' : 'false';
    } else {
      return value.toString();
    }
  }

  return <div className={type}>{convert()}</div>;
}
