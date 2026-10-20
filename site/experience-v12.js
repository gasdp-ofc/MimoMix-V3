/* MimoMix V12 — experiência de produto, frete transparente e provas de confiança reais */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let catalog=[];
const validPicture=s=>typeof s==="string"&&(/^https:\/\/images\.yampi\.me\//.test(s)||/^assets\/(?:promos\/[a-z0-9-]+\.(?:jpg|webp)|processador-portatil-ilustrativo\.svg)$/.test(s));
function assurance(){
 const listing=$("produtos");if(!listing||$("mm-assurance"))return;
 const section=document.createElement("section");section.className="container mm-assurance";section.id="mm-assurance";section.innerHTML=
 '<div class="mm-assurance-header"><div><span class="section-label">COMPRE COM CLAREZA</span><h2>Seu pedido, sem surpresas.</h2><p>Estamos preparando um checkout hospedado na Yampi. A compra somente será liberada após confirmar estoque, embalagem, frete real e os meios de pagamento.</p></div><span class="mm-assurance-tag">🔎 Operação em validação</span></div>'+
 '<div class="mm-steps"><article><span>📦</span><h3>Entrega com preço antes de pagar</h3><p>Quando as vendas forem abertas, a cotação de frete será exibida pelo checkout de acordo com CEP e regras logísticas validadas.</p></article><article><span>💳</span><h3>Pagamento em ambiente próprio</h3><p>Pix e cartão deverão ser processados pelo checkout do provedor. A MimoMix não pede dados de cartão nesta página.</p></article><article><span>🧾</span><h3>Produto com informação completa</h3><p>Fotos, peso, dimensões, prazos e disponibilidade serão conferidos antes de liberar qualquer compra.</p></article></div>'+
 '<details><summary>O frete por CEP já está funcionando?</summary><p>A integração Yampi–Melhor Envio está em validação. Não exibimos cotação simulada: a estimativa real será apresentada no checkout oficial quando os produtos forem liberados.</p></details>'+
 '<details><summary>Já posso concluir uma compra?</summary><p>A loja está em pré-lançamento. Os botões de compra permanecem desativados até a confirmação dos links oficiais, estoque, frete e pagamento.</p></details>'+
 '<details><summary>As avaliações e alertas de venda são reais?</summary><p>Somente publicaremos avaliações de compradores verificadas e registros de compras efetivas. Os avisos atuais são destaques do catálogo, não notificações de pedidos realizados.</p></details>'+
 '<details><summary>Onde posso tirar dúvidas?</summary><p>Confira as informações de cada produto e utilize os canais oficiais divulgados pela MimoMix. Dados de pagamento devem ser informados exclusivamente no checkout do provedor, nunca por mensagem.</p></details>';
 listing.after(section);
}
function artLabel(p){
 if(p.marketingArtwork) return "Arte promocional MimoMix";
 if((p.images||[]).length) return "Foto de cadastro do produto";
 return "Ilustração informativa";
}
function galleryAndPreview(){
 const body=$("modal-body");if(!body||body.querySelector(".mm-modal-extra"))return;
 const sku=body.textContent?.match(/SKU:\s*([^\s]+)/)?.[1];
 const p=catalog.find(x=>x.sku===sku); if(!p)return;
 const info=body.querySelector(".modal-info");if(!info)return;
 const wrap=document.createElement("div");wrap.className="mm-modal-extra";
 wrap.innerHTML='<h3>📦 Entrega e compra com transparência</h3>'+
 '<div class="mm-preview-grid"><span>✓ Produto individualizado</span><span>🔒 Checkout da plataforma parceira</span><span>🚚 Frete a confirmar por CEP</span></div>'+
 '<p>O produto ainda não está disponível para venda. A simulação abaixo não reserva estoque nem calcula frete; o valor real será informado no checkout da Yampi após a liberação das vendas.</p>'+
 '<label for="mm-cep-input">CEP de entrega (pré-validação do formato)</label>'+
 '<div class="mm-cep-row"><input inputmode="numeric" maxlength="9" autocomplete="postal-code" id="mm-cep-input" placeholder="00000-000" aria-describedby="mm-cep-status"><button type="button" id="mm-cep-check">Verificar CEP</button></div>'+
 '<p class="mm-cep-message" id="mm-cep-status" role="status"></p>'+
 '<p><strong>Importante:</strong> o preço do frete e o prazo dependem da origem do fornecedor e do peso e dimensões reais da embalagem. Nenhuma cobrança acontece nesta vitrine.</p>';
 const buy=info.querySelector(".buy-disabled, a.details-btn:last-child"); if(buy)buy.before(wrap);else info.append(wrap);
 wrap.querySelector("#mm-cep-check").addEventListener("click",()=>{
 const value=wrap.querySelector("#mm-cep-input").value.replace(/\D/g,"");
 const out=wrap.querySelector("#mm-cep-status");
 if(!/^\d{8}$/.test(value)){out.textContent="Informe um CEP válido com 8 dígitos.";return;}
 out.textContent="Formato de CEP válido. Cotação de frete indisponível nesta prévia — será calculada no checkout quando as vendas forem liberadas.";
 });
 wrap.querySelector("#mm-cep-input").addEventListener("input",e=>{let d=e.target.value.replace(/\D/g,"").slice(0,8);e.target.value=d.length>5?d.slice(0,5)+"-"+d.slice(5):d;});
 const media=body.querySelector(".modal-media");if(!media)return;
 const urls=[];
 if(validPicture(p.marketingArtwork))urls.push({src:p.marketingArtwork,label:"Arte MimoMix"});
 for(const src of p.images||[])if(validPicture(src)&&!urls.some(x=>x.src===src))urls.push({src,label:"Foto do catálogo"});
 if(urls.length<2)return;
 const thumbs=document.createElement("div");thumbs.className="mm-gallery-extras";thumbs.setAttribute("aria-label","Galeria do produto");
 urls.slice(0,6).forEach((u,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Visualizar "+u.label+" "+(i+1));b.className=i===0?"active":"";const im=document.createElement("img");im.src=u.src;im.alt=u.label;b.append(im);b.addEventListener("click",()=>{let main=media.querySelector("img.product-visual");if(!main){main=document.createElement("img");main.className="product-visual promo-art";media.append(main);}main.src=u.src;main.alt=u.label+" — "+p.name;main.style.display="block";thumbs.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));});thumbs.append(b);});
 media.after(thumbs);
}
async function loadCatalog(){try{const r=await fetch("catalogo-yampi-publico.json?v=14",{cache:"no-store"});if(r.ok){const j=await r.json();if(Array.isArray(j.products))catalog=j.products;}}catch(_){}
}
function initialize(){
 assurance();
 const parent=$("product-modal");const body=$("modal-body");
 if(body){new MutationObserver(()=>galleryAndPreview()).observe(body,{childList:true});}
 const review=$("avaliacoes");if(review){review.querySelector("p")?.setAttribute("data-review-policy","real-only");}
 const popup=$("feature-popup");if(popup){popup.setAttribute("aria-label","Destaque do catálogo MimoMix, não registro de compra");const small=popup.querySelector("small");if(small)small.textContent="Sugestão de produto · nenhuma compra foi simulada";}
 if(parent) parent.setAttribute("aria-label","Informações e prévia de compra do produto");
 loadCatalog().then(()=>galleryAndPreview());
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize);else initialize();
})();