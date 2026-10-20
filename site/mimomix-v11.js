(function(){
"use strict";
const $=id=>document.getElementById(id);
const categories=["Todos","Brinquedos","Tecnologia","Casa & Cozinha","Criadores","Iluminação","Games","Automotivo"];
const colors={"Games":["#6115db","#d23ffc"],"Brinquedos":["#f92a9b","#ff914b"],"Casa & Cozinha":["#d3268c","#ff9950"],"Tecnologia":["#292179","#9b3ff2"],"Criadores":["#571be6","#ff56cb"],"Iluminação":["#2b2172","#e530bc"],"Automotivo":["#19265c","#f24f96"]};
const emoji={"Games":"🎮","Brinquedos":"🧸","Casa & Cozinha":"🏡","Tecnologia":"🎧","Criadores":"📸","Iluminação":"💡","Automotivo":"🚗"};
let products=[],category="Todos",search="",favorites=[],favoritesOnly=false,sort="featured",featureTimer=null;
try{let a=JSON.parse(localStorage.getItem("mimomix_favorites")||"[]");if(Array.isArray(a))favorites=a.filter(s=>typeof s==="string")}catch(_){}
const money=v=>Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const safe=s=>String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
function toast(t){const el=$("toast");el.textContent=t;el.hidden=false;clearTimeout(window.mimoToast);window.mimoToast=setTimeout(()=>el.hidden=true,3500)}
function image(p,alt){
 const photo=Array.isArray(p.images)&&p.images.length&&/^https:\/\/images\.yampi\.me\//.test(p.images[0])?p.images[0]:null;
 const promo=typeof p.marketingArtwork==="string"&&/^(?:assets\/promos\/[a-z0-9-]+\.(?:webp|jpg)|assets\/processador-portatil-ilustrativo\.svg)$/.test(p.marketingArtwork)?p.marketingArtwork:null;
 const src=promo||photo;
 const placeholder='<span class="art" role="img" aria-label="Arte da categoria">'+(emoji[p.category]||"🎁")+'</span>';
 return placeholder+(src?'<img class="product-visual '+(promo?"promo-art":"source-photo")+'" loading="lazy" decoding="async" src="'+safe(src)+'" data-backup="'+safe(photo||"")+'" alt="'+safe(alt||p.name)+'">':"");
}
document.addEventListener("error",function(e){
 const img=e.target;if(!(img instanceof HTMLImageElement)||!img.classList.contains("product-visual"))return;
 const back=img.dataset.backup;
 if(back&&img.src!==back&&/^https:\/\/images\.yampi\.me\//.test(back)){
  img.dataset.backup="";img.classList.remove("promo-art");img.classList.add("source-photo");img.src=back;
 }else img.style.display="none";
},true);
function applyFilter(cat){category=cat;favoritesOnly=false;render();$("produtos").scrollIntoView({behavior:"smooth"})}
function visible(){
 let rows=products.filter(p=>(category==="Todos"||p.category===category)&&(!favoritesOnly||favorites.includes(p.id))&&((p.name+" "+p.category+" "+p.sku).toLocaleLowerCase("pt-BR").includes(search)));
 if(sort==="lowest")rows.sort((a,b)=>a.price-b.price);
 if(sort==="highest")rows.sort((a,b)=>b.price-a.price);
 if(sort==="name")rows.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
 return rows;
}
function checkoutUrl(p){
 if(p.active!==true||p.available!==true||!(p.price>0)||typeof p.checkout!=="string")return null;
 try{const u=new URL(p.checkout);return u.protocol==="https:"&&/(^|\.)yampi\.com\.br$/.test(u.hostname)?u.href:null}catch(_){return null}
}
function buyButton(p){const url=checkoutUrl(p);return url?'<a class="details-btn" href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">Comprar agora ↗</a>':'<button type="button" class="buy-disabled" disabled>Compra indisponível</button>'}
function reviewsFor(p){return (window.MIMOMIX_VERIFIED_REVIEWS?.[p.sku]||[]).filter(r=>r.approved===true&&r.verifiedPurchase===true&&Number.isInteger(r.stars)&&r.stars>=1&&r.stars<=5)}
function reviewLabel(p){const rows=reviewsFor(p);return rows.length?'★ '+(rows.reduce((n,r)=>n+r.stars,0)/rows.length).toFixed(1).replace('.',',')+' · '+rows.length+' avaliação(ões) verificadas':'☆☆☆☆☆ Sem avaliações verificadas'}
function render(){const rows=visible();$("visible-number").textContent=rows.length;$("fav-number").textContent=favorites.length;$("empty").hidden=rows.length>0;
 $("chips").innerHTML=categories.map(c=>'<button type="button" class="'+(c===category&&!favoritesOnly?"selected":"")+'" data-category="'+safe(c)+'">'+(c==="Todos"?"Todos":c)+'</button>').join("");
 document.querySelectorAll("#nav-links [data-category]").forEach(n=>n.classList.toggle("active",!favoritesOnly&&n.dataset.category===category));
 $("product-grid").innerHTML=rows.map((p,i)=>{
 const cc=colors[p.category]||["#5614ce","#ee3296"];
 const photo=p.marketingArtwork?"Imagem promocional ilustrativa":p.images?.length?"Foto do cadastro Yampi":"Arte ilustrativa";
 return '<article class="product"><div class="photo" style="--grad:linear-gradient(130deg,'+cc[0]+','+cc[1]+')"><div class="picture-card">'+image(p)+'</div><span class="badge">'+(i<7&&category==="Todos"&&sort==="featured"?"✨ DESTAQUE":"💜 MIMOMIX")+'</span><button type="button" class="heart '+(favorites.includes(p.id)?"selected":"")+'" aria-label="'+(favorites.includes(p.id)?"Remover dos favoritos":"Adicionar aos favoritos")+'" data-fav="'+safe(p.id)+'">'+(favorites.includes(p.id)?"♥":"♡")+'</button><span class="photo-note">'+photo+'</span></div>'+
 '<div class="details"><span class="cat">'+safe(p.category).toUpperCase()+'</span><h3>'+safe(p.name)+'</h3><p class="description">'+safe((p.description||"Produto do catálogo da MimoMix.").slice(0,105))+'</p>'+
 '<div class="stars">'+reviewLabel(p)+'</div>'+
 '<span class="price-caption">Preço cadastrado na Yampi</span><strong class="price">'+money(p.price)+'</strong>'+
 '<div class="actions"><button type="button" class="details-btn" data-product="'+safe(p.id)+'">Ver detalhes →</button>'+buyButton(p)+'</div></div></article>'
 }).join("");
}
function storeFavorites(){try{localStorage.setItem("mimomix_favorites",JSON.stringify(favorites))}catch(_){}}
function modal(p){const a=(p.images||[]).filter(u=>/^https:\/\/images\.yampi\.me\//.test(u));const picture=image(p,p.name);
 $("modal-body").innerHTML='<div class="modal-layout"><div><div class="modal-media">'+picture+'</div><small style="color:#8d79a5">'+(p.marketingArtwork?"Arte promocional ilustrativa":a.length?"Imagem do cadastro Yampi":"Arte ilustrativa; fotografia ainda não enviada")+'</small></div><div class="modal-info"><span class="section-label">'+safe(p.category)+'</span><h2>'+safe(p.name)+'</h2><p>SKU: '+safe(p.sku)+'</p><div class="stars">'+reviewLabel(p)+'</div><p class="modal-price">'+money(p.price)+'</p><p class="modal-note">Preço cadastrado na Yampi. Produto ativo no cadastro, porém ainda não disponível para venda na exportação consultada. Checkout pendente de validação.</p><div class="modal-tabs"><button type="button" data-tab="desc" class="active">Descrição</button><button type="button" data-tab="spec">Informações técnicas</button><button type="button" data-tab="video">Como funciona</button><button type="button" data-tab="rev">Avaliações e comentários</button></div><div class="modal-panel" id="modal-panel">'+safe(p.description||"Descrição do fornecedor em revisão")+'</div>'+buyButton(p)+'</div></div>';
 const dims=p.dimensions||{};
 const tabs={desc:safe(p.description||"Descrição sob revisão"),spec:'<strong>SKU:</strong> '+safe(p.sku)+'<br><strong>Peso cadastrado:</strong> '+(p.weight!=null?safe(p.weight)+" kg":"não informado")+'<br><strong>Dimensões cadastradas (A × L × C):</strong> '+[dims.height,dims.width,dims.length].map(x=>x!=null?safe(x):"—").join(" × ")+' cm<br><small>Dados informados no CSV e ainda sujeitos à conferência da embalagem.</small>',video:'<strong>Veja o aparelho funcionando</strong><p>O vídeo demonstrativo deste modelo será incluído quando disponibilizado pelo fornecedor ou autorizado pelo criador.</p>',rev:(reviewsFor(p).length?reviewsFor(p).map(r=>'<article><strong>'+safe('★'.repeat(r.stars))+' · '+safe(r.author)+'</strong><p>'+safe(r.comment)+'</p><small>Compra verificada</small></article>').join(''):'<strong>Ainda sem avaliações verificadas.</strong><p>Seja o primeiro a compartilhar sua experiência após receber o produto.</p>')+'<p><a href="https://t.me/+IRdPumLjRbNkMDc5" target="_blank" rel="noopener noreferrer">Comentar ou tirar dúvidas na comunidade MimoMix ↗</a></p><small>Informe o nome ou SKU do produto. Comentários da comunidade não são automaticamente avaliações de compra verificada.</small>'};
 $("modal-body").querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{$("modal-panel").innerHTML=tabs[btn.dataset.tab];$("modal-body").querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===btn))}));
 $("product-modal").showModal();
}
function renderCategories(){const count=c=>products.filter(x=>x.category===c).length;$("category-grid").innerHTML=categories.filter(x=>x!=="Todos").map(c=>'<button class="category-tile" data-category="'+safe(c)+'"><span class="emoji">'+emoji[c]+'</span>'+safe(c)+' <small style="color:#9a8aaa">'+count(c)+' itens</small></button>').join("")}
function setHero(){const withImages=products.filter(p=>p.images&&p.images.length>0);[1,2,3].forEach((n,i)=>{const el=$("hero-pic"+n),p=withImages[[0,2,1][i]];if(el&&p){el.innerHTML=image(p,p.name)}})}
function rotateHighlights(){if(document.hidden||!products.length)return;const p=products[Math.floor((Date.now()/23000)%products.length)];$("popup-picture").textContent=emoji[p.category]||"🎁";$("popup-name").textContent="✨ Achadinho em destaque";$("popup-copy").textContent=p.name;$("feature-popup").hidden=false;clearTimeout(window.mimoPop);window.mimoPop=setTimeout(()=>$("feature-popup").hidden=true,5500)}
async function load(){try{const response=await fetch("catalogo-yampi-publico.json?v=13",{cache:"no-store"});if(!response.ok)throw new Error("Erro HTTP "+response.status);const data=await response.json();if(!Array.isArray(data.products))throw new Error("Catálogo inválido");products=data.products.filter(p=>p.active===true&&typeof p.name==="string"&&Number.isFinite(p.price));renderCategories();setHero();render();}catch(e){$("product-grid").innerHTML='<div class="loading">Não foi possível carregar o catálogo. Tente atualizar a página.</div>';console.error(e)}}
document.addEventListener("click",e=>{const categoryBtn=e.target.closest("[data-category]"),favor=e.target.closest("[data-fav]"),det=e.target.closest("[data-product]"),camp=e.target.closest("[data-campaign]");
 if(categoryBtn){applyFilter(categoryBtn.dataset.category)}if(camp){applyFilter(camp.dataset.campaign)}
 if(favor){const id=favor.dataset.fav;favorites=favorites.includes(id)?favorites.filter(s=>s!==id):[...favorites,id];storeFavorites();render();toast(favorites.includes(id)?"Produto adicionado aos favoritos.":"Produto removido dos favoritos.")}
 if(det){const p=products.find(p=>p.id===det.dataset.product);if(p)modal(p)}
});
$("query").addEventListener("input",e=>{search=e.target.value.trim().toLocaleLowerCase("pt-BR");favoritesOnly=false;render()});
$("sort").addEventListener("change",e=>{sort=e.target.value;render()});
$("search-go").addEventListener("click",()=>$("produtos").scrollIntoView({behavior:"smooth"}));
$("fav-btn").addEventListener("click",()=>{favoritesOnly=!favoritesOnly;category="Todos";render();$("produtos").scrollIntoView({behavior:"smooth"});if(favoritesOnly&&!favorites.length)toast("Salve produtos clicando no coração.")});
$("cart-btn").addEventListener("click",()=>toast("O checkout da Yampi será habilitado após confirmar disponibilidade, frete e links oficiais."));
$("modal-close").addEventListener("click",()=>$("product-modal").close());
$("product-modal").addEventListener("click",e=>{if(e.target.id==="product-modal")e.target.close()});
$("popup-close").addEventListener("click",()=>{$("feature-popup").hidden=true;clearInterval(featureTimer);});
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)featureTimer=setInterval(rotateHighlights,28000);
load();
})();