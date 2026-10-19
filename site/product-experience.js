
/* MimoMix V8 product detail gallery.
 * Não publicar avaliações inventadas, estrelas de nota, vídeos de terceiros sem licença ou vendas fictícias.
 */
(function(){
"use strict";
const catalogImages={
  massageador:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=750&q=80",
  marmita:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=750&q=80",
  abelha:"produto-abelha.svg",
  hub:"produto-hub-usb.svg",
  bluetooth:"produto-receptor-bluetooth.svg",
  adaptador:"produto-adaptador-viagem.svg",
  p2:"produto-adaptador-p2.svg",
  game:"charger-xbox.svg",
  abridor:"produto-abridor-vinho.svg",
  camera:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=750&q=80"
};
const gallery={
 game:[
  {src:"charger-xbox.svg",alt:"Base carregadora com duas baterias — arte ilustrativa",label:"Visão do kit"},
  {src:"xbox-batteries.svg",alt:"Duas baterias recarregáveis — ilustração",label:"Duas baterias"},
  {src:"xbox-dock-detail.svg",alt:"Baterias posicionadas na base — ilustração",label:"Carregamento"}
 ]
};
const productInfo={
  game:{
    sku:"AKY-DOC-VIDEOGAME-1",
    intro:"Recarregue as baterias compatíveis com controles Xbox Series S e Series X utilizando uma base compacta, com espaço para duas unidades.",
    details:[
      "Kit informado pelo fornecedor: 1 base carregadora, 2 baterias recarregáveis de 1200 mAh e 1 cabo USB.",
      "Indicadores luminosos de status de recarga. Confirme tipo de conector, compatibilidade e manual do modelo antes da publicação.",
      "O peso (0,600 kg) e as dimensões (16 × 7 × 21 cm) cadastrados foram obtidos como referência de produto semelhante; a embalagem da Droyp ainda precisa ser confirmada."
    ],
    specs:[["Referência do fornecedor","AKY-DOC-VIDEOGAME-1"],["Categoria","Games"],["Conteúdo","Base + 2 baterias + cabo"],["Capacidade indicada","1200 mAh por bateria"],["Peso e medidas","Referenciais; não validados pela Droyp"],["Situação","Inativo / pré-lançamento"]],
    price:159.90,
    animation:"xbox-demo.svg"
  },
  bluetooth:{intro:"Acessório para conexão de áudio Bluetooth. Confira o tipo de saída e a compatibilidade antes de comprar.",details:["Imagem editorial ilustrativa. Modelo, conectores e especificações finais aguardam conferência no catálogo Drop."],specs:[["Situação","Em validação"]] },
  abelha:{intro:"Brinquedo com recursos de luz e som. Classificação etária, certificação e identificação do modelo ainda precisam ser verificadas.",details:["Antes da venda, confirme a certificação exigida para brinquedos, idade recomendada, alimentação e conteúdo da embalagem."],specs:[["Situação","Aguardando certificação e dados logísticos"]]},
  hub:{intro:"Hub para ampliar possibilidades de conexão USB. Verifique a quantidade de portas, alimentação, padrão USB e compatibilidade.",details:["Produto sujeito à confirmação de modelo, portas, conexões e embalagem."],specs:[["Situação","Em validação"]]}
};
const safe=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
// Apenas dados de compras confirmadas e autorizados poderão ser incluídos.
const verifiedReviews=Object.freeze(window.MIMOMIX_VERIFIED_REVIEWS||{});
window.MIMOMIX_REVIEW_RECORDS=verifiedReviews;
window.openProduct=function(id){
 if(typeof catalog==="undefined")return;
 const p=catalog.find(item=>item.id===id);if(!p)return;
 const box=document.getElementById("dialog-body"),dlg=document.getElementById("product-dialog");if(!box||!dlg)return;
 const info=productInfo[id]||{};
 const official=(window.MIMOMIX_PUBLIC_PRODUCT_IMAGES||{})[id];
 const pics=gallery[id]||[{src:official||catalogImages[id]||"mimomix-brand.svg",alt:official?"Foto autorizada do produto":"Imagem ilustrativa, não fotografia validada do SKU",label:official?"Foto do produto":"Imagem ilustrativa"}];
 const reviews=Array.isArray(verifiedReviews[id])?verifiedReviews[id].filter(r=>r.approved===true&&r.verifiedPurchase===true):[];
 const stars=reviews.length?reviews.reduce((sum,r)=>sum+r.stars,0)/reviews.length:null;
 const availablePay=typeof checkoutHref==="function"?checkoutHref(id):null;
 const labels=reviews.length?'<span style="color:#df990a">'+safe("★".repeat(Math.max(1,Math.round(stars)))+"☆".repeat(5-Math.round(stars)))+'</span> '+stars.toFixed(1).replace(".",",")+' de 5 · '+reviews.length+' avaliação(ões) verificadas':'<span class="mm-empty-stars" aria-hidden="true">☆☆☆☆☆</span> Sem avaliações verificadas';
 const spec=(info.specs||[["Categoria",p.category],["Situação","Em validação"]]).map(([k,v])=>'<span><b>'+safe(k)+'</b>'+safe(v)+'</span>').join("");
 const detailList=(info.details||["Detalhes técnicos completos em validação com o fornecedor."]).map(s=>'<li>'+safe(s)+'</li>').join("");
 const price=info.price?'<strong>'+money(info.price)+'</strong><small>Preço provisoriamente cadastrado na Yampi. Produto inativo: compra não liberada.</small>':'<strong style="font-size:24px;color:#5c3984">Preço em preparação</strong><small>Sem preço final validado para venda.</small>';
 const buy=availablePay?'<a class="mm-buy-link" target="_blank" rel="noopener noreferrer" href="'+safe(availablePay)+'">Comprar com checkout seguro ↗</a>':'<div class="mm-checkout-off">🔒 Compra indisponível até confirmação de estoque, frete e pagamento.</div>';
 const tabs=['Descrição','Ficha técnica','Vídeo / Demonstração','Avaliações'].map((t,i)=>'<button type="button" class="mm-tab" role="tab" aria-selected="'+(i===0?'true':'false')+'" data-tab="'+i+'">'+t+'</button>').join("");
 const videoContent=info.animation?'<div class="mm-demo-box"><img src="'+safe(info.animation)+'" alt="Animação ilustrativa de duas baterias e a base carregadora"><p>Demonstração ilustrativa em movimento. Não é filmagem real do produto. Substituiremos por vídeo oficial autorizado quando disponível.</p></div>':'<div class="mm-demo-box"><p>Vídeo oficial do produto ainda não disponibilizado. Quando o fornecedor autorizar uma demonstração real, ela será publicada nesta área.</p></div>';
 const userReviews=reviews.length?reviews.map(r=>'<div class="mm-reviews"><div class="mm-star-row">'+safe("★".repeat(r.stars)+"☆".repeat(5-r.stars))+'</div><b>'+safe(r.author)+'</b><p>'+safe(r.comment)+'</p><small>Compra verificada</small></div>').join(""):'<div class="mm-reviews"><div class="mm-star-row" aria-hidden="true">☆☆☆☆☆</div><b>Ainda não há avaliações de compradores verificadas.</b><p>Comentários e notas serão exibidos após compras reais e autorização para publicação. Não usamos depoimentos ou notas fictícias.</p></div>';
 box.innerHTML='<div class="mm-details"><div class="mm-details-layout"><div class="mm-media-col"><div class="mm-gallery-main" id="mm-gallery-main"><img src="'+safe(pics[0].src)+'" alt="'+safe(pics[0].alt)+'"><span class="mm-illustrative">Imagem ilustrativa</span></div><div class="mm-thumbs" id="mm-thumbs">'+pics.map((x,i)=>'<button type="button" data-picture="'+i+'" aria-label="'+safe(x.label)+'" aria-pressed="'+(i===0?'true':'false')+'"><img src="'+safe(x.src)+'" alt="'+safe(x.label)+'"></button>').join("")+'</div><p style="font-size:10px;color:#8c79a0;margin:11px 0">Fotos oficiais do SKU serão incluídas após conferência e autorização de uso.</p></div><div class="mm-detail-summary"><span class="mm-small-title">✦ '+safe(p.category)+' · MimoMix</span><h2>'+safe(p.name)+'</h2><div class="mm-review-teaser">'+labels+'</div><p class="mm-sku">'+(info.sku?'SKU fornecedor: '+safe(info.sku)+' · ':'')+'Produto em validação</p><p class="mm-summary">'+safe(info.intro||p.summary)+'</p><div class="mm-detail-price">'+price+'</div>'+buy+'<p class="mm-summary">📦 Entrega: frete e disponibilidade sujeitos à confirmação com a Droyp. A loja ainda não processa pedidos deste produto.</p></div></div><section class="mm-detail-contents"><div class="mm-tabs" role="tablist" aria-label="Detalhes do produto">'+tabs+'</div><div class="mm-tab-panel" role="tabpanel" data-panel="0"><h3>Conheça o produto</h3><p>'+safe(info.intro||p.summary)+'</p><ul style="padding-left:21px;line-height:1.9;color:#665575;font-size:12px">'+detailList+'</ul></div><div class="mm-tab-panel" role="tabpanel" data-panel="1" hidden><h3>Ficha técnica</h3><div class="mm-spec-grid">'+spec+'</div></div><div class="mm-tab-panel" role="tabpanel" data-panel="2" hidden><h3>Vídeo e demonstração</h3>'+videoContent+'</div><div class="mm-tab-panel" role="tabpanel" data-panel="3" hidden><h3>Avaliações dos clientes</h3>'+userReviews+'</div></section></div>';
 box.querySelector("#mm-thumbs").addEventListener("click",e=>{
    const btn=e.target.closest("[data-picture]");if(!btn)return;
    const i=Number(btn.dataset.picture);const photo=pics[i];if(!photo)return;
    const main=box.querySelector("#mm-gallery-main");const img=main.querySelector("img");
    img.src=photo.src;img.alt=photo.alt;
    box.querySelectorAll("[data-picture]").forEach(x=>x.setAttribute("aria-pressed",String(x===btn)));
 });
 box.querySelector(".mm-tabs").addEventListener("click",e=>{
   const btn=e.target.closest("[data-tab]");if(!btn)return;
   const index=btn.dataset.tab;
   box.querySelectorAll("[data-tab]").forEach(el=>el.setAttribute("aria-selected",String(el.dataset.tab===index)));
   box.querySelectorAll("[data-panel]").forEach(el=>{el.hidden=el.dataset.panel!==index});
 });
 if(!dlg.open)dlg.showModal();
};
})();
