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

  'team-working-hours-planner': `
    <g transform="rotate(-6 45 48)">
      <rect x="14" y="23" width="63" height="48" rx="5" fill="${teal}"/>
      <rect x="11" y="19" width="63" height="49" rx="5" fill="${paper}"/>
      <path d="M16 19h53a5 5 0 0 1 5 5v6H11v-6a5 5 0 0 1 5-5z" fill="${mint}"/>
      <path d="M23 16v7m39-7v7" stroke-width="3"/>
      <path d="M43 32v31m9-31v31" stroke="#d7d1c2" stroke-width="1" stroke-dasharray="2 2"/>
      <g fill="#ead6bb" stroke-width="1.4"><circle cx="21" cy="37" r="2.8"/><path d="M16.5 44c0-5.3 9-5.3 9 0z" fill="${lilac}"/></g>
      <g fill="#c89773" stroke-width="1.4"><circle cx="21" cy="52" r="2.8"/><path d="M16.5 59c0-5.3 9-5.3 9 0z" fill="${coral}"/></g>
      <rect x="29" y="36" width="23" height="7" rx="3.5" fill="${lilac}" stroke-width="1.5"/>
      <rect x="43" y="51" width="22" height="7" rx="3.5" fill="${coral}" stroke-width="1.5"/>
      <path d="M43 63h9" stroke="${teal}" stroke-width="2.7"/>
    </g>
    <g transform="rotate(7 69 64)">
      <circle cx="70" cy="65" r="14" fill="${gold}"/>
      <circle cx="68.5" cy="63.5" r="10.9" fill="${paper}" stroke-width="1.45"/>
      <path d="M68.5 56.7v6.8l5.2 3" stroke-width="2.45"/>
      <circle cx="68.5" cy="63.5" r="1.6" fill="${ink}" stroke="none"/>
    </g>`,

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
  'shopify-booking-page-checker': `
    <g transform="rotate(-6 43 46)">
      <rect x="16" y="22" width="57" height="49" rx="5" fill="${teal}"/>
      <rect x="13" y="19" width="57" height="49" rx="5" fill="${paper}"/>
      <path d="M19 19h45a5 5 0 0 1 6 5v4H13v-4a5 5 0 0 1 6-5z" fill="${mint}"/>
      <g fill="${ink}" stroke="none"><circle cx="20" cy="24" r="1.3"/><circle cx="25" cy="24" r="1.3"/><circle cx="30" cy="24" r="1.3"/></g>
      <path d="M21 39h26l3 7c-1 4-5 5-8 2-2 3-6 3-8 0-2 3-6 3-8 0-3 3-7 2-8-2z" fill="${coral}" stroke-width="1.7"/>
      <path d="M21 51v9h24v-9m-16 9v-8h8v8" stroke-width="1.7"/>
    </g>
    <g transform="rotate(-38 65 62)">
      <rect x="60" y="63" width="9" height="23" rx="4" fill="${gold}"/>
      <rect x="61.5" y="61" width="6" height="8" rx="1.3" fill="${blue}" stroke-width="1.6"/>
      <circle cx="64.5" cy="48.5" r="16.5" fill="${blue}"/>
      <circle cx="64.5" cy="48.5" r="12" fill="#e5f2ee" stroke-width="1.7"/>
      <path d="m59 45 3 5 9-2" fill="none" stroke="#477c69" stroke-width="2.7"/>
    </g>`,

  'mobile-service-travel-fee-calculator': `
    <path d="m11 29 18-8 17 6 18-8 7 38-17 8-19-5-17 8z" fill="${paper}"/>
    <path d="m29 21 17 6 7 37-18-4z" fill="${mint}"/>
    <path d="m16 38 16-7 18 7 15-8m-46 22 15-7 18 7 14-8" fill="none" stroke="#c6c7b1" stroke-width="2"/>
    <path d="M36 26c0-5 4-9 9-9s9 4 9 9c0 5-6 11-9 15-4-4-9-11-9-15z" fill="${coral}"/>
    <circle cx="45" cy="26" r="3" fill="${paper}" stroke-width="1.4"/>
    <g transform="rotate(-5 59 65)">
      <path d="M35 52h26v21H32V56c0-2 1-4 3-4z" fill="${blue}"/>
      <path d="M61 56h9l9 10v7H61z" fill="${mint}"/>
      <path d="M65 60h4l5 6h-9z" fill="${paper}" stroke-width="1.5"/>
      <path d="M32 70h47v5H32z" fill="#6f9fa4" stroke-width="1.6"/>
      <path d="M38 57h12m-10 5h7" stroke="#eaf4ee" stroke-width="2"/>
      <circle cx="42" cy="74" r="5.1" fill="${ink}"/><circle cx="69" cy="74" r="5.1" fill="${ink}"/>
      <g fill="${paper}" stroke="none"><circle cx="42" cy="74" r="1.9"/><circle cx="69" cy="74" r="1.9"/></g>
    </g>`,

  'rental-equipment-condition-report': `
    <g transform="rotate(6 55 42)">
      <path d="M36 12h25l10 10v41H36z" fill="${gold}"/>
      <path d="M33 10h25l10 10v41H33z" fill="${paper}"/>
      <path d="M58 10v11h10" fill="${gold}"/>
      <path d="M39 27h16m-16 7h11" stroke="#9b9586" stroke-width="1.8"/>
    </g>
    <g transform="rotate(-7 43 58)">
      <path d="M14 43h10l4-7h17l4 7h13a5 5 0 0 1 5 5v23a5 5 0 0 1-5 5H14a5 5 0 0 1-5-5V48a5 5 0 0 1 5-5z" fill="${teal}"/>
      <path d="M10 52h56v15H10z" fill="${mint}" stroke-width="1.5"/>
      <circle cx="38" cy="57" r="13" fill="${paper}"/>
      <circle cx="38" cy="57" r="8.6" fill="${blue}"/>
      <path d="M34 56c.5-2 2-3.5 4-4" stroke="#f3f4ed" stroke-width="2"/>
      <rect x="53" y="46" width="8" height="4" rx="1" fill="${gold}" stroke-width="1.2"/>
    </g>
    <circle cx="72" cy="65" r="12.5" fill="${gold}"/>
    <path d="m66 65 4 4 8-9" fill="none" stroke-width="2.8"/>`,

  'appointment-cancellation-policy-generator': `
    <g transform="rotate(-6 43 46)">
      <path d="M21 16h32l13 13v48H21z" fill="${violet}"/>
      <path d="M18 13h32l13 13v48H18z" fill="${paper}"/>
      <path d="M50 13v14h13" fill="${lilac}"/>
      <path d="M26 25h13m-13 7h18" stroke-width="2.4"/>
      <path d="M26 43h28m-28 7h22m-22 7h15" stroke="#8f887a" stroke-width="1.7"/>
      <path d="M25 66h17" stroke="${violet}" stroke-width="3"/>
    </g>
    <g transform="rotate(13 65 63)">
      <path d="M60 48c0-8 14-8 14 0 0 4-4 7-4 12v4h-7v-4c0-5-3-8-3-12z" fill="${coral}"/>
      <path d="M56 64h21l4 6v4H52v-4z" fill="${gold}"/>
      <rect x="50" y="72" width="32" height="5.5" rx="2" fill="${violet}"/>
      <path d="M62 47c1-2 3-3 5-3" stroke="#ffe2cb" stroke-width="2.2"/>
    </g>`,

  'booking-waitlist-matcher': `
    <g transform="rotate(-6 42 48)">
      <rect x="19" y="19" width="43" height="16" rx="5" fill="${mint}"/>
      <rect x="15" y="39" width="43" height="16" rx="5" fill="${blue}"/>
      <rect x="11" y="59" width="43" height="16" rx="5" fill="${lilac}"/>
      <g stroke-width="1.4" fill="${paper}">
        <circle cx="28" cy="25" r="2.6"/><path d="M23 31c.8-5 9.2-5 10 0z"/>
        <circle cx="24" cy="45" r="2.6"/><path d="M19 51c.8-5 9.2-5 10 0z"/>
        <circle cx="20" cy="65" r="2.6"/><path d="M15 71c.8-5 9.2-5 10 0z"/>
      </g>
      <path d="M39 27h15m-19 20h15m-19 20h15" stroke-width="2"/>
    </g>
    <path d="M61 28h4c8 0 12 5 12 12v11m-5-5 5 6 5-6" stroke-width="2.6"/>
    <g transform="rotate(7 70 65)">
      <path d="M57 55h26v5a4.2 4.2 0 0 0 0 8v6H57v-6a4.2 4.2 0 0 0 0-8z" fill="${gold}"/>
      <path d="m64 64 4 4 7-8" stroke-width="2.5"/>
    </g>`,

  'class-pass-expiry-calculator': `
    <g transform="rotate(-9 42 46)">
      <rect x="16" y="23" width="56" height="39" rx="5" fill="${violet}"/>
      <rect x="13" y="19" width="56" height="39" rx="5" fill="${lilac}"/>
      <path d="M14 32h54" stroke-width="1.7"/>
      <path d="M20 26h17" stroke-width="2.2"/>
      <g fill="${paper}" stroke-width="1.5"><circle cx="25" cy="44" r="4.7"/><circle cx="39" cy="44" r="4.7"/></g>
      <circle cx="53" cy="44" r="4.7" fill="none" stroke-dasharray="2 2" stroke-width="1.5"/>
    </g>
    <g transform="rotate(8 59 64)">
      <path d="M48 50h24c1 9-4 11-9 15 5 4 9 7 9 14H48c0-7 4-10 9-14-5-4-10-7-9-15z" fill="#e6f2ed"/>
      <path d="M51 56h18c-2 3-6 5-9 8-3-3-7-5-9-8zm1 21c1-3 5-5 8-8 3 3 7 5 8 8z" fill="${gold}" stroke-width="1.3"/>
      <rect x="45" y="46" width="30" height="5" rx="2" fill="${coral}"/>
      <rect x="45" y="78" width="30" height="5" rx="2" fill="${coral}"/>
    </g>`,

  'experience-gift-voucher-maker': `
    <g transform="rotate(-7 46 50)">
      <path d="M13 33h69v12a5 5 0 0 0 0 10v13H13V55a5 5 0 0 0 0-10z" fill="${violet}"/>
      <path d="M11 29h69v12a5 5 0 0 0 0 10v13H11V51a5 5 0 0 0 0-10z" fill="${lilac}"/>
      <path d="M18 34h53m-53 25h53" fill="none" stroke="#e8daf6" stroke-width="1.8"/>
      <path d="M25 29h10v35H25z" fill="${coral}"/>
      <path d="M30 29c-10 0-18-5-16-10 2-5 12-3 16 8 1-11 8-16 12-12 5 5-2 11-12 14z" fill="${coral}"/>
      <path d="m29 30-7 10-1-5-5 1 9-7m7 1 8 9 1-5 5 1-9-7" fill="${coral}" stroke-width="1.6"/>
      <circle cx="30" cy="29" r="3.7" fill="${gold}"/>
      <path d="m57 37 2.8 5.8 6.4.9-4.6 4.5 1.1 6.2-5.7-3-5.6 3 1-6.2-4.5-4.5 6.4-.9z" fill="${gold}" stroke-width="1.6"/>
    </g>
    <path d="m75 16 2-4m3 9 5-1m-68 52-4 3" stroke="#8b7ba3" stroke-width="2"/>`,

  'ical-feed-validator': `
    <g transform="rotate(-6 42 44)">
      <rect x="19" y="21" width="48" height="49" rx="5" fill="${teal}"/>
      <rect x="16" y="17" width="48" height="49" rx="5" fill="${paper}"/>
      <path d="M21 17h38a5 5 0 0 1 5 5v8H16v-8a5 5 0 0 1 5-5z" fill="${mint}"/>
      <path d="M26 13v10m27-10v10" stroke-width="3"/>
      <path d="m30 39-7 7 7 7m18-14 7 7-7 7m-6-16-6 18" stroke="${violet}" stroke-width="2.8"/>
    </g>
    <path d="M61 48c8 3 16 3 21 1l-1 14c-.5 6-6 11-12 14-6-3-11-8-12-14l-1-13z" fill="${blue}"/>
    <path d="m62 61 5 5 9-10" stroke-width="3"/>`,

  'salon-commission-calculator': `
    <g transform="rotate(-8 39 44)">
      <path d="M37 46 26 13c5 1 9 7 12 13l6 14z" fill="#d3dfe2"/>
      <path d="m39 44 13-31c3 4 1 12-2 19l-6 15z" fill="${blue}"/>
      <path d="m40 43-8 12m8-12 9 13" fill="none" stroke-width="4"/>
      <ellipse cx="26.5" cy="62" rx="8" ry="11" transform="rotate(29 26.5 62)" fill="${lilac}"/>
      <ellipse cx="26.5" cy="62" rx="3.6" ry="6.1" transform="rotate(29 26.5 62)" fill="${paper}" stroke-width="1.4"/>
      <ellipse cx="51" cy="62" rx="8" ry="11" transform="rotate(-28 51 62)" fill="${coral}"/>
      <ellipse cx="51" cy="62" rx="3.6" ry="6.1" transform="rotate(-28 51 62)" fill="${paper}" stroke-width="1.4"/>
      <circle cx="40" cy="43" r="3.1" fill="${gold}" stroke-width="1.6"/>
    </g>
    <g transform="rotate(-5 69 66)">
      <path d="M54 67h29v7c0 8-29 8-29 0z" fill="#d7aa59"/>
      <ellipse cx="68.5" cy="67" rx="14.5" ry="6" fill="${gold}"/>
      <path d="M54 59h29v7c0 8-29 8-29 0z" fill="#e8b75f"/>
      <ellipse cx="68.5" cy="59" rx="14.5" ry="6" fill="${gold}"/>
      <path d="M65 58c3-2 7-2 10 0m-14 7 0 3m16-3 0 3" fill="none" stroke-width="1.35"/>
    </g>`,

  'class-check-in-sheet-generator': `
    <g transform="rotate(-6 47 51)">
      <path d="m35 11 10 15h6l10-15-4-2-9 12-9-13z" fill="${coral}"/>
      <rect x="21" y="29" width="54" height="50" rx="6" fill="${violet}"/>
      <rect x="18" y="25" width="54" height="50" rx="6" fill="${paper}"/>
      <path d="M24 25h42a6 6 0 0 1 6 6v8H18v-8a6 6 0 0 1 6-6z" fill="${lilac}"/>
      <rect x="40" y="28" width="13" height="4" rx="2" fill="${ink}" stroke-width="1.1"/>
      <path d="m45 25 2 5 2-5" fill="none" stroke-width="1.7"/>
      <g fill="${blue}" stroke-width="1.45"><circle cx="30" cy="48" r="3.5"/><path d="M23 58c1-7 13-7 14 0z"/></g>
      <path d="M42 47h20m-20 7h13m-32 12h19" stroke="#8d877a" stroke-width="1.75"/>
    </g>
    <circle cx="69" cy="67" r="13" fill="${mint}"/>
    <path d="m62.5 67 4.3 4.3 9-10" stroke-width="2.8"/>`,

};

export function toolArt(slug) {
  const drawing = drawings[slug];
  if (!Object.hasOwn(drawings, slug)) throw new Error(`Unknown tool illustration: ${slug}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true" focusable="false"><ellipse cx="48" cy="80" rx="31" ry="4" fill="#706350" opacity=".09"/><g fill="none" stroke="${ink}" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round">${drawing}</g></svg>`;
}
