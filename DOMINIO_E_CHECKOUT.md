# MimoMix — Checkout e domínio profissional

## Hospedagem atual
- Site: https://gasdp-ofc.github.io/MimoMix-V3/
- GitHub Pages hospeda HTML, CSS e JavaScript; não gerencia pedidos, fretes, dados de cartão ou pagamentos.
- Usar um domínio .com.br NÃO exige migrar os arquivos para hospedagem paga. Consulte disponibilidade e registre por conta própria no https://registro.br/.

## Domínio
1. Verificar domínio desejado (por exemplo, lojamimomix.com.br — disponibilidade não consultada nem garantida).
2. O Registro.br informa taxa padrão anual de R$ 40.
3. Com domínio registrado, abrir Settings > Pages > Custom domain e configurar no provedor DNS os registros indicados pela documentação GitHub.
4. Habilitar HTTPS; não apontar DNS para domínio alheio e nunca afirmar domínio disponível sem checagem.

Documentação: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Venda real por checkout hospedado
Plataforma sugerida: Yampi Basic, plano sem mensalidade, taxa de 2,5% por pedido pago além das taxas do processador.
1. Criar conta e validar disponibilidade de gateway, Pix/cartão e requisitos de pessoa física/jurídica.
2. Cadastrar produtos individualmente com fotos oficiais autorizadas, SKUs, pesos, medidas, política fiscal e frete compatível com origem do fornecedor.
3. Gerar um link de pagamento por produto via Yampi > Vendas > Link de pagamento > +Novo Link, ou usar checkout de catálogo com URLs oficiais.
4. Depois de validar o link e um pedido de teste real, atualizar `site/checkout-config.js`, colocar `enabled: true` e fornecer `productLinks[id]`. O front-end somente mostra ação de compra se houver HTTPS configurado.
5. Enviar manualmente pedido confirmado à Droyp com endereço do cliente, conferir origem/etiqueta, rastreamento e nota. Automatizar depois com integração oficial permitida.
6. Acompanhar prazos, trocas, cancelamentos, chargebacks e impostos.

Fontes oficiais:
- https://www.yampi.com.br/planos
- https://help.yampi.com.br/pt-BR/articles/13057071-como-criar-um-link-de-pagamento-na-yampi
- https://help.yampi.com.br/pt-BR/articles/6067634-como-cadastrar-um-produto
- https://droyp.com.br/como-funciona

**Segurança**: nunca colocar API keys, tokens de Instagram/Telegram, credenciais de gateway, dados pessoais ou valores comerciais privados em um repositório público. Somente checkout HTTPS hospedado e aprovado.

## Catálogo completo Droyp
O link público não concedeu uma listagem integral acessível e verificável de todos os SKUs. Para comparar todo o catálogo, é necessário export CSV/XLSX autorizado pelo fornecedor com código SKU, custo de revenda, fotos, disponibilidade, dimensões, expedição e frete. Não contratar VIP só para análise antes de verificar se exportação gratuita é oferecida.
