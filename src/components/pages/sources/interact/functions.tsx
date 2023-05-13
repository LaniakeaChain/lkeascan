import { Provider, Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import Select, { components } from 'react-select';

import { Alert } from 'components/placeholders/alert';
import { LIGHT_GREY, LIGHT_PURPLE_TEXT, MAIN_TABLE_PADDING } from 'data/data-style';
import {
  RawAbi,
  RawAbiDefinition,
  StateMutability,
  functionFullSignature,
  functionSignature,
  isArrayParam,
} from 'utils/abi';
import { groupBy } from 'utils/array';
import { useIsDesktop } from 'utils/dimensions';

import { Inputs } from './inputs';
import { Outputs } from './outputs';

const CONFIRMATIONS = 1;

const READ_MUT = ['view', 'pure'];

function StateMutabilityTag({ value }: { value: StateMutability }) {
  return (
    <>
      <style jsx>{`
        .Tag {
          background: #9bf6ff;
          color: #50676d;
          font-family: sans-serif;
          font-size: 10px;
          display: inline-block;
          padding: 4px 6px;
          border-radius: 3px;
          text-align: center;
          text-transform: uppercase;
          margin-left: auto;
        }
        .Tag.view {
          background: #caffbf;
        }
        .Tag.payable {
          background: #ffc6ff;
        }
      `}</style>
      <span className={`Tag ${value}`}>{value}</span>{' '}
    </>
  );
}

function FunctionDisplay({
  contract,
  desc,
  provider,
}: {
  provider: Provider | Web3Provider;
  contract: any;
  desc: RawAbiDefinition;
}) {
  const isDesktop = useIsDesktop();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [output, setOutput] = useState(null);
  const [receipt, setReceipt] = useState(null);

  async function onSubmit(event: any) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      await invoke(event, desc);
    }
  }

  async function invoke(event: any, desc: RawAbiDefinition) {
    if (provider === null) {
      return null;
    }

    const { inputs, stateMutability } = desc;

    setLoading(true);
    setErrorMessage(null);

    try {
      const signature = functionSignature(desc);
      const data = new FormData(event.target);
      const args = [];

      inputs.forEach(({ name, type }) => {
        if (isArrayParam(type)) {
          args.push(data.getAll(name));
        } else {
          args.push(data.get(name));
        }
      });

      if (READ_MUT.includes(stateMutability)) {
        const res = await contract[signature](...args);
        setOutput(res);
      } else {
        const contractWithSigner = contract.connect((provider as Web3Provider).getSigner());

        if (desc.stateMutability === 'payable') {
          const wei = data.get('value').toString() || '0';

          args.push({
            value: wei,
          });
        }

        const tx = await contractWithSigner[signature](...args);
        const txReceipt = await tx.wait(CONFIRMATIONS);
        setReceipt(txReceipt);
        setOutput(tx.value);
      }
    } catch (error) {
      setErrorMessage(error);
    }

    setLoading(false);
  }

  return (
    <>
      <style jsx>{`
        .line {
          position: absolute;
          left: -${MAIN_TABLE_PADDING}px;
          top: 0;
          width: calc(100% + ${MAIN_TABLE_PADDING * 2}px);
          height: 1px;
          background-color: ${LIGHT_GREY};
        }
        div.Function .Submit {
          margin-top: ${isDesktop ? 12 : 18}px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          box-shadow: none;
          text-align: center;
          height: auto;
          min-height: 48px;
          padding: 0 16px;
        }
      `}</style>
      <div className={`Function ${desc.stateMutability}`}>
        <div className="Body">
          <form onSubmit={onSubmit}>
            <Inputs desc={desc} />
            <Outputs values={output} receipt={receipt} desc={desc} />
            {errorMessage && (
              <Alert style={{ marginTop: '1rem' }}>
                <strong>{errorMessage.code}</strong> {errorMessage.reason || errorMessage.message}
                {errorMessage.data && <p>{errorMessage.data.message}</p>}
              </Alert>
            )}
            <button type="submit" className="Submit --blue-square" disabled={isLoading}>
              {READ_MUT.includes(desc.stateMutability) ? 'Read' : 'Write'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const ReadFunctions = (def: RawAbiDefinition) =>
  def.type === 'function' && READ_MUT.includes(def.stateMutability);
export const WriteFunctions = (def: RawAbiDefinition) =>
  def.type === 'function' && !READ_MUT.includes(def.stateMutability);

export function Functions({
  abi,
  contractAddress,
  functionFilter,
  provider,
}: {
  abi: RawAbi;
  contractAddress: string;
  provider: Provider;
  functionFilter: (RawAbiDefinition) => boolean;
}) {
  const [selectedFunction, setSelectedFunction] = useState(null);

  if (provider === null) {
    return null;
  }

  const functions = abi.filter(functionFilter) as Array<RawAbiDefinition>;
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const groups = groupBy(
    functions.map((f, i) => {
      if (f.inputs.length > 0) {
        f.inputs = f.inputs.map((input, n) => {
          if (input.name === '') {
            input.name = `_anon__${i}${n}`;
            input.anonymous = true;
          }

          return input;
        });
      }

      return f;
    }),
    'stateMutability',
  );

  const options = Object.keys(groups).map((label) => ({
    label,
    options: groups[label].map((f, i) => ({
      label: functionFullSignature(f),
      desc: f,
      value: (
        <FunctionDisplay provider={provider} contract={contract} desc={f} key={`${f.name}-${i}`} />
      ),
    })),
  }));

  const handleChange = (option) => {
    setSelectedFunction(option.value);
  };

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <StateMutabilityTag value={props.data.desc.stateMutability} /> {props.data.label}
    </components.SingleValue>
  );

  const styles = {
    control: (styles) => ({
      ...styles,
      borderWidth: '1px',
      boxShadow: 'none',
      borderColor: LIGHT_GREY,
      '&:hover,&:active,&:focus': {
        borderColor: LIGHT_GREY,
      },
    }),
  };

  return (
    <div style={{ marginTop: '1rem', minHeight: '10rem' }}>
      <Select
        options={options}
        placeholder="Select a function..."
        onChange={handleChange}
        components={{ SingleValue }}
        styles={styles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: LIGHT_PURPLE_TEXT,
          },
        })}
      />
      {selectedFunction}
    </div>
  );
}
