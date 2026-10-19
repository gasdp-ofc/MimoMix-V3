# Artes promocionais — MimoMix

O layout e a associação das artes aos SKUs já estão configurados. O catálogo lê os arquivos de `site/assets/promos/slug.webp` para 10 SKUs e, quando não disponíveis, volta automaticamente para a foto do cadastro Yampi ou para uma arte provisória.

**Atenção:** os binários dessas artes não foram enviados automaticamente pela API do GitHub. Para concluir, extrair o pacote `MimoMix_10_Artes_Integracao_GitHub.zip` fornecido no chat e colocar os dez arquivos WebP em `site/assets/promos/` no repositório. O caminho e o nome precisam ser mantidos. A partir daí o site passa a renderizar as imagens imediatamente no deploy, sem alterar o código novamente.

As artes são conceituais, não fotos garantidas dos modelos reais. As áreas com descontos não verificados, avaliações, contagens de vendas e preços foram retiradas do recorte. A página mantém os preços cadastrados e informa quando não há avaliações verificadas. O checkout continua bloqueado enquanto o fornecedor não confirmar estoque, frete e checkout.

Atualizado em 2026-10-19.
