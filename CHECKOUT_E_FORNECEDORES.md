# MimoMix — Checkout e operação manual Droyp

Verificação: 18/10/2026. Este repositório é público: não registrar custos privados de aquisição, margens internas, dados de clientes, documentos, credenciais ou tokens.

## Estado confirmado

- A MimoMix continua em pré-lançamento. A conexão do provedor de pagamento não equivale à autorização para publicar produtos ou liberar vendas.
- O Mercado Pago foi vinculado pelo proprietário na Yampi. Pix, Visa, Mastercard, Elo e American Express aparecem associados à afiliação.
- O Pix está ativo na configuração da Yampi, com expiração de 30 minutos. A existência de uma chave Pix cadastrada e válida no Mercado Pago ainda precisa ser confirmada.
- O cadastro de faturamento da Yampi está incompleto e bloqueia o acesso à página de assinatura. O proprietário deve concluir seus dados no painel; qualquer etapa de cartão, contratação ou cobrança precisa de revisão antes da confirmação.
- O kit Xbox foi salvo e confirmado como INATIVO. O SKU está indisponível para venda.
- O checkout do site permanece desativado em `site/checkout-config.js`, sem links de compra publicados.
- Não foi concluída nenhuma compra de teste nem marcado pedido como pago.

## Produto de teste

**Kit 2 Baterias + Base Carregadora Compatível com Xbox Series S/X**

- SKU Droyp: `AKY-DOC-VIDEOGAME-1`.
- Categoria Yampi: Games.
- Descrição e termos de pesquisa cadastrados.
- Marca temporária: Não informada; confirmar fabricante ou marca comercial.
- Preço final pendente. O valor zerado no rascunho não constitui oferta.
- Custo e estoque consultados na Droyp, sem sincronização automática com a Yampi.
- Fotos, direitos de uso, peso embalado, dimensões da embalagem, NCM e condições fiscais ainda precisam de validação.

A ficha pública comparável da Akymotech apresenta SKU `DOC-VIDEOGAME-1`, peso de 0,6 kg e dimensões de 16 × 7 × 21 cm. Entretanto, mostra EAN `7895821425391` no cabeçalho e `7896616255124` na descrição. Este último aparece na descrição da Droyp e foi copiado para o rascunho. Confirmar o código do item efetivamente expedido e se as medidas incluem embalagem antes de usar esses dados na logística. Não substituir os dados do rascunho por uma suposição.

A arte `site/charger-xbox.svg` continua sendo ilustrativa. Fotos de catálogo só devem ser publicadas após autorização de uso.

## Frete e fornecedores

Há um frete simplificado preexistente na Yampi chamado “CORREIOS - Prazo de 2 a 4 semanas”, com prazo configurado de 19 dias. Ele não comprova cotação por CEP a partir da origem do fornecedor. Não utilizá-lo como frete validado do kit.

A origem informada na ficha Droyp do kit é Centro, São Paulo/SP. Consultar o endereço e CEP do produto a cada cotação; não usar o endereço pessoal da loja nem a sede da plataforma por padrão.

No painel Droyp consultado, o VIP está inativo. As integrações anunciadas são Bling, Tiny, Mercado Livre, Shopee e Nuvemshop, com conexões e exportações destinadas ao VIP. Não foi encontrada integração nativa gratuita Droyp ↔ Yampi nas opções verificadas. Não foi contratado plano.

A Droyp informa separação e envio pelo fornecedor, embalagem neutra e rastreamento no painel. O prazo específico de postagem do kit, a emissão fiscal aplicável, o endereço de devolução e o custo de logística reversa ainda dependem de confirmação.

## Formação do preço — controle privado

Para um pedido com uma unidade:

```text
Resultado por pedido =
preço do produto + frete cobrado do cliente
− aquisição atualizada
− frete efetivamente pago e custos de expedição
− tarifas Yampi e Mercado Pago
− tributos aplicáveis
− publicidade
− reserva de trocas, devoluções e chargebacks
− outros custos variáveis
```

Apurar também os custos fixos mensais antes de chamar o resultado de lucro líquido.

A tabela pública da Yampi informa mensalidade gratuita e tarifa de 2,5% no Basic. O plano e as condições efetivos desta conta ainda precisam de confirmação após completar o cadastro. Somar a tarifa do Mercado Pago correspondente ao meio de pagamento, prazo de recebimento e parcelamento escolhidos. Não estimar tributos como zero por falta de informação.

