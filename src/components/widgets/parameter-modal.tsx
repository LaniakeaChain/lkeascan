import React from 'react';

import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { GREY, TOOL_TIP_BORDER } from 'data/data-style';
import { parametersToInfo } from 'data/table-lookup/data-resolve-parameters';
import { IFunctionMetaParameter } from 'models/models-table-function';

interface Props {
  parameters: IFunctionMetaParameter[];
}

export function FunctionMetaParameterModal(props: Props) {
  return (
    <>
      <style jsx>{`
        div.FunctionMetaParameterModal {
          position: relative;
          background: #fff;
          border: 1px solid ${TOOL_TIP_BORDER};
          box-sizing: border-box;
          box-shadow: 0px 6px 11px rgba(20, 16, 69, 0.04);
          border-radius: 2px;
          padding: 11px 12px;
          width: 208px;
        }
        h4.title {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: ${GREY};
          padding-bottom: 12px;
          border-bottom: 1px solid ${TOOL_TIP_BORDER};
        }
      `}</style>
      <div className="FunctionMetaParameterModal">
        <h4 className="title">Parameters</h4>
        <ParametersPairList isFunctionMeta info={parametersToInfo(props.parameters, false, true)} />
      </div>
    </>
  );
}
