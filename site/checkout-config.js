// Configuração pública de links externos de pagamento.
 // Não coloque tokens, chaves privadas nem credenciais neste arquivo.
 // Os links de checkout precisam pertencer à SUA loja e estar realmente operacionais.
window.MIMOMIX_CHECKOUT = Object.freeze({
  enabled: false,
  provider: null, // Ex.: "Yampi", após a conexão
  productLinks: Object.freeze({}) // id do catálogo: "https://sua-loja/.../checkout"
});
