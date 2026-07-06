// Classic script (not a module) — see iphone-frame.js for why.
// window.BADGES_DATA: static list of every dog badge, shared by dog-profile and badge-detail pages.
// `dogField` is the boolean field on a dog object (see modules/storage/storage.js) that decides whether the badge is earned.

window.BADGES_DATA = [
  {
    id: "gdc_bronze",
    icon: "gdcBronze",
    dogField: "gdcBronze",
    nameKey: "dog_profile.badge_gdc_bronze",
    descriptionKey: "badge_detail.description_gdc_bronze",
    requirementKey: "badge_detail.requirement_gdc_bronze"
  },
  {
    id: "gdc_silver",
    icon: "gdcSilver",
    dogField: "gdcSilver",
    nameKey: "dog_profile.badge_gdc_silver",
    descriptionKey: "badge_detail.description_gdc_silver",
    requirementKey: "badge_detail.requirement_gdc_silver"
  },
  {
    id: "gdc_gold",
    icon: "gdcGold",
    dogField: "gdcGold",
    nameKey: "dog_profile.badge_gdc_gold",
    descriptionKey: "badge_detail.description_gdc_gold",
    requirementKey: "badge_detail.requirement_gdc_gold"
  },
  {
    id: "festival_visitor",
    icon: "festivalVisitor",
    dogField: "festivalVisitor",
    nameKey: "dog_profile.badge_festival_visitor",
    descriptionKey: "badge_detail.description_festival_visitor",
    requirementKey: "badge_detail.requirement_festival_visitor"
  },
  {
    id: "health_checked",
    icon: "healthChecked",
    dogField: "healthChecked",
    nameKey: "dog_profile.badge_health_checked",
    descriptionKey: "badge_detail.description_health_checked",
    requirementKey: "badge_detail.requirement_health_checked"
  }
];
