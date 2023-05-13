import React from 'react';

import { CustomHead } from 'components/app-shell/custom-head';
import { GLOBAL_STYLES } from 'components/app-shell/styles';
import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';

export default () => (
  <>
    {GLOBAL_STYLES}
    <style jsx>{`
      div.IconDotInteractions {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        min-height: 100vh;
      }
      div.interaction-wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #eee;
        padding: 40px 0;
      }
      h4 {
        padding-bottom: 40px;
        font-weight: 600;
      }
    `}</style>
    <CustomHead />
    <div className="InteractionAnimations">
      <div className="interaction-wrapper">
        <h4>Scale from 0 to 1</h4>
        <InteractiveButton
          style={{
            width: 32,
            height: 32,
          }}
          animationConfig={{
            initial: { scale: 0 },
            variants: { interact: { scale: 1 } },
            exit: { scale: 0 },
          }}
        >
          {ICON.Copy}
        </InteractiveButton>
      </div>
      <div className="interaction-wrapper">
        <h4>Scale from 0 to 1 and fade-in</h4>
        <InteractiveButton
          style={{
            width: 32,
            height: 32,
          }}
          animationConfig={{
            initial: { scale: 0, opacity: 0 },
            variants: { interact: { scale: 1, opacity: 1 } },
            exit: { scale: 0, opacity: 0 },
          }}
        >
          {ICON.Copy}
        </InteractiveButton>
      </div>
    </div>
  </>
);
