import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import theme from 'prism-react-renderer/themes/nightOwlLight';
import React from 'react';

import { LIGHT_GREY_TEXT } from 'data/data-style';

declare const window: any;
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-solidity');

interface Props {
  sourceCode: string;
  language: string;
  label?: string;
  lineNumbers?: boolean;
}

export function SourceCodeHighlight({ label, language, lineNumbers = false, sourceCode }: Props) {
  return (
    <>
      <style jsx>{`
        pre.prism-code {
          text-align: left;
          margin: 1rem 0;
          padding: 0.5rem;
          max-height: 25rem;
          overflow: scroll;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        pre.line-numbers {
          position: relative;
          padding-left: 3.8rem;
          counter-reset: linenumber;
        }

        pre.line-numbers > code {
          position: relative;
        }

        .line-numbers .line-row {
          position: absolute;
          pointer-events: none;
          top: 0;
          font-size: 100%;
          left: -3.8rem;
          width: 3rem; /* works for line-numbers below 1000 lines */
          letter-spacing: -1px;
          border-right: 1px solid #999;
          user-select: none;
        }

        .line-numbers .line {
          position: relative;
        }

        .line-numbers .line-row {
          pointer-events: none;
          display: block;
          counter-increment: linenumber;
        }

        .line-numbers .line-row:before {
          content: counter(linenumber);
          color: #999;
          display: block;
          padding-right: 0.8rem;
          text-align: right;
        }
        .file-name {
          color: ${LIGHT_GREY_TEXT};
          margin-top: 2rem;
        }
      `}</style>
      {label && <div className="file-name">{label}</div>}
      <Highlight
        {...defaultProps}
        theme={theme}
        code={sourceCode}
        /*
        // @ts-ignore */
        language={language}
      >
        {({ className, getTokenProps, style, tokens }) => (
          <pre className={className + (lineNumbers ? ' line-numbers' : '')} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div className="line" key={i}>
                  {lineNumbers && <span className="line-row"></span>}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </>
  );
}
