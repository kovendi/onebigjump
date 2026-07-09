// Classic script (not a module) — page-specific split-out of profile.html's account section.
// window.profileAccountSection.render({ t, storage, buttonModule, modalModule }) -> HTMLElement

window.profileAccountSection = (function () {
  function render({ t, storage, buttonModule, modalModule }) {
    const section = document.createDocumentFragment();

    section.appendChild(window.sectionTitleModule.renderSectionTitle({ text: t('profile.account_title') }));

    const openConfirmModal = ({ title, message, actionLabel, onConfirm }) => {
      const wrap = document.createElement('div');
      wrap.className = 'profile-confirm';

      const titleEl = document.createElement('h3');
      titleEl.className = 'profile-confirm-title';
      titleEl.textContent = title;
      wrap.appendChild(titleEl);

      const messageEl = document.createElement('p');
      messageEl.className = 'profile-confirm-message';
      messageEl.textContent = message;
      wrap.appendChild(messageEl);

      const actions = document.createElement('div');
      actions.className = 'profile-confirm-actions';

      actions.appendChild(buttonModule.renderButton({
        label: t('common.cancel'),
        variant: 'secondary',
        onClick: () => modalModule.closeModal()
      }));

      actions.appendChild(buttonModule.renderButton({
        label: actionLabel,
        variant: 'primary',
        onClick: () => {
          modalModule.closeModal();
          onConfirm();
        }
      }));

      wrap.appendChild(actions);
      modalModule.openModal(wrap);
    };

    const renderAccountRow = (label, extraClass, onClick, icon) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = `profile-account-row ${extraClass}`;
      row.addEventListener('click', onClick);

      const iconEl = document.createElement('img');
      iconEl.className = 'profile-account-row-icon';
      iconEl.src = icon;
      iconEl.alt = '';
      row.appendChild(iconEl);

      const labelEl = document.createElement('span');
      labelEl.textContent = label;
      row.appendChild(labelEl);

      return row;
    };

    const accountActions = document.createElement('div');
    accountActions.className = 'profile-account-actions';

    const languageRow = document.createElement('button');
    languageRow.type = 'button';
    languageRow.className = 'profile-account-row profile-account-row--default profile-account-row--language';

    const languageRowIcon = document.createElement('img');
    languageRowIcon.className = 'profile-account-row-icon';
    languageRowIcon.src = '../../assets/icon-language.svg';
    languageRowIcon.alt = '';
    languageRow.appendChild(languageRowIcon);

    const languageRowLabel = document.createElement('span');
    languageRowLabel.className = 'profile-account-row-label';
    languageRowLabel.textContent = t('profile.language_button');
    languageRow.appendChild(languageRowLabel);

    const languageRowValue = document.createElement('span');
    languageRowValue.className = 'profile-account-row-value';
    languageRowValue.textContent = t(`languages.${window.i18n.getLanguage()}`);
    languageRow.appendChild(languageRowValue);

    languageRow.addEventListener('click', () => {
      window.location.href = '../languages/languages.html';
    });

    accountActions.appendChild(languageRow);

    accountActions.appendChild(renderAccountRow(
      t('profile.change_password_button'),
      'profile-account-row--default',
      () => {
        window.location.href = '../change-password/change-password.html';
      },
      '../../assets/icon-password.svg'
    ));

    accountActions.appendChild(renderAccountRow(
      t('profile.logout_button'),
      'profile-account-row--default',
      () => {
        openConfirmModal({
          title: t('profile.logout_confirm_title'),
          message: t('profile.logout_confirm_message'),
          actionLabel: t('profile.logout_confirm_action'),
          onConfirm: () => {
            window.location.href = '../login/login.html';
          }
        });
      },
      '../../assets/icon-logout.svg'
    ));

    accountActions.appendChild(renderAccountRow(
      t('profile.delete_account_button'),
      'profile-account-row--danger',
      () => {
        openConfirmModal({
          title: t('profile.delete_account_confirm_title'),
          message: t('profile.delete_account_confirm_message'),
          actionLabel: t('profile.delete_account_confirm_action'),
          onConfirm: () => {
            storage.deleteCurrentUser();
            window.location.href = '../login/login.html';
          }
        });
      },
      '../../assets/icon-delete-account.svg'
    ));

    section.appendChild(accountActions);
    return section;
  }

  return { render };
})();
