import { ethers } from 'ethers';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GREY, LIGHT_GREY, LIGHT_PURPLE_TEXT, TEXT_GREY } from 'data/data-style';
import { RawAbiDefinition, RawAbiParameter, isArrayParam } from 'utils/abi';

const ENS = false;

function validateBigNumberish(value: string): boolean {
  try {
    ethers.BigNumber.from(value);
  } catch (error) {
    return false;
  }

  return true;
}

function validateAddress(value: string): boolean {
  return ENS || ethers.utils.isAddress(value);
}

function validateBool(value: string): boolean {
  return /^(true|false)$/.test(value);
}

interface Validator {
  regexp: RegExp;
  isValid(value: string): boolean;
}

const validators: Array<Validator> = [
  {
    regexp: /^address$/,
    isValid: validateAddress,
  },
  {
    regexp: /^u?int\d*$/,
    isValid: validateBigNumberish,
  },
  {
    regexp: /^bool$/,
    isValid: validateBool,
  },
];

function InputFiled({ anonymous = false, handleChange, id, name, type }) {
  return (
    <>
      <style jsx>{`
        .Param {
          position: relative;
        }
        input[type='text'] {
          width: 100%;
          padding: 24px 16px 12px 16px;
          margin: 8px 0;
          border: 1px solid ${LIGHT_GREY};
          color: ${GREY};
          box-sizing: border-box;
          height: calc(4.5rem + 2px);
          line-height: 1.25;
          font-size: 16px;
        }
        label {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          padding: 1rem 0.75rem;
          pointer-events: none;
          border: 1px solid transparent;
          transform-origin: 0 0;
          color: ${TEXT_GREY};
          transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
          font-size: 14px;
          text-transform: capitalize;
        }
      `}</style>
      <div key={id} className="Param">
        <input id={id} type="text" name={name} placeholder={type} onChange={handleChange}></input>
        <label htmlFor={id}>{anonymous ? '_' : name}</label>
      </div>
    </>
  );
}

function ParamInput({ id, param }) {
  const { type } = param;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const validator = validators.find((v) => type.match(v.regexp));

    if (validator !== undefined && !validator.isValid(event.target.value)) {
      event.target.setCustomValidity(`Not a valid input for ${type}`);
    } else {
      event.target.setCustomValidity('');
    }
  }

  return (
    <InputFiled
      id={id}
      name={param.name}
      type={param.type}
      anonymous={param.anonymous}
      handleChange={handleChange}
    />
  );
}

function ParamSet({ param }: { param: RawAbiParameter }) {
  const [inputIds, setInputIds] = useState<string[]>([uuidv4()]);

  function addInput() {
    setInputIds([...inputIds, uuidv4()]);
  }

  function removeInput() {
    setInputIds(inputIds.slice(0, inputIds.length - 1));
  }

  return (
    <>
      <style jsx>{`
        .ParamField {
          position: relative;
        }
        .Buttons {
          position: absolute;
          bottom: 12px;
          right: 5px;
          display: flex;
          flex-direction: row-reverse;
        }
        .Buttons button {
          font-size: 12px;
          line-height: 14px;
          cursor: pointer;
          box-shadow: none;
          text-align: center;
          margin-left: 0.5rem;
          color: ${LIGHT_PURPLE_TEXT};
          text-decoration: underline;
        }
      `}</style>
      <div className="ParamField">
        {inputIds.map((id) => (
          <ParamInput key={id} id={id} param={param} />
        ))}
        {isArrayParam(param.type) && (
          <div className="Buttons">
            {inputIds.length > 1 && (
              <button type="button" onClick={removeInput}>
                Remove
              </button>
            )}
            <button type="button" onClick={addInput}>
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function Inputs({ desc }: { desc: RawAbiDefinition }) {
  const { inputs } = desc;

  return (
    <>
      {inputs.length > 0 && inputs.map((p, i) => <ParamSet key={`${p.name}-${i}`} param={p} />)}
      {desc.stateMutability === 'payable' && (
        <>
          <InputFiled
            id="value"
            name="value"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!validateBigNumberish(event.target.value)) {
                event.target.setCustomValidity(`Not a valid input for Wei amount`);
              } else {
                event.target.setCustomValidity('');
              }
            }}
            type="Wei amount"
          />
        </>
      )}
    </>
  );
}
