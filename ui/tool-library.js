const query = document.querySelector('#find-tool');
const categories = document.querySelector('.kit-jumps');
const status = document.querySelector('#tool-search-status');

function filterTools() {
  const words = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const section of document.querySelectorAll('.kit-group')) {
    let matches = 0;
    for (const card of section.querySelectorAll('.kit-card')) {
      const text = card.textContent.toLowerCase();
      card.hidden = !words.every(word => text.includes(word));
      if (!card.hidden) matches++;
    }
    section.hidden = matches === 0;
    categories.querySelector('a[href="#' + section.id + '"]').hidden = section.hidden;
    count += matches;
  }
  categories.hidden = count === 0;
  if (!words.length) status.textContent = '';
  else if (!count) status.textContent = 'No tools match. Try a service, task or industry.';
  else status.textContent = count === 1 ? '1 tool matches your search.' : count + ' tools match your search.';
}

query.addEventListener('input', filterTools);
window.addEventListener('pageshow', filterTools);
