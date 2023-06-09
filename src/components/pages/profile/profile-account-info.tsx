import React from 'react';

import { ICON } from 'components/svg';
import { MOBILE_GREY_TEXT } from 'data/data-style';
import { IUserProfile } from 'models/models-auth';
import { defined } from 'utils/variable-evaluation';

interface Props {
  userProfile: IUserProfile;
}

export function ProfileAccountInfo(props: Props) {
  const { userProfile } = props;
  return (
    <>
      <style jsx>{`
        div.ProfileAccountInfo {
          display: flex;
          align-items: center;
          flex-direction: row;
          width: 100%;
          margin-top: 48px;
        }
        div.avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 16px;
        }
        div.details {
          width: calc(100% - 58px);
        }
        div.details div.name {
          font-size: 16px;
          line-height: 20px;
        }
        div.details div.email {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_GREY_TEXT};
          margin-top: 4px;
        }
      `}</style>
      <div className="ProfileAccountInfo">
        <div className="avatar">{ICON.AvatarLarge}</div>
        <div className="details">
          <div className="name">{defined(userProfile) ? userProfile.name : 'Guest'}</div>
          <div className="email">
            {defined(userProfile) ? userProfile.email : 'You are not logged in.'}
          </div>
        </div>
      </div>
    </>
  );
}
