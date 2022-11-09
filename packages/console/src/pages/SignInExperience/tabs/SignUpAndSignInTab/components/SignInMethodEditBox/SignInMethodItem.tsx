import { SignInIdentifier } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { snakeCase } from 'snake-case';

import Draggable from '@/assets/images/draggable.svg';
import Minus from '@/assets/images/minus.svg';
import SwitchArrowIcon from '@/assets/images/switch-arrow.svg';
import Checkbox from '@/components/Checkbox';
import IconButton from '@/components/IconButton';

import * as styles from './index.module.scss';
import type { SignInMethod } from './types';

type Props = {
  signInMethod: SignInMethod;
  isPasswordCheckable: boolean;
  isVerificationCodeCheckable: boolean;
  isDeletable: boolean;
  onVerificationStateChange: (
    identifier: SignInIdentifier,
    verification: 'password' | 'verificationCode',
    checked: boolean
  ) => void;
  onToggleVerificationPrimary: (identifier: SignInIdentifier) => void;
  onDelete: (identifier: SignInIdentifier) => void;
};

const SignInMethodItem = ({
  signInMethod: { identifier, password, verificationCode, isPasswordPrimary },
  isPasswordCheckable,
  isVerificationCodeCheckable,
  isDeletable,
  onVerificationStateChange,
  onToggleVerificationPrimary,
  onDelete,
}: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  return (
    <div key={snakeCase(identifier)} className={styles.signInMethodItem}>
      <div className={styles.signInMethod}>
        <div className={styles.identifier}>
          <Draggable className={styles.draggableIcon} />
          {t('sign_in_exp.sign_up_and_sign_in.identifiers', {
            context: snakeCase(identifier),
          })}
        </div>
        <div
          className={classNames(
            styles.authentication,
            !isPasswordPrimary && styles.verifyCodePrimary
          )}
        >
          <Checkbox
            className={styles.checkBox}
            label={t('sign_in_exp.sign_up_and_sign_in.sign_in.password_auth')}
            value={password}
            disabled={!isPasswordCheckable}
            disabledTooltip={t('sign_in_exp.sign_up_and_sign_in.tip.password_auth')}
            onChange={(checked) => {
              onVerificationStateChange(identifier, 'password', checked);
            }}
          />
          {identifier !== SignInIdentifier.Username && (
            <>
              <IconButton
                className={styles.swapButton}
                tooltip={t('sign_in_exp.sign_up_and_sign_in.sign_in.auth_swap_tip')}
                onClick={() => {
                  onToggleVerificationPrimary(identifier);
                }}
              >
                <SwitchArrowIcon />
              </IconButton>
              <Checkbox
                className={styles.checkBox}
                label={t('sign_in_exp.sign_up_and_sign_in.sign_in.verification_code_auth')}
                value={verificationCode}
                disabled={!isVerificationCodeCheckable}
                disabledTooltip={t('sign_in_exp.sign_up_and_sign_in.tip.verification_code_auth')}
                onChange={(checked) => {
                  onVerificationStateChange(identifier, 'verificationCode', checked);
                }}
              />
            </>
          )}
        </div>
      </div>
      <IconButton
        disabled={!isDeletable}
        tooltip={conditional(
          !isDeletable &&
            t('sign_in_exp.sign_up_and_sign_in.tip.delete_sign_in_method', {
              identifier: t('sign_in_exp.sign_up_and_sign_in.identifiers', {
                context: snakeCase(identifier),
              }).toLocaleLowerCase(),
            })
        )}
        onClick={() => {
          onDelete(identifier);
        }}
      >
        <Minus />
      </IconButton>
    </div>
  );
};

export default SignInMethodItem;
