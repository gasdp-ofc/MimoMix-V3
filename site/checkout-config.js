// MimoMix — links públicos de checkout hospedado.
// Produto Xbox está INATIVO na Yampi e frete/logística ainda usam dados provisórios.
// Nunca publicar chaves secretas, CPF, tokens ou dados de clientes aqui.
window.MIMOMIX_CHECKOUT = Object.freeze({
  enabled: false, // segurança: liberar apenas depois de validar ponta a ponta
  provider: "Yampi",
  productLinks: Object.freeze({
    game: "https://mimo-mix2.pay.yampi.com.br/r/4O2B61C2UX"
  })
});
