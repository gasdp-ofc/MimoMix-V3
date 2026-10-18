# MimoMix — Próxima etapa: habilitar compras

## Situação atual em 18/10/2026

- O site é uma vitrine de pré-lançamento hospedada no GitHub Pages.
- Referências de preços em `supplier-prices.js` são **preços de varejo anunciados pela Droyp**, não seus preços de venda.
- Apenas custo Drop do massageador foi conferido em página pública (R$ 49,00; varejo do fornecedor R$ 69,90). Reconfirme antes de qualquer compra.
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
