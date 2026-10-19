# MimoMix — como importar produtos reais da Yampi

Atualização: 19/10/2026.

## Situação atual

O site tem dez produtos de pré-lançamento e está preparado para receber preços, estoque, fotos autorizadas, avaliações reais e links oficiais da Yampi. **Ainda não há checkout habilitado.** No repositório só existe registro verificável do kit Xbox, que permanece inativo com preço provisório de R$ 159,90. Não divulgar essa oferta como disponível.

O site carrega `site/catalogo-yampi.json`. O arquivo é público: só cadastrar nele preço de venda aprovado, nome, descrição pública, categoria, foto com uso autorizado e URL de checkout público. **Nunca** incluir preço privado de aquisição, CPF, tokens de API, documentos, dados de clientes ou credenciais.

### Campos de um item

```json
{
  "id": "sku-exemplo",
  "name": "Nome público do produto",
  "description": "Descrição revisada",
  "category": "Tecnologia",
  "sku": "SKU_PUBLICO",
  "price": 129.9,
  "priceKind": "final",
  "status": "active",
  "approvedForSale": true,
  "shippingVerified": true,
  "stockVerified": true,
  "checkoutUrl": "https://SUA-LOJA.pay.yampi.com.br/r/LINK_VALIDADO",
  "showInCatalog": true
}
```

Os booleanos `approvedForSale`, `shippingVerified` e `stockVerified` **somente** devem ser marcados true depois de confirmação real. O front-end exige também URL HTTPS oficial da Yampi; nenhum placeholder é liberado automaticamente. O arquivo `site/checkout-config.js` permanece desativado por padrão, e os links são mantidos desabilitados até a checagem comercial e logística completa.

## Exportar do painel

1. Faça login em https://app.yampi.com.br/ .
2. Abra **Produtos**. Use **Exportar** para gerar o catálogo completo, sem filtros; o link da planilha é enviado por e-mail e/ou disponibilizado no painel.
3. Se a conta ainda usa o exportador anterior, em **Produtos > Ver todos > Configurações** selecione separadamente os modelos **Produtos** e **SKUs**.
4. Baixe as planilhas e envie os arquivos diretamente na conversa com o ChatGPT, evitando compartilhar dados de clientes ou senhas. O preço de custo pode estar na planilha de SKUs: esse campo deve ficar fora do GitHub público.
5. Antes de publicar preços, valide estoque, foto do SKU, peso/medidas embaladas, frete, NCM, checkout e atendimento.

Documentação oficial:
- https://help.yampi.com.br/pt-BR/articles/16603247-como-exportar-produtos-via-planilha
- https://help.yampi.com.br/pt-BR/articles/6067655-como-exportar-os-produtos

## Avaliações e pop-ups

A estrutura de avaliações está em `site/verified-reviews.js`: deve conter somente avaliações de clientes reais, autorizadas e com compra confirmada, registradas com campos `approved`, `verifiedPurchase`, `stars` e `comment`. O site não atribui nota 5 estrelas ou depoimentos a produtos não avaliados.

A notificação rotativa do rodapé é um **destaque editorial do catálogo**, não afirma que alguém comprou. Mostrar pedidos reais exigiria eventos de pedido pagos enviados com segurança por uma integração de backend, sem expor dados pessoais.

## Como publicar

A pasta publicada pelo Netlify/GitHub Pages é `site`. Atualize os arquivos na branch `main`; o workflow `pages.yml` pode publicar automaticamente quando o Pages estiver configurado para usar GitHub Actions.
