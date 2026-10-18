# MimoMix — Próxima etapa: habilitar compras

## Situação atual em 18/10/2026

- O site é uma vitrine de pré-lançamento hospedada no GitHub Pages.
- `supplier-prices.js` guarda apenas referências e status públicos; não expõe valores de aquisição. O número mostrado no painel Droyp pode ser o custo de revenda, não o preço que o consumidor pagará.
- O painel do revendedor informou o custo por unidade do kit 2 baterias + base carregadora compatível com Xbox Series S/X (SKU AKY-DOC-VIDEOGAME-1) e estoque naquele momento. Por segurança comercial, o custo de aquisição não é publicado neste repositório público. Reconfirmar estoque e custo a cada pedido.
- As imagens atuais são ilustrativas. Não é correto apresentá-las como fotos específicas dos SKUs da Droyp.
- A origem, custo real, estoque, prazo e cálculo do frete por CEP precisam ser confirmados pelo fornecedor.
- Descontos devem ser calculados com histórico/preço anterior real da MimoMix, jamais com valores fictícios.
- O GitHub Pages não processa pagamentos, não protege chaves secretas e não calcula frete usando acesso privado.

## Para ativar checkout, precisamos

1. Criar/confirmar uma conta própria na Yampi ou plataforma que ofereça checkout hospedado.
2. Confirmar habilitação de pagamentos (CPF/CNPJ, antifraude, Pix/cartão conforme plataforma).
3. Validar SKU, fornecedor, custo Drop, embalagem, nota, origem e frete por CEP.
4. Fazer pedido teste real com entrega em endereço próprio e verificar rastreamento.
5. Cadastrar cada produto na plataforma, com preço anunciado, foto oficial autorizada, descrição completa, estoque controlado, frete e políticas.
6. Associar links individuais ao arquivo `checkout-config.js` e, após testar, habilitar os botões no front-end.

**Não coloque chaves de API, token de Telegram/Instagram, senhas, CPF, documentos ou dados de cartão no repositório público.**

## Fonte de pesquisa

- https://droyp.com.br/produtos?categoria=microwear
- https://www.droyp.com.br/produtos/16328099538
- https://droyp.com.br/como-funciona

Data de consulta pública: 18/10/2026. As informações são sujeitas a alteração.

## Comparativo do kit Xbox

- Pesquisa de preço de concorrentes: anúncios de kits comparáveis em várias faixas; nem sempre são o mesmo modelo ou têm os mesmos termos de entrega.
- Comparar também a Akymotech: https://akymotech.com.br/produto/2-baterias-base-carregador-compativel-com-xbox-series-s-x/ (preço "a partir" depende de modalidade e condições, não tratar como custo unitário de dropshipping confirmado).
- Não habilitar checkout do kit até calcular frete real, custo de aquisição atualizado, tarifa de pagamento, CAC, tributos, políticas e custo de devolução.
- A arte `site/charger-xbox.svg` é ilustrativa, não foto do SKU. Substituir por foto oficial somente com autorização de uso pelo fornecedor.
