/* MimoMix V9 — produto publicado só com confirmação de checkout, preço, estoque e logística. */
(function(){
"use strict";
const n=(x)=>Number.isFinite(Number(x))?Number(x):NaN;
const money=(v)=>Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const esc=(x)=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const authorizedHost=(s)=>{try{const url=new URL(s);return url.protocol==="https:" && /(^|\.)yampi\.com\.br$/.test(url.hostname)?url.href:null}catch(_){return null}};
const yampi=new Map();
let loaded=false;
function isReady(p){
 const r=yampi.get(p.id);
 return r && r.status==="active" && r.approvedForSale===true && r.shippingVerified===true && r.stockVerified===true && n(r.price)>0 && authorizedHost(r.checkoutUrl);
}
function currentPrice(p){
 const record=yampi.get(p.id);
 if(isReady(p))return '<strong>'+money(n(record.price))+'</strong>';
 if(record&&n(record.price)>0)return '<span class="mm-coming">'+money(n(record.price))+'</span><small class="mm-price-note">Preço de rascunho · venda indisponível</small>';
 return '<span class="mm-coming">Preço em definição</span>';
}
// A liberação nunca depende apenas de um link preenchido no HTML.
const originalCheckout=checkoutHref;
checkoutHref=function(id){const p=catalog.find(x=>x.id===id);if(!p||!isReady(p))return null;const url=authorizedHost(yampi.get(id).checkoutUrl);return url||originalCheckout(id)};
priceLabel=function(p){return currentPrice(p)};
function renderFeatured(){
 const cards=document.querySelectorAll(".v6-preview-card");
 const refs=["bluetooth","game","marmita","massageador"];
 cards.forEach((card,i)=>{
  const p=catalog.find(x=>x.id===refs[i]);
  if(!p)return;
  const title=card.querySelector(".content strong"),price=card.querySelector(".content p"),button=card.querySelector(".content button"),tag=card.querySelector(".imgbox .tag");
  if(title)title.textContent=p.name;
  if(price){price.innerHTML=currentPrice(p)+'<span class="mm-state-line"><span class="dot"></span>'+(isReady(p)?"Disponível para compra":"Em análise comercial")+'</span>';}
  if(button){button.textContent=isReady(p)?"Ver e comprar →":"Ver detalhes →";button.dataset.open=p.id;}
  if(tag)tag.textContent=isReady(p)?"DISPONÍVEL":"EM ANÁLISE";
 });
}
function reviewStrip(){
 const grid=document.getElementById("product-grid"),prodSection=document.getElementById("produtos");
 if(!grid||!prodSection||document.getElementById("mm-review-proof"))return;
 const box=document.createElement("section");box.id="mm-review-proof";box.className="mm-social-proof";
 box.innerHTML='<div><span class="eyebrow">✦ OPINIÕES DE QUEM COMPRA</span><h3>Avaliações de clientes</h3><p>Ainda não temos avaliações de compras verificadas. Quando os pedidos começarem a ser entregues, opiniões reais e autorizadas poderão aparecer aqui.</p></div><div><div class="mm-outlined" aria-label="Sem avaliação cadastrada">☆☆☆☆☆</div><small style="font-size:11px;color:#9a88ab">Nenhuma nota atribuída</small></div>';
 grid.parentNode.insertBefore(box,grid.nextSibling);
}
function decorateCards(){
 const grid=document.getElementById("product-grid");if(!grid)return;
 for(const card of grid.querySelectorAll(".product-card")){
  const id=card.querySelector("[data-open]")?.dataset.open;
  const p=catalog.find(x=>x.id===id);
  if(!p||card.dataset.mmV9==="yes")continue;card.dataset.mmV9="yes";
  const info=card.querySelector(".product-info");
  if(!info)continue;
  const teaser=info.querySelector(".mm-review-teaser");
  if(teaser){
    const rows=(window.MIMOMIX_VERIFIED_REVIEWS||{})[id]||[];
    const valid=Array.isArray(rows)?rows.filter(r=>r.approved===true && r.verifiedPurchase===true && n(r.stars)>=1 && n(r.stars)<=5):[];
    if(valid.length){
      const avg=valid.reduce((sum,r)=>sum+n(r.stars),0)/valid.length;
      teaser.textContent="★ "+avg.toFixed(1).replace(".",",")+" · "+valid.length+" avaliação(ões) verificadas";
      teaser.style.color="#be7700";
    }else teaser.textContent="☆☆☆☆☆ · Sem avaliações verificadas";
  }
  const status=document.createElement("div");status.className="mm-spotlight";
  status.textContent=isReady(p)?"✓ Preço e checkout confirmados":"🔒 Compra disponível após confirmação";
  const buy=document.createElement(isReady(p)?"a":"button");
  if(isReady(p)){
    buy.className="mm-cta-ready";buy.href=checkoutHref(p.id);buy.target="_blank";buy.rel="noopener noreferrer";buy.textContent="Comprar com segurança ↗";
  }else{
    buy.className="mm-cta-disabled";buy.type="button";buy.disabled=true;buy.textContent="Compra ainda indisponível";
  }
  info.append(status,buy);
 }
}
let mutationObserver;
function refresh(){
 render();renderFeatured();decorateCards();reviewStrip();
}
function attachObserver(){
 const grid=document.getElementById("product-grid");if(!grid||mutationObserver)return;
 mutationObserver=new MutationObserver(decorateCards);
 mutationObserver.observe(grid,{childList:true});
}
// Notificação editorial — jamais apresenta "alguém comprou" sem dados de pedido real.
let promoIndex=0, dismissed=false;
function rotatePromotion(){
 if(dismissed)return;
 const popup=document.getElementById("feature-popup");
 if(!popup)return;
 const p=catalog[promoIndex++%catalog.length];
 document.getElementById("popup-emoji").textContent=p.emoji;
 document.getElementById("popup-title").textContent="✨ Achadinho em destaque";
 document.getElementById("popup-desc").textContent=p.name+" · "+(isReady(p)?money(n(yampi.get(p.id).price)):"em preparação");
 const fine=popup.querySelector("small");if(fine)fine.textContent="Vitrine MimoMix · não é uma notificação de venda";
 popup.classList.add("visible");
 setTimeout(()=>popup.classList.remove("visible"),5600);
}
document.getElementById("popup-close")?.addEventListener("click",()=>dismissed=true);
function setupNotifications(){
 if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;
 setTimeout(rotatePromotion,5000);setInterval(rotatePromotion,22000);
}
// Importação de catálogo público revisado (sem tokens ou dados privados).
fetch("catalogo-yampi.json?v=9",{cache:"no-store"}).then(res=>res.ok?res.json():Promise.reject(new Error("Dados ainda não publicados"))).then(data=>{
 if(!data || !Array.isArray(data.products))return;
 for(const item of data.products){
  if(!item||typeof item.id!=="string"||!item.id.match(/^[a-zA-Z0-9_-]{1,48}$/))continue;
  // Só cadastramos produtos adicionais quando possuem título e aprovação editorial.
  const record={...item};
  if(record.checkoutUrl && !authorizedHost(record.checkoutUrl))record.checkoutUrl="";
  if(record.approvedForSale!==true)record.status="inactive";
  yampi.set(record.id,record);
  const exists=catalog.some(p=>p.id===record.id);
  if(!exists && record.showInCatalog===true && typeof record.name==="string" && record.name.trim() && record.name.length<=130){
    catalog.push({id:record.id,name:record.name.trim(),summary:typeof record.description==="string"?record.description.slice(0,220):"Produto em preparação na MimoMix.",category:["Casa","Brinquedos","Tecnologia","Games","Beleza","Automotivo","Pet","Presentes"].includes(record.category)?record.category:"Tecnologia",emoji:"🛍️",bg:"#efe5ff",url:"https://www.yampi.com.br/"});
  }
 }
 loaded=true;refresh();
}).catch(()=>{loaded=true;refresh();});
attachObserver();renderFeatured();reviewStrip();decorateCards();setupNotifications();
})();
