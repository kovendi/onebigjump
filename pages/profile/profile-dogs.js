// Classic script (not a module) — page-specific split-out of profile.html's dogs section.
// window.profileDogsSection.render({ t, storage, eventsStore, isOwnProfile, user }) -> HTMLElement

window.profileDogsSection = (function () {
  function render({ t, storage, eventsStore, isOwnProfile, user }) {
    const section = document.createDocumentFragment();

    section.appendChild(window.sectionTitleModule.renderSectionTitle({ text: t('profile.dogs_title') }));

    const dogsList = document.createElement('div');
    dogsList.className = 'profile-dogs';

    const dogs = isOwnProfile ? storage.getDogs() : storage.getDogsByUserId(user.id);

    const nextExamEvent = eventsStore.getUpcomingEvents()
      .filter((event) => event.is_exam)[0];

    if (dogs.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'profile-dogs-empty';
      empty.textContent = t('profile.dogs_empty');
      dogsList.appendChild(empty);
    } else {
      dogs.forEach((dog) => {
        const dogWrap = document.createElement('div');
        dogWrap.className = dog.goodDogCard ? 'profile-dog-item profile-dog-item--earned' : 'profile-dog-item';

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'profile-dog-main';
        item.addEventListener('click', () => {
          window.location.href = `../dog-profile/dog-profile.html?id=${dog.id}`;
        });

        const photoWrap = document.createElement('span');
        photoWrap.className = dog.goodDogCard
          ? 'profile-dog-photo-wrap profile-dog-photo-wrap--earned'
          : 'profile-dog-photo-wrap';

        const photo = document.createElement('img');
        photo.className = 'profile-dog-photo';
        photo.src = dog.photo || '../../assets/icon-dogs.svg';
        photo.alt = '';
        photoWrap.appendChild(photo);

        item.appendChild(photoWrap);

        const name = document.createElement('span');
        name.className = 'profile-dog-name';
        name.textContent = dog.name;
        item.appendChild(name);

        dogWrap.appendChild(item);

        if (dog.goodDogCard) {
          const banner = document.createElement('div');
          banner.className = 'profile-dog-gdc-banner profile-dog-gdc-banner--earned';

          const bannerIcon = document.createElement('img');
          bannerIcon.className = 'profile-dog-gdc-banner-icon';
          bannerIcon.src = '../../assets/icon-badge-good-dog.svg';
          bannerIcon.alt = '';
          banner.appendChild(bannerIcon);

          const bannerText = document.createElement('span');
          bannerText.className = 'profile-dog-gdc-banner-title';
          bannerText.textContent = t('profile.dog_gdc_earned_title');
          banner.appendChild(bannerText);

          dogWrap.appendChild(banner);
        } else if (nextExamEvent) {
          const hint = document.createElement('button');
          hint.type = 'button';
          hint.className = 'profile-dog-gdc-banner profile-dog-gdc-banner--hint';
          hint.addEventListener('click', () => {
            window.location.href = `../event-detail/event-detail.html?id=${nextExamEvent.id}`;
          });

          const hintIcon = document.createElement('img');
          hintIcon.className = 'profile-dog-gdc-banner-icon';
          hintIcon.src = '../../assets/icon-badge-good-dog.svg';
          hintIcon.alt = '';
          hint.appendChild(hintIcon);

          const hintTextCol = document.createElement('span');
          hintTextCol.className = 'profile-dog-gdc-banner-text-col';

          const hintTitle = document.createElement('span');
          hintTitle.className = 'profile-dog-gdc-banner-title';
          hintTitle.textContent = t('profile.dog_gdc_hint_title');
          hintTextCol.appendChild(hintTitle);

          const hintSubtitle = document.createElement('span');
          hintSubtitle.className = 'profile-dog-gdc-banner-subtitle';
          hintSubtitle.textContent = `${t('profile.dog_gdc_hint_label')} ${nextExamEvent.name}`;
          hintTextCol.appendChild(hintSubtitle);

          hint.appendChild(hintTextCol);

          const hintArrow = document.createElement('img');
          hintArrow.className = 'profile-dog-gdc-banner-arrow';
          hintArrow.src = '../../assets/icon-chevron-down.svg';
          hintArrow.alt = '';
          hint.appendChild(hintArrow);

          dogWrap.appendChild(hint);
        }

        dogsList.appendChild(dogWrap);
      });
    }

    section.appendChild(dogsList);
    return section;
  }

  return { render };
})();
