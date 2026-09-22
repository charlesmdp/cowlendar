'use strict';
(() => {
  const $all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const assets = window.COWLENDAR_ASSETS;
  const keyboardClick = el => el.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); el.click(); }
  });
  const wireTabs = (selector, callback) => {
    const tabs = $all(selector);
    tabs.forEach(tab => {
      keyboardClick(tab);
      tab.addEventListener('click', () => callback(tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const visible = tabs.filter(el => el.getClientRects().length);
        const current = visible.indexOf(tab);
        const index = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + visible.length) % visible.length;
        event.preventDefault(); visible[index].focus(); visible[index].click();
      });
    });
  };
  const heroData = {
    'Kayak': ['Kayak Booking', 'Kayak Booking', 'Your next outdoor adventure', 'kayak'],
    'Wine Tasting': ['Wine Tasting', 'Wine Tasting', 'Wine Tasting Event', 'wine'],
    'Hairdresser': ['Hairdresser', 'Hair Cut', 'Best Haircut in Town', 'hair'],
    'Car Rentals': ['Short Term Rental', 'Short Term Rental', 'Best Rental Service', 'car'],
    'Your Services': ['Your Service', 'Your Service', 'Your business. Your way to book.', 'custom']
  };
  wireTabs('[data-hero-tab]', tab => {
    const name = tab.dataset.heroTab, data = heroData[name];
    $all('[data-hero-tab]').forEach(el => el.setAttribute('aria-selected', String(el.dataset.heroTab === name)));
    $all('[data-hero-title]').forEach(el => { el.textContent = el.closest('.framer-myj36w') ? data[0] : data[1]; });
    $all('[data-hero-subtitle]').forEach(el => { el.textContent = data[2]; });
    $all('[data-hero-photo]').forEach(img => {
      img.removeAttribute('srcset'); img.src = assets[data[3] + (img.dataset.heroPhoto === 'product' ? 'Product' : 'Avatar')]; img.alt = name;
    });
  });
  const cases = {
    'Cleaning': {title:'Cleaning company (maid, car cleaning, etc.)',description:'Cowlendar can help you setting up your maid service company in no time. You’ll be able to add staff and upsell things (fridge cleaning? +$30)',service:'Cleaning Service',option1:'Full House Cleaning',option2:'Single Room Cleaning',date:'30 May, 2024',image:'cleaning'},
    'Hotel': {title:'Hotel/Airbnb Companies',description:'Optimize your hotel or Airbnb management with Cowlendar. Simplify booking processes, coordinate staff, and upsell amenities (late check-out? +$50) to provide a seamless guest experience.',service:'Hotel Booking',option1:'Deluxe Room',option2:'Single Room',date:'29 May, 2024 – 30 May, 2024',image:'hotel'},
    'Consulting': {title:'Consulting Company',description:'Streamline your consulting business with Cowlendar. Easily schedule appointments, manage client engagements, and upsell services (additional session? +$100) to boost your revenue.',service:'Consulting',option1:'Career Consultation',option2:'Resume Review',date:'10 Nov, 2024',image:'consulting'},
    'Kayak': {title:'Kayak Tour Company',description:'Cowlendar makes managing your kayak tour company a breeze. Effortlessly schedule tours, assign guides, and offer add-ons (sunset tour? +$20) to enhance your customers’ experience.',service:'Kayak Booking',option1:'Single Day Package',option2:'Half Day Package',date:'30 Oct, 2024',image:'kayak'},
    'Pet Care': {title:'Pet Care Company',description:'Enhance your pet care business with Cowlendar booking appointment. Effortlessly schedule pet sitting, grooming, and walking services while offering add-ons to keep your clients’ pets happy.',service:'Pet Care',option1:'Dog Spa',option2:'Vaccination',date:'30 Oct, 2024',image:'pet'},
    'Class': {title:'Tutoring Company (English Courses)',description:'Streamline your English tutoring services with Cowlendar booking app. Easily manage class schedules, assign tutors, and upsell additional lessons to help your students excel.',service:'English Classes',option1:'Morning Batch (9:00 – 10:00 AM)',option2:'Evening Batch (4:00 – 5:00 PM)',date:'30 Oct, 2024',image:'class'}
  };
  const selectCase = name => {
    const data = cases[name];
    $all('[data-case-tab]').forEach(el => el.setAttribute('aria-selected', String(el.dataset.caseTab === name)));
    $all('[data-case-field]').forEach(el => { el.textContent = data[el.dataset.caseField]; });
    $all('[data-case-photo]').forEach(img => { img.removeAttribute('srcset'); img.src = assets[data.image]; img.alt = data.service; });
  };
  wireTabs('[data-case-tab]', tab => selectCase(tab.dataset.caseTab));
  selectCase('Cleaning');
  // Preserve the original compact mobile navigation with a keyboard-accessible disclosure.
  const menu = document.createElement('nav');
  menu.className = 'mobile-menu'; menu.id = 'mobile-navigation'; menu.hidden = true; menu.setAttribute('aria-label','Mobile navigation');
  const links = [['Features','#features'],['Use Cases','#use-cases'],['Pricing','#pricing'],['Blog','https://cowlendar.com/blog'],['Affiliate','https://bubbleaffiliate.com/'],['Start for Free','https://apps.shopify.com/cowlendar']];
  links.forEach(([label,href]) => { const a = document.createElement('a'); a.href=href; a.textContent=label; menu.append(a); });
  document.body.append(menu);
  let activeToggle;
  const closeMenu = () => { menu.hidden = true; $all('[data-menu-toggle]').forEach(el => {el.setAttribute('aria-expanded','false');el.setAttribute('aria-label','Open navigation');}); };
  $all('[data-menu-toggle]').forEach(toggle => {
    toggle.setAttribute('aria-controls',menu.id); keyboardClick(toggle);
    toggle.addEventListener('click', () => {
      if (!menu.hidden) return closeMenu();
      activeToggle=toggle; menu.hidden=false; toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');
      const rect=toggle.getBoundingClientRect();menu.style.top=Math.max(64,rect.bottom+12)+'px';menu.querySelector('a').focus();
    });
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {if (event.key==='Escape' && !menu.hidden) {closeMenu();activeToggle?.focus();}});
  document.addEventListener('click', event => {if(!menu.hidden && !menu.contains(event.target) && !event.target.closest('[data-menu-toggle]'))closeMenu();});
  window.addEventListener('resize',closeMenu);
  // The product previews are illustrations; only the published marketing controls are interactive.
  $all('[tabindex="0"]').forEach(el => { if (!el.matches('a,button,[role="tab"],[data-menu-toggle]') && !el.closest('[data-hero-tab],[data-case-tab]')) el.removeAttribute('tabindex'); });
  const tabGroups = new Set($all('[role="tab"]').map(el => el.parentElement));
  tabGroups.forEach(group => { if(group.querySelectorAll(':scope > [role="tab"]').length > 1) group.setAttribute('role','tablist'); });
})();
(() => {
  const navs = [...document.querySelectorAll('[data-sticky-nav]')];
  const update = () => navs.forEach(nav => {
    const visible = window.scrollY > 650;
    nav.classList.toggle('is-visible',visible); nav.setAttribute('aria-hidden',String(!visible));nav.inert = !visible;
  });
  window.addEventListener('scroll',update,{passive:true});update();
})();
document.querySelector('[data-hero-tab="Kayak"]')?.click();
