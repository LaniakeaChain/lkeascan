import React, { CSSProperties } from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MOBILE_TEXT_VALUE } from 'data/data-style';
import { IBasicParameter, INameElementValue } from 'models/models-general';
import { formatHash, formatWithEllipsis } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

export function parametersToInfo(
  parameters: IBasicParameter[],
  isMobile?: boolean,
  isFunctionMeta?: boolean,
  withEllipsis = true,
): INameElementValue[] {
  return parameters.map((parameter: IBasicParameter) => {
    const { links, name, type } = parameter;
    const value = String(parameter.value);
    let textStyle: CSSProperties = {};

    if (isFunctionMeta) {
      textStyle = {
        ...textStyle,
        lineHeight: '12px',
        fontSize: 10,
        height: 12,
      };
    } else if (isMobile) {
      textStyle = {
        ...textStyle,
        color: MOBILE_TEXT_VALUE,
        lineHeight: '16px',
        fontSize: 12,
        height: 16,
      };
    }

    let transformedValue: JSX.Element = <TextOnly style={textStyle}>{value}</TextOnly>;

    if (links) {
      const link = getOptimalLink(['token', 'contract', 'account'], links);

      transformedValue = (
        <ToolTipContentInline
          textStyle={textStyle}
          style={{ top: 0, transform: 'none' }}
          contentToCopy={value}
          // links={links.map(toNextLink)}
          linkConfig={{ ...link.nextLinkConfig }}
        >
          {isHash(link.display) ? formatHash(link.display) : link.display}
        </ToolTipContentInline>
      );
    } else if (isHash(value)) {
      transformedValue = (
        <TextOnly style={textStyle}>
          {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
        </TextOnly>
      );
    } else if (type === 'uint256') {
      try {
        transformedValue = (
          <TextOnly style={textStyle}>
            {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
          </TextOnly>
        );
      } catch (err) {
        // I wonder why this may fail...
      }
    } else {
      transformedValue = (
        <TextOnly style={textStyle}>
          {parseValue(withEllipsis ? formatWithEllipsis(value) : value)}
        </TextOnly>
      );
    }

    const fullValue = typeof value === 'boolean' ? String(value) : value;

    return { name, value: transformedValue, fullValue };
  });

  function parseValue(value) {
    if (parameters[0].value.length === 1 || ['bytes32[]', 'address'].includes(parameters[0].type)) {
      return value;
    } else {
      return '[' + value + ']';
    }
  }
}
