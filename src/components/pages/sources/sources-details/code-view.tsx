import React, { useMemo } from 'react';

import { ViewGroup } from 'components/widgets/view-group';
import { IContractSources } from 'models/models-contract-code';
import { IBytecodes } from 'models/models-details-contracts';

import { CodeDetails } from '../code';
import AbiViewer, { InteractionMode } from '../interact';

interface Props {
  contractAddress: string;
  contractSources?: IContractSources;
  bytecodes: IBytecodes;
}

export function SourceCodeView({ bytecodes, contractAddress, contractSources }: Props) {
  return useMemo(() => {
    if (contractSources === null) {
      return <CodeDetails bytecodes={bytecodes} />;
    }

    const views = {
      code: {
        label: 'Code',
        component: <CodeDetails contractSources={contractSources} bytecodes={bytecodes} />,
      },
      read: {
        label: 'Read',
        component: (
          <AbiViewer
            mode={InteractionMode.READ}
            contractAddress={contractAddress}
            abi={contractSources.metadata.output.abi}
          />
        ),
      },
    };

    if (process.env.ENABLE_WRITE_CONTRACTS !== 'disabled') {
      views['write'] = {
        label: 'Write',
        component: (
          <AbiViewer
            mode={InteractionMode.WRITE}
            contractAddress={contractAddress}
            abi={contractSources.metadata.output.abi}
          />
        ),
      };
    }

    return <ViewGroup views={views} activeView="code" />;
  }, [bytecodes, contractAddress, contractSources]);
}
