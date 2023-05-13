import React from 'react';

import { SourceCodeHighlight } from 'components/code';
import { Segment } from 'components/segments';
import { CHECKMARK } from 'components/svg/checkmark';
import { DefinitionList } from 'components/text';
import { IContractSources } from 'models/models-contract-code';
import { IBytecodes } from 'models/models-details-contracts';

import { BytecodeView } from './bytecode-view';
import { BytecodeMetaView } from './metadata';

interface Props {
  contractSources?: IContractSources;
  bytecodes: IBytecodes;
}

function ContractSourcesDetails({ contractSources }: { contractSources: IContractSources }) {
  const { compiler, output, settings } = contractSources.metadata;
  const { compilationTarget } = settings;
  const name = compilationTarget[Object.keys(compilationTarget)[0]];

  return (
    <>
      <h4>
        {CHECKMARK.CheckmarkCircle}
        <strong>Contract Source Code Verified</strong>
      </h4>
      <DefinitionList>
        <dt>Contract Name</dt>
        <dd>{name}</dd>
        <dt>Compiler Version</dt>
        <dd>{compiler.version}</dd>
        <dt>Optimization</dt>
        <dd>
          {settings.optimizer.enabled ? 'yes' : 'no'} with {settings.optimizer.runs} runs
        </dd>
        <dt>EVM Version</dt>
        <dd>{settings.evmVersion}</dd>
      </DefinitionList>
      <Segment title="Solidity Source Code" isOpen={true}>
        {contractSources.sources.map((sourceCode) => (
          <SourceCodeHighlight
            key={sourceCode.name}
            label={sourceCode.label}
            sourceCode={sourceCode.text}
            language="solidity"
            lineNumbers={true}
          />
        ))}
      </Segment>

      <Segment title="ABI">
        <SourceCodeHighlight sourceCode={JSON.stringify(output.abi)} language="json" />
      </Segment>
    </>
  );
}

export function CodeDetails({ bytecodes, contractSources }: Props) {
  return (
    <section>
      {contractSources && <ContractSourcesDetails contractSources={contractSources} />}
      <Segment title="Deployed Bytecode">
        <BytecodeView code={bytecodes.deployedCode} />
      </Segment>
      <Segment title="Metadata (CBOR)">
        <BytecodeMetaView code={bytecodes.deployedCode} />
      </Segment>
      {/* TODO: until we are able to link to TX->Internal Trace input data
        <Segment title="Creation Data">
          <BytecodeView code={bytecodes.creationData} />
        </Segment>
      */}
    </section>
  );
}
