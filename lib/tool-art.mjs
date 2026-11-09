// Each drawing fits the same optical frame so it can be used as a card or page illustration.
const ink = '#36332f';
const paper = '#fffaf0';
const mint = '#99d8bd';
const teal = '#59ae98';
const lilac = '#b6adf3';
const violet = '#8178c8';
const gold = '#f6ce70';
const coral = '#ef9e82';
const blue = '#94bfdf';

const drawings = {
  'workshop-break-even-calculator': `
    <g transform="rotate(-5 48 46)">
      <path d="m27 65-8 17h7l11-17m25-1 8 18h6l-6-19" fill="${gold}"/>
      <rect x="15" y="17" width="63" height="49" rx="5" fill="${violet}"/>
      <rect x="12" y="14" width="63" height="49" rx="5" fill="${lilac}"/>
      <rect x="17" y="19" width="53" height="38" rx="2" fill="${paper}" stroke-width="1.6"/>
      <path d="M22 44h43" stroke-dasharray="2 5" stroke="#a49c90" stroke-width="1.5"/>
      <path d="m23 51 11-8 7 3 17-16m-7 0h7v7" fill="none" stroke="#457c69" stroke-width="3.5"/>
      <circle cx="44" cy="43" r="3.1" fill="${mint}" stroke-width="1.6"/>
    </g>
    <g transform="rotate(9 66 69)">
      <path d="M54 59h25v5a3.5 3.5 0 0 0 0 7v5H54v-5a3.5 3.5 0 0 0 0-7z" fill="${gold}"/>
      <path d="M70 62v11" stroke-dasharray="1 3" stroke-width="1.4"/>
      <path d="M59 66h6m-6 4h4" fill="none" stroke-width="1.5"/>
    </g>`,

  'booking-qr-code-generator': `
    <path d="m51 18 15 4 17 50-10 2-16-41z" fill="${teal}"/>
    <path d="m14 69 48 7 11-51c.5-3-1-5-4-5L29 14c-3-.4-5 1-5 4z" fill="${mint}"/>
    <path d="m14 69 48 7-2 6-47-7z" fill="${teal}"/>
    <g transform="matrix(.96 .14 -.19 .98 30 23)">
      <rect width="36" height="35" rx="2.2" fill="${paper}" stroke-width="1.4"/>
      <g fill="${ink}" stroke="none">
        <path fill-rule="evenodd" d="M4 4h11v11H4zm2 2v7h7V6zM21 4h11v11H21zm2 2v7h7V6zM4 20h11v11H4zm2 2v7h7v-7z"/>
        <path d="M8 8h3v3H8zm17 0h3v3h-3zM8 24h3v3H8zm9-20h2v7h-2zm0 10h3v5h-6v-2h3zM4 16h5v2H4zm13 5h5v5h-2v5h-3zm7-5h6v3h-3v4h-3zm0 11h3v4h-3zm5-5h3v5h-3z"/>
      </g>
      <path d="M8 39h18" stroke-width="2.2"/>
    </g>`,

  'rental-inventory-planner': `
    <path d="m13 50 22-12 26 9-21 13z" fill="${paper}"/>
    <path d="m13 50 27 10v22L14 71z" fill="${blue}"/>
    <path d="m40 60 21-13v22L40 82z" fill="#72a8c9"/>
    <path d="m20 60 9 3" stroke-width="3.1"/>
    <path d="m41 53 21-13 21 7-19 14z" fill="#d3ead8"/>
    <path d="m41 53 23 8v21l-23-8z" fill="${mint}"/>
    <path d="m64 61 19-14v22L64 82z" fill="${teal}"/>
    <path d="m46 63 9 3" stroke-width="3.1"/>
    <path d="m24 26 22-12 26 9-22 13z" fill="#ffe4a2"/>
    <path d="m24 26 26 10v23L24 49z" fill="${gold}"/>
    <path d="m50 36 22-13v23L50 59z" fill="#dfaf62"/>
    <path d="m32 36 9 3" stroke-width="3.1"/>
    <path d="m31 45 6 2m19 2 10-6" stroke-width="1.4" opacity=".52"/>`,

  'appointment-reminder-generator': `
    <g transform="rotate(-8 44 60)">
      <rect x="12" y="41" width="57" height="38" rx="5" fill="${violet}"/>
      <rect x="11" y="38" width="57" height="38" rx="5" fill="${lilac}"/>
      <path d="m15 71 18-17m30 17L46 55m-32-13 22 17a5 5 0 0 0 6 0l22-17" fill="none"/>
    </g>
    <g transform="rotate(12 61 37)">
      <path d="M56 49c0 7 11 8 12 0" fill="${gold}"/>
      <circle cx="62" cy="18" r="4.3" fill="${gold}"/>
      <path d="M44 47c4-3 5-6 5-14 0-18 26-19 26 0 0 6 1 10 5 14l-1 3H45z" fill="${coral}"/>
      <path d="M54 33c0-4 2-7 5-9" fill="none" stroke="#fff3d9" stroke-width="3"/>
      <path d="M38 27c-2 3-2 7-2 10m42-18 4 4" fill="none" stroke-width="2"/>
    </g>`,

  'add-to-calendar-link-generator': `
    <g transform="rotate(-7 43 44)">
      <rect x="17" y="24" width="53" height="50" rx="6" fill="#77a9c9"/>
      <rect x="14" y="20" width="53" height="51" rx="6" fill="${paper}"/>
      <path d="M20 20h41a6 6 0 0 1 6 6v9H14v-9a6 6 0 0 1 6-6z" fill="${blue}"/>
      <path d="M25 15v10m30-10v10" stroke-width="3.4"/>
      <g fill="${blue}" stroke="none"><rect x="23" y="43" width="6" height="5" rx="1.3"/><rect x="35" y="43" width="6" height="5" rx="1.3"/><rect x="47" y="43" width="6" height="5" rx="1.3"/><rect x="23" y="54" width="6" height="5" rx="1.3"/><rect x="35" y="54" width="6" height="5" rx="1.3"/></g>
    </g>
    <g transform="rotate(-40 65 65)">
      <rect x="44" y="59" width="23" height="13" rx="6.5" fill="${gold}"/>
      <rect x="64" y="59" width="22" height="13" rx="6.5" fill="${gold}"/>
      <path d="M51 65.5h7m16 0h5" stroke-width="2.2"/>
      <path d="M59 65.5h13" stroke-width="3.2"/>
    </g>`,

  'booking-deposit-calculator': `
    <g transform="rotate(-7 43 56)">
      <path d="m18 40 41-16c4-1 6 1 6 4v19H17z" fill="${teal}"/>
      <path d="m28 39 24-15 7 12" fill="${paper}"/>
      <rect x="14" y="37" width="57" height="38" rx="6" fill="${mint}"/>
      <path d="M18 70h43" stroke="#528f7b" stroke-width="1.3" stroke-dasharray="2 4"/>
      <path d="M55 48h17v14H55c-9 0-9-14 0-14z" fill="${teal}"/>
      <circle cx="56" cy="55" r="2" fill="${paper}" stroke="none"/>
    </g>
    <g transform="rotate(12 66 28)">
      <ellipse cx="68" cy="29" rx="12" ry="15" fill="#d5a252"/>
      <ellipse cx="65" cy="28" rx="12" ry="15" fill="${gold}"/>
      <ellipse cx="65" cy="28" rx="8" ry="11" fill="none" stroke="#b68d47" stroke-width="1.2"/>
      <path d="m61 28 3 3 5-7" fill="none" stroke-width="2.3"/>
    </g>`,

  'salon-capacity-calculator': `
    <path d="M42 60h10v16H42z" fill="${blue}"/>
    <path d="m32 75 23-2 12 5-28 4-14-4z" fill="#b5c9d2"/>
    <path d="m26 30-5 5 9 22 11 3 9-5z" fill="#c97f6c"/>
    <path d="M24 26c-1-4 1-6 4-6l10-2c3 0 5 2 6 5l7 23-18 4z" fill="${coral}"/>
    <path d="m32 26 5 15" stroke="#ffe5ce" stroke-width="3"/>
    <path d="m32 49 23-5 17 8-19 9-21-6z" fill="#f4b59a"/>
    <path d="m32 55 21 6 19-9-2 7-18 8-17-5z" fill="${coral}"/>
    <path d="M38 53V42m1 0 15-3m-13 15V44" fill="none" stroke-width="2.5"/>
    <path d="m37 39 16-3 2 4-16 4z" fill="${ink}"/>
    <path d="m65 62 6 7 9-3m-10 6 12-4" fill="none" stroke-width="2.4"/>
    <path d="M59 21v7m-3.5-3.5h7m5-8v4m-2-2h4" stroke="${violet}" fill="none" stroke-width="2.3"/>`,

  'equipment-rental-quote-generator': `
    <g transform="rotate(5 44 46)">
      <path d="M18 16h49v62l-5-2-5 3-5-3-5 3-5-3-5 3-5-3-5 3-5-3-4 2z" fill="${gold}"/>
      <path d="M15 13h49v62l-5-2-5 3-5-3-5 3-5-3-5 3-5-3-5 3-5-3-4 2z" fill="${paper}"/>
      <rect x="22" y="22" width="13" height="9" rx="2" fill="${gold}"/>
      <path d="M42 24h13m-13 5h8M23 40h29m-29 7h20m-20 7h11m-11 10h14" fill="none" stroke-width="1.8"/>
    </g>
    <g transform="rotate(35 66 57)">
      <path d="M63 49c-8-4-8-13-2-18l2 9 6 2 5-6c4 8 0 15-6 16l1 22a5 5 0 0 1-10 0z" fill="${blue}"/>
      <circle cx="64" cy="74" r="1.9" fill="${paper}" stroke-width="1.2"/>
    </g>`,

  'booking-intake-form-builder': `
    <g transform="rotate(-7 43 48)">
      <rect x="17" y="18" width="50" height="63" rx="5" fill="${teal}"/>
      <rect x="21" y="22" width="42" height="54" rx="2.3" fill="${paper}" stroke-width="1.7"/>
      <path d="M33 17h4a5 5 0 0 1 10 0h4v8H33z" fill="${mint}"/>
      <circle cx="42" cy="17" r="1.3" fill="${ink}" stroke="none"/>
      <g fill="none" stroke-width="1.8">
        <path d="m26 38 2 2 4-5m-6 17 2 2 4-5"/>
        <rect x="26" y="61" width="6" height="6" rx="1.5"/>
        <path d="M38 38h16M38 52h13M38 64h9" stroke="#928977"/>
      </g>
    </g>
    <g transform="rotate(28 70 54)">
      <path d="M65 34h9v36l-4.5 10-4.5-10z" fill="${gold}"/>
      <path d="M65 34v-4a4.5 4.5 0 0 1 9 0v4z" fill="${coral}"/>
      <path d="M65 69h9l-4.5 11z" fill="#edbd94"/>
      <path d="m67.6 76 1.9 4 1.8-4" fill="${ink}" stroke-width="1"/>
      <path d="M70 39v24" fill="none" stroke="#fff1c9" stroke-width="1.8"/>
    </g>`,

  'recurring-class-schedule-generator': `
    <g transform="rotate(5 48 49)">
      <rect x="22" y="31" width="54" height="41" rx="4.5" fill="${violet}"/>
      <rect x="19" y="27" width="54" height="41" rx="4.5" fill="${paper}"/>
      <path d="M24 27h44a5 5 0 0 1 5 5v6H19v-6a5 5 0 0 1 5-5z" fill="${lilac}"/>
      <path d="M30 23v8m30-8v8" stroke-width="3"/>
      <path d="M28 48h36m-36 9h36" stroke="#ded9cf" stroke-width="1.4"/>
      <g fill="${mint}" stroke-width="1.4"><rect x="30" y="43" width="8" height="7" rx="2"/><rect x="49" y="43" width="8" height="7" rx="2"/><rect x="30" y="53" width="8" height="7" rx="2"/><rect x="49" y="53" width="8" height="7" rx="2"/></g>
    </g>
    <path d="M17 35c3-12 16-22 31-23m-6-3 7 3-5 5m35 44c-4 12-16 20-31 21m6 3-7-3 5-5" stroke="${ink}" stroke-width="2.7" fill="none"/>`,

  'timezone-converter': `
    <g transform="rotate(-17 42 43)">
      <path d="M43 71v6l9 4H30l9-4v-6" fill="${gold}"/>
      <path d="M56 15c14 6 21 26 10 42-8 13-24 18-37 12" fill="none" stroke-width="3.1"/>
      <circle cx="40" cy="41" r="25" fill="${blue}"/>
      <ellipse cx="40" cy="41" rx="11.5" ry="25" fill="none" stroke-width="1.6"/>
      <path d="M16 41h48M21 26c9 6 28 6 38 0M21 55c9-6 28-6 38 0" fill="none" stroke-width="1.5"/>
      <path d="M40 17v48" stroke-width="1.4"/>
    </g>
    <circle cx="68" cy="63" r="16" fill="${gold}"/>
    <circle cx="67" cy="62" r="12.5" fill="${paper}" stroke-width="1.6"/>
    <path d="M67 54v8l6 3" fill="none" stroke-width="2.4"/>
    <circle cx="67" cy="62" r="1.6" fill="${ink}" stroke="none"/>`,

  'service-price-calculator': `
    <g transform="rotate(-9 40 45)">
      <rect x="21" y="15" width="40" height="61" rx="6" fill="${violet}"/>
      <rect x="18" y="12" width="40" height="61" rx="6" fill="${lilac}"/>
      <rect x="24" y="19" width="28" height="14" rx="2" fill="${paper}"/>
      <path d="M39 28h8" stroke-width="2.4"/>
      <g fill="${paper}" stroke-width="1.4">
        <rect x="24" y="40" width="6" height="6" rx="1.6"/><rect x="35" y="40" width="6" height="6" rx="1.6"/><rect x="46" y="40" width="6" height="6" rx="1.6"/>
        <rect x="24" y="51" width="6" height="6" rx="1.6"/><rect x="35" y="51" width="6" height="6" rx="1.6"/><rect x="24" y="61" width="6" height="6" rx="1.6"/><rect x="35" y="61" width="6" height="6" rx="1.6"/>
        <rect x="46" y="51" width="6" height="16" rx="1.6" fill="${gold}"/>
      </g>
    </g>
    <g transform="rotate(-7 67 59)">
      <path d="m60 43 12-1 11 19-16 12-13-20z" fill="${gold}"/>
      <circle cx="63" cy="49" r="2" fill="${paper}" stroke-width="1.5"/>
      <path d="M63 48c-8-7-4-15 2-15 4 0 6 4 5 8" fill="none" stroke-width="1.6"/>
      <path d="m63 60 9-6m-6 11 9-6" fill="none" stroke-width="1.6"/>
    </g>`,

  'no-show-calculator': `
    <g transform="rotate(-8 44 47)">
      <path d="m27 68-5 9h6l6-7m21 0 6 7h5l-4-10" fill="${coral}"/>
      <path d="M23 26c-5 0-7-4-5-8s9-7 15-4l2 3zM52 16l3-3c6-2 13 1 15 6 2 4-1 7-6 7z" fill="${coral}"/>
      <circle cx="44" cy="46" r="27" fill="${coral}"/>
      <circle cx="44" cy="46" r="21" fill="${paper}"/>
      <path d="M44 28v3m0 30v3m-18-18h3m30 0h3" stroke-width="1.7"/>
      <path d="M44 34v12l-9 5" fill="none" stroke-width="2.7"/>
      <circle cx="44" cy="46" r="2.1" fill="${ink}" stroke="none"/>
    </g>
    <circle cx="70" cy="66" r="13" fill="${lilac}"/>
    <path d="m66 62 8 8m0-8-8 8" fill="none" stroke-width="2.8"/>`,

  'time-slot-generator': `
    <g transform="rotate(-5 47 47)">
      <rect x="20" y="17" width="58" height="61" rx="5" fill="${teal}"/>
      <rect x="16" y="13" width="58" height="61" rx="5" fill="${paper}"/>
      <path d="M21 13h48a5 5 0 0 1 5 5v8H16v-8a5 5 0 0 1 5-5z" fill="${mint}"/>
      <path d="M27 10v8m10-8v8m17-8v8m10-8v8" stroke-width="2.8"/>
      <path d="M28 34v29" fill="none" stroke="#aaa595" stroke-width="1.8"/>
      <g fill="${ink}" stroke="none"><circle cx="28" cy="36" r="2.1"/><circle cx="28" cy="48" r="2.1"/><circle cx="28" cy="60" r="2.1"/></g>
      <g stroke-width="1.45"><rect x="35" y="32" width="29" height="8" rx="3" fill="${blue}"/><rect x="35" y="44" width="19" height="8" rx="3" fill="${gold}"/><rect x="35" y="56" width="25" height="8" rx="3" fill="${lilac}"/></g>
    </g>`,
};

export function toolArt(slug) {
  const drawing = drawings[slug];
  if (!Object.hasOwn(drawings, slug)) throw new Error(`Unknown tool illustration: ${slug}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true" focusable="false"><ellipse cx="48" cy="80" rx="31" ry="4" fill="#706350" opacity=".09"/><g fill="none" stroke="${ink}" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round">${drawing}</g></svg>`;
}
