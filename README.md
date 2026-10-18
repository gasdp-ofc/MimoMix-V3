# MimoMix V3 — Loja de variedades

Site em pré-lançamento com catálogo, categorias, busca e estrutura de divulgação automatizada.

## Corrigir a publicação no Netlify

1. No ChatGPT, baixe `MimoMix_V3_NETLIFY_CORRIGIDO.zip`.
2. No Netlify, abra seu site > **Deploys** > **Deploy manually**.
3. Arraste o ZIP corrigido (ou a pasta extraída que contém `index.html` na raiz).
4. Aguarde o deploy terminar, abra o URL de produção. O erro "Page not found" geralmente aparece quando o site foi enviado em subpasta errada.

## Subir o código completo para este repositório

1. Extraia `MimoMix_V3_Completo.zip`.
2. Abra **Add file > Upload files** no GitHub.
3. Envie a pasta `site` com o `index.html`, `app.js`, `styles.css`, `data/` e `assets/` dentro dela, preservando a estrutura de pastas. Os scripts `automacao/` são opcionais e NÃO devem receber credenciais no código.
4. Faça commit na branch `main`.
5. Para hospedar via GitHub Pages, vá a **Settings > Pages > Source: GitHub Actions**. A automação de deploy foi preparada neste repositório.

O Netlify com integração Git poderá usar este repositório; o arquivo `netlify.toml` define o diretório de publicação como `site/`.

**Importante:** nenhum produto deve ser anunciado como promoção até que preço, estoque, frete e checkout estejam confirmados. A vitrine não processa pagamentos. Nunca inclua tokens ou senhas em repositórios públicos.
