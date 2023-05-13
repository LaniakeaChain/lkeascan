import React, { useState } from 'react';

import { CARD_PURPLE, LIGHT_GREY, WHITE } from 'data/data-style';

export function ViewGroup(props) {
  const { views } = props;
  const [activeView, setActiveView] = useState(props.activeView);

  return (
    <>
      <style jsx>{`
        .ButtonGroup {
          position: relative;
          display: inline-flex;
          vertical-align: middle;
          margin-bottom: 1.75rem;
          margin-top: -32px;
        }
        .ButtonGroup button {
          position: relative;
          flex: 0 1 auto;
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid ${WHITE};
          padding: 0.5rem 1rem;
          background-color: ${LIGHT_GREY};
        }
        .ButtonGroup button + button {
          margin-left: -1px;
        }
        .ButtonGroup button.inactive:hover {
          background-color: #d5d4d4;
        }
        .ButtonGroup button.active {
          color: ${WHITE};
          background-color: ${CARD_PURPLE};
          font-weight: 500;
        }
        @media only screen and (max-width: 768px) {
          .ButtonGroup {
            margin-top: inherit;
          }
        }
      `}</style>
      <div className="ButtonGroup">
        {Object.keys(views).map((k) => (
          <button
            key={k}
            className={`${activeView === k ? 'active' : 'inactive'}`}
            onClick={() => setActiveView(k)}
          >
            {views[k].label}
          </button>
        ))}
      </div>
      <div>{views[activeView].component}</div>
    </>
  );
}
