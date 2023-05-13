import classNames from 'classnames';
import React, { CSSProperties, Component } from 'react';

import { ToolTip } from 'components/tool-tip';
import { ToolTipCopyButton } from 'components/tool-tip/tool-tip-content-inline/tool-tip-copy-button';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import { defined } from 'utils/variable-evaluation';

let ref;

interface Props {
  className?: string;
  style?: CSSProperties;
  children: JSX.Element | string;
  isToolTipDisabled?: boolean;
}

interface State {
  isEllipsisActive: boolean;
}

class TextTruncate extends Component<Props, State> {
  state = {
    isEllipsisActive: false,
  };

  private isEllipsisActive = (el) => defined(el) && el.offsetWidth < el.scrollWidth;

  public componentDidMount() {
    this.setState({
      isEllipsisActive: this.isEllipsisActive(ref),
    });
  }

  private recordRef = (el) => {
    if (el) {
      ref = el;
    }
  };

  private isToolTip = () =>
    this.state.isEllipsisActive && !this.props.isToolTipDisabled && this.isElipsesOnFunctioName();

  private isElipsesOnFunctioName = () => {
    const pattern = new RegExp('^' + /[a-zA-Z]/, 'gi');
    return (
      pattern.test(this.props.children.toString()) && this.props.children.toString().length < 60
    );
  };

  private renderText = (isToolTip?: boolean) => {
    const { children, className, style } = this.props;
    return (
      <>
        <style jsx>{`
          div.TextTruncate {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: ${isToolTip ? 'pointer' : 'inherit'};
          }
        `}</style>
        <div
          ref={this.recordRef}
          style={style}
          className={classNames(`TextTruncate`, { [className]: className })}
        >
          {children}
        </div>
      </>
    );
  };

  private renderToolTip = () => {
    if (typeof this.props.children === 'string') {
      return <ToolTipCopyButton contentToCopy={this.props.children} />;
    } else {
      return <ToolTip>{this.props.children}</ToolTip>;
    }
  };

  public render() {
    if (this.isToolTip()) {
      return (
        <ToolTipInline toolTipContent={this.renderToolTip()}>{this.renderText(true)}</ToolTipInline>
      );
    } else {
      return this.renderText();
    }
  }
}

export { TextTruncate };
