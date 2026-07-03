// Classic script (not a module) — attaches window.markdownModule
// Minimal markdown -> HTML renderer for event descriptions (headings, bold, italic, lists, paragraphs).
window.markdownModule = (function () {
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderInline(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function renderMarkdown(markdown) {
    const lines = (markdown || '').split('\n');
    const htmlParts = [];
    let listItems = [];

    function flushList() {
      if (listItems.length > 0) {
        htmlParts.push(`<ul class="markdown__list">${listItems.join('')}</ul>`);
        listItems = [];
      }
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (line === '') {
        flushList();
        return;
      }

      const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
      if (headingMatch) {
        flushList();
        const level = headingMatch[1].length;
        htmlParts.push(`<h${level + 2} class="markdown__heading">${renderInline(headingMatch[2])}</h${level + 2}>`);
        return;
      }

      const listMatch = line.match(/^[-*]\s+(.*)$/);
      if (listMatch) {
        listItems.push(`<li>${renderInline(listMatch[1])}</li>`);
        return;
      }

      flushList();
      htmlParts.push(`<p class="markdown__paragraph">${renderInline(line)}</p>`);
    });

    flushList();
    return htmlParts.join('');
  }

  return { renderMarkdown };
})();
