const query=document.querySelector('#find-tool');
query?.addEventListener('input',()=>{
  const words=query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let count=0;
  for(const section of document.querySelectorAll('.kit-group')){
    let visible=0;
    for(const card of section.querySelectorAll('.kit-card')){
      const text=card.textContent.toLowerCase();card.hidden=!words.every(w=>text.includes(w));if(!card.hidden)visible++;
    }
    section.hidden=!visible;count+=visible;
  }
  document.querySelector('#tool-search-status').textContent=words.length?(count?count+' tools match your search.':'No tools match. Try a service, task or industry.'):'';
});
