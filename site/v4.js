
/* Fotos de referência/editoriais, não fotos validadas dos itens do fornecedor */
(function(){
  "use strict";
  const unsplash=(id,w=560)=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w="+w+"&q=82";
  const images={
   massageador:unsplash("photo-1540555700478-4be289fbecef"),
   marmita:unsplash("photo-1547592180-85f173990554"),
   abelha:"produto-abelha.svg",
   hub:"produto-hub-usb.svg",
   bluetooth:"produto-receptor-bluetooth.svg",
   adaptador:"produto-adaptador-viagem.svg",
   p2:"produto-adaptador-p2.svg",
   game:"charger-xbox.svg",
   abridor:"produto-abridor-vinho.svg",
   camera:unsplash("photo-1503376780353-7e6692767b70")
  };
  function withFallback(img,box,cssClass){
    img.onerror=()=>{box.classList.add(cssClass)};
    if(img.complete&&img.naturalWidth===0)box.classList.add(cssClass);
  }
  // Cada atualização de filtros recompõe cartões, então decoramos também os novos.
  const grid=document.getElementById("product-grid");
  if(grid){
    function decorate(){
      for(const card of grid.querySelectorAll(".product-card")){
        const id=card.querySelector("[data-open]")?.dataset.open,wrap=card.querySelector(".product-picture");
        if(!id||!wrap||wrap.querySelector("img.product-photo"))continue;
        const image=document.createElement("img");
        const approved=(window.MIMOMIX_PUBLIC_PRODUCT_IMAGES||{})[id];
        const imageSrc=approved||(window.MIMOMIX_EDITORIAL_IMAGES||{})[id]||images[id];
        if(!imageSrc)continue;
        image.src=imageSrc;
        image.alt=approved?"Foto autorizada do produto":"Arte ilustrativa MimoMix, não é fotografia do produto ofertado";
        image.loading="lazy";image.className="product-photo";
        withFallback(image,wrap,"photo-failed");
        wrap.insertBefore(image,wrap.querySelector(".em"));
        const note=document.createElement("span");note.className="photo-label";note.textContent=approved?"Foto autorizada":"Arte ilustrativa";
        wrap.appendChild(note);
      }
    }
    decorate();
    new MutationObserver(decorate).observe(grid,{childList:true});
  }
  for(const box of document.querySelectorAll(".hero-photo")){
     const image=box.querySelector("img");
     if(image)withFallback(image,box,"fallback");
  }
  for(const box of document.querySelectorAll(".cat-emoji")){
     const image=box.querySelector("img");
     if(image)withFallback(image,box,"photo-failed");
  }
})();
