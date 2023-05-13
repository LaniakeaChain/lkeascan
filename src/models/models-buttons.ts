import { CSSProperties, ReactNode } from 'react';

export enum EModalButtonType {
  GhostSquare = '--ghost-square',
  BlueSquare = '--blue-square',
}

export interface IModalButtonConfig {
  onClick(): void;
  text: ReactNode;
  type: EModalButtonType;
  style?: CSSProperties;
  disabled?: boolean;
}
