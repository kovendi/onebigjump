// Classic script (not a module) — see iphone-frame.js for why.
// window.USER_BADGES_DATA: static list of every owner (user-level) badge, shared by profile and badge-detail pages.
// `isEarned({ user, dogs, tickets })` decides whether the badge is earned for that user.

window.USER_BADGES_DATA = [
  {
    id: "user_founder",
    icon: "founder",
    nameKey: "profile.badge_user_founder",
    descriptionKey: "badge_detail.description_user_founder",
    requirementKey: "badge_detail.requirement_user_founder",
    isEarned: function () { return true; }
  },
  {
    id: "responsible_owner",
    icon: "responsibleOwner",
    nameKey: "profile.badge_responsible_owner",
    descriptionKey: "badge_detail.description_responsible_owner",
    requirementKey: "badge_detail.requirement_responsible_owner",
    isEarned: function ({ dogs }) {
      return dogs.some(function (dog) {
        return !!(dog.breed && dog.birthdate && dog.microchip && dog.photo);
      });
    }
  },
  {
    id: "event_enthusiast",
    icon: "eventEnthusiast",
    nameKey: "profile.badge_event_enthusiast",
    descriptionKey: "badge_detail.description_event_enthusiast",
    requirementKey: "badge_detail.requirement_event_enthusiast",
    isEarned: function ({ tickets }) {
      return tickets.length >= 3;
    }
  },
  {
    id: "proud_trainer",
    icon: "proudTrainer",
    nameKey: "profile.badge_proud_trainer",
    descriptionKey: "badge_detail.description_proud_trainer",
    requirementKey: "badge_detail.requirement_proud_trainer",
    isEarned: function ({ dogs }) {
      return dogs.some(function (dog) {
        return !!(dog.gdcBronze || dog.gdcSilver || dog.gdcGold);
      });
    }
  }
];
