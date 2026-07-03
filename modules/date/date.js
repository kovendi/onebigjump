// Classic script (not a module) — logic-only, same exception as i18n.js/storage.js (no paired CSS).
// window.dateModule.formatDate(dateStr) -> "YYYY. MM. DD." (Hungarian format), or "YYYY. MM. DD. HH:mm" if a time is present
// window.dateModule.formatDateRange(startStr, endStr) -> "YYYY. MM. DD. - YYYY. MM. DD."
// window.dateModule.parseToDate(dateStr) -> Date | null
// Accepts "YYYY/MM/DD", "YYYY.MM.DD" or ISO "YYYY-MM-DD" input, with an optional " HH:mm" suffix (also handles full ISO datetime strings, e.g. from `Date.prototype.toISOString()`).

window.dateModule = (function () {
  function parse(input) {
    const str = String(input || "").trim();
    const match = /^(\d{4})[./-](\d{2})[./-](\d{2})(?:[ T](\d{2}):(\d{2}))?/.exec(str);
    if (!match) return null;
    const [, year, month, day, hour, minute] = match;
    return { year, month, day, hour, minute };
  }

  function formatDate(input) {
    const parsed = parse(input);
    if (!parsed) return input;
    const { year, month, day, hour, minute } = parsed;
    let result = `${year}.${month}.${day}.`;
    if (hour !== undefined) result += ` ${hour}:${minute}`;
    return result;
  }

  function formatDateRange(startInput, endInput) {
    return `${formatDate(startInput)} - ${formatDate(endInput)}`;
  }

  function parseToDate(input) {
    const parsed = parse(input);
    if (!parsed) return null;
    const { year, month, day, hour = "0", minute = "0" } = parsed;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  }

  return { formatDate, formatDateRange, parseToDate };
})();
