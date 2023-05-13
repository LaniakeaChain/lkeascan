import React, { useEffect, useState } from 'react';

import { WHITE } from 'data/data-style';
import { IUserProfile } from 'models/models-auth';

import { AccountInfoControl } from './account-info-control';
import { AccountInfoMenu } from './account-info-menu';

export interface IAccountInfoMenuControlProps {
  userProfile?: IUserProfile;
}

export function AccountInfoMenuControl(props: IAccountInfoMenuControlProps) {
  const { userProfile } = props;
  const [isOpen, setOpen] = useState(null);

  const handleWindowClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleWindowClick);
    } else {
      window.removeEventListener('click', handleWindowClick);
    }

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isOpen]);

  const handleChange = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <style jsx>{`
        div.AccountInfoMenuControl {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: ${WHITE};
        }
        div.dropdown {
          position: relative;
          top: 0;
          left: 0;
          z-index: 3;
        }
      `}</style>
      <div className="AccountInfoMenuControl">
        <div className="dropdown">
          <AccountInfoControl
            isOpen={isOpen}
            name={userProfile && userProfile.given_name}
            onClick={handleChange}
          />
          {isOpen && <AccountInfoMenu userProfile={userProfile} />}
        </div>
      </div>
    </>
  );
}
