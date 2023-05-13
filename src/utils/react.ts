import { Children, cloneElement } from 'react';

import { IDictionary } from 'models/models-general';

export function renderSwitch(
  key: string | number,
  callbacks: IDictionary<() => JSX.Element>,
  defaultCallback?: () => JSX.Element,
): JSX.Element | null {
  if (callbacks[key]) {
    return callbacks[key]();
  } else {
    if (defaultCallback) {
      return defaultCallback();
    } else {
      return null;
    }
  }
}

export const childrenWithProps = (children, props) =>
  Children.map(children, (child) => cloneElement(child, props));
