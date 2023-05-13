import React, { CSSProperties, useState } from 'react';

import { FlexView } from 'components/composable/flex-view';
import { ToolTip } from 'components/tool-tip';
import { ToolTipCopyIcon } from 'components/tool-tip/tool-tip-copy-icon';
import { CopyToClipboard } from 'components/widgets/copy-to-clipboard';
import { RESET_CLIPBOARD_DELAY } from 'data/data-style';
import { ILinkConfig } from 'models/models-data-general';
import { ILinkItem } from 'models/models-general';
import { capitalize } from 'utils/format';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';

import { ToolTipCell } from '../cell-tool-tip';
import { TextLink } from '../text-link';
import { TextOnly } from '../text-only';

interface Props {
  children: string | JSX.Element;
  contentToCopy: string;
  linkConfig?: ILinkConfig;
  links?: ILinkItem[];
  style?: CSSProperties;
  textStyle?: CSSProperties;
}

export function ToolTipCellCopy({
  children,
  contentToCopy,
  linkConfig,
  links,
  style,
  textStyle,
}: Props) {
  const [isCopied, setIsCopied] = useState(-1);
  const [copyTimeout] = useTimeout(RESET_CLIPBOARD_DELAY);

  return (
    <ToolTipCell
      style={style}
      toolTipContent={
        <ToolTip style={{ marginTop: 12 }}>
          {links ? (
            <FlexView flexDirection="column">
              {links.map((l, idx) => (
                <FlexView
                  key={idx}
                  flexDirection={'row'}
                  style={{ marginBottom: idx === links.length - 1 ? undefined : 6 }}
                >
                  <CopyToClipboard
                    contentToCopy={l.display}
                    onClick={(isSuccess: boolean) => {
                      setIsCopied(isSuccess ? idx : -1);
                      copyTimeout(() => setIsCopied(-1));
                    }}
                  >
                    <ToolTipCopyIcon isCopied={isCopied === idx} />
                  </CopyToClipboard>
                  {links.length > 1 && (
                    <span style={{ fontWeight: 'bold', marginRight: 4 }}>
                      {capitalize(l.rel) + ':'}
                    </span>
                  )}
                  <TextLink href={l.nextLinkConfig.href} as={l.nextLinkConfig.as}>
                    {l.display}
                  </TextLink>
                </FlexView>
              ))}
            </FlexView>
          ) : (
            <>
              <CopyToClipboard
                contentToCopy={contentToCopy}
                onClick={(isSuccess: boolean) => {
                  setIsCopied(isSuccess ? 0 : -1);
                  copyTimeout(() => setIsCopied(-1));
                }}
              >
                <ToolTipCopyIcon isCopied={isCopied === 0} />
              </CopyToClipboard>
              {contentToCopy}
            </>
          )}
        </ToolTip>
      }
    >
      <>
        {defined(linkConfig) ? (
          <TextLink style={textStyle} {...linkConfig}>
            {children}
          </TextLink>
        ) : typeof children === 'string' ? (
          <TextOnly style={{ ...textStyle, cursor: 'pointer' }} isToolTip>
            {children}
          </TextOnly>
        ) : (
          children
        )}
      </>
    </ToolTipCell>
  );
}