Não anunciar desconto sem preço anterior real e verificável. Não publicar o custo de aquisição como preço de venda.

## Procedimento manual de pedidos

**Este procedimento só entra em operação após aprovação do lançamento. Nenhum pedido real está autorizado por este documento.**

1. Antes de aceitar vendas, validar produto, preço, estoque, frete, prazos, fotos, documentos fiscais e atendimento. Confirmar o fluxo de pagamento em ambiente apropriado.
2. Para um pedido recebido, consultar o status diretamente na Yampi e no Mercado Pago. Comprovante enviado pelo comprador não substitui aprovação do provedor.
3. Reconfirmar SKU, quantidade, custo, disponibilidade, origem e prazo na Droyp. Se houver divergência, resolver antes de pagar o fornecedor ou prometer expedição.
4. Preparar o pedido na modalidade dropshipping com os dados de entrega necessários do cliente. Cotar o frete com a origem correta. Confirmar se será utilizada etiqueta própria ou transporte contratado na Droyp, evitando pagar frete duas vezes.
5. Conferir produto, endereço, frete, total e responsabilidade fiscal. Pagar o fornecedor somente dentro da autorização de compra concedida pelo proprietário para aquele pedido.
6. Registrar a correspondência entre os pedidos da Yampi e da Droyp em controle privado. Anexar a etiqueta quando aplicável e acompanhar a confirmação da postagem.
7. Levar o rastreamento correto à Yampi e acompanhar a entrega. Tratar atraso, troca, devolução e reembolso nos canais oficiais.
8. Compartilhar dados do cliente somente no fluxo necessário à execução da entrega e manter esses registros fora do GitHub.

## Dados a confirmar com o fornecedor

- Marca, SKU e EAN do lote expedido.
- Peso bruto e comprimento, largura e altura da embalagem de envio.
- Fotos oficiais e autorização de uso nos anúncios da MimoMix.
- NCM e emissão dos documentos fiscais: emissor, destinatário e fluxo aplicável à revenda.
- Prazo de separação e postagem, corte diário e tratamento de indisponibilidade.
- Frete por CEP, origem correta e aceitação de etiqueta gerada pela loja.
- Rastreio e comunicação de postagem.
- Processo de devolução, endereço de retorno, responsabilidades pelo frete e atendimento de defeitos.

## Validação antes de liberar o site

- Concluir o cadastro da Yampi e confirmar plano, tarifas e condições de cobrança.
- Confirmar a chave Pix na conta Mercado Pago e as condições de cartão.
- Corrigir a logística com dados reais da embalagem e testar cotações por CEP.
- Revisar preço final e margem por meio de pagamento.
- Validar o link oficial do produto e testar a navegação sem concluir transação.
- Não marcar pedido manualmente como pago para simular teste: a Yampi informa que isso também gera tarifa.
- Qualquer teste com cobrança precisa de aprovação prévia do proprietário, com valor e método definidos.
- Somente após aprovação de publicação e vendas: ativar o produto, configurar seu link oficial no site e habilitar os botões.
- Instagram, Telegram e publicações automáticas permanecem pendentes; a primeira ativação depende de aprovação.

## Fontes consultadas

- Produto Droyp: https://droyp.com.br/produtos/9010000295690
- Operação Droyp: https://droyp.com.br/como-funciona
- Integrações Droyp: https://droyp.com.br/integracoes
- Política da plataforma: https://droyp.com.br/termos-de-uso
- Trocas e devoluções do fornecedor: https://droyp.com.br/politica-de-troca-e-devolucao
- Ficha comparável Akymotech: https://akymotech.com.br/produto/2-baterias-base-carregador-compativel-com-xbox-series-s-x/
- Pix na Yampi/Mercado Pago: https://help.yampi.com.br/pt-BR/articles/6067075-como-configurar-o-pix-no-mercado-pago
- Planos e tarifas Yampi: https://help.yampi.com.br/pt-BR/articles/8843537-quais-os-planos-e-taxas-da-yampi

Informações de catálogo, planos, tarifas e disponibilidade podem mudar. Os estados da conta foram conferidos pelo proprietário ou pelo painel autenticado durante a configuração.
