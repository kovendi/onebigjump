// Classic script (not a module) — logic-only, same exception as i18n.js/storage.js/date.js (no paired CSS).
// window.eventsStore.getAllEvents() -> Event[] (dates shifted relative to today, memoized)
// window.eventsStore.getEventById(id) -> Event | undefined
// window.eventsStore.getUpcomingEvents() -> Event[] sorted ascending by start_date, with evt-001 then evt-002 pinned first
// window.eventsStore.getPastEvents() -> Event[] sorted descending by end_date
// Requires modules/date/date.js and pages/events/events-data.js (window.EVENTS_DATA, raw mock data) to be loaded first.
// All pages must read events through this store, never window.EVENTS_DATA directly, so the upcoming/past
// split and sort order stay consistent everywhere.

window.eventsStore = (function () {
  // Each event's start_date is retargeted to "today + N days" (keeping its original time-of-day and
  // duration), so the mock dataset always contains both upcoming and past events regardless of the
  // real-world date the mockup is opened on — the raw dates in events-data.js only define relative
  // ordering/spacing between events, not their absolute date.
  const TARGET_OFFSET_DAYS = {
    'evt-001': 3,
    'evt-002': 7,
    'evt-003': 14,
    'evt-004': -10,
    'evt-005': -10,
    'evt-006': -4,
    'evt-007': -4
  };
  const PINNED_UPCOMING_ORDER = ['evt-001', 'evt-002'];

  let cachedEvents = null;

  function dateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function shiftDateString(dateStr, dayDelta) {
    const parsed = window.dateModule.parseToDate(dateStr);
    if (!parsed) return dateStr;
    parsed.setDate(parsed.getDate() + dayDelta);
    const pad = (n) => String(n).padStart(2, '0');
    return `${parsed.getFullYear()}.${pad(parsed.getMonth() + 1)}.${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
  }

  function buildEvents() {
    const today = dateOnly(new Date());
    return (window.EVENTS_DATA || []).map((event) => {
      const originalStart = dateOnly(window.dateModule.parseToDate(event.start_date));
      const targetOffset = TARGET_OFFSET_DAYS[event.id] || 0;
      const targetStart = new Date(today);
      targetStart.setDate(targetStart.getDate() + targetOffset);
      const dayDelta = Math.round((targetStart - originalStart) / (24 * 60 * 60 * 1000));
      return {
        ...event,
        start_date: shiftDateString(event.start_date, dayDelta),
        end_date: shiftDateString(event.end_date, dayDelta),
        sub_events: (event.sub_events || []).map((sub) => ({
          ...sub,
          start_date: shiftDateString(sub.start_date, dayDelta),
          end_date: shiftDateString(sub.end_date, dayDelta)
        }))
      };
    });
  }

  function getAllEvents() {
    if (!cachedEvents) cachedEvents = buildEvents();
    return cachedEvents;
  }

  function getEventById(id) {
    return getAllEvents().find((event) => event.id === id);
  }

  function getUpcomingEvents() {
    const now = new Date();
    const upcoming = getAllEvents()
      .filter((event) => {
        const end = window.dateModule.parseToDate(event.end_date);
        return end && end >= now;
      })
      .sort((a, b) => window.dateModule.parseToDate(a.start_date) - window.dateModule.parseToDate(b.start_date));

    const pinned = PINNED_UPCOMING_ORDER
      .map((id) => upcoming.find((event) => event.id === id))
      .filter(Boolean);
    const rest = upcoming.filter((event) => !PINNED_UPCOMING_ORDER.includes(event.id));
    return [...pinned, ...rest];
  }

  function getPastEvents() {
    const now = new Date();
    return getAllEvents()
      .filter((event) => {
        const end = window.dateModule.parseToDate(event.end_date);
        return end && end < now;
      })
      .sort((a, b) => window.dateModule.parseToDate(b.end_date) - window.dateModule.parseToDate(a.end_date));
  }

  return { getAllEvents, getEventById, getUpcomingEvents, getPastEvents };
})();
