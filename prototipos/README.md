# Central de Protótipos — Lamarc Tech

Esta pasta reúne demonstrações comerciais estáticas publicadas junto ao portfólio existente. A raiz do site e o `CNAME` não devem ser alterados ao criar ou atualizar um nicho.

## Executar localmente

Na raiz do repositório, inicie qualquer servidor HTTP estático. Por exemplo, com Python:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000/prototipos/` ou diretamente `http://localhost:8000/prototipos/politico/`. Abrir o HTML diretamente também funciona, mas um servidor local reproduz melhor o ambiente publicado.

## Criar um novo nicho

1. Copie a pasta de um protótipo apropriado, como `politico/`, para `refrigeracao/`, `escola/` ou outro nome curto, sem espaços e em minúsculas.
2. Mantenha `index.html`, `css/`, `js/` e `assets/` dentro da pasta do nicho.
3. Reutilize de `shared/` apenas o que for realmente comum. Estilos específicos devem permanecer no nicho.
4. Adicione um card à vitrine em `prototipos/index.html` somente depois que a rota do novo nicho estiver implementada e validada.

Cada pasta gera uma URL limpa: `prototipos/politico/` corresponde a `https://cassianolamarc.com.br/prototipos/politico/`; `prototipos/refrigeracao/` corresponderá a `https://cassianolamarc.com.br/prototipos/refrigeracao/`; e `prototipos/escola/` a `https://cassianolamarc.com.br/prototipos/escola/`.

## Personalização

Antes de compartilhar, revise nome, slogan, imagens, cores (variáveis no início do CSS), cidade/região, WhatsApp (objeto no início do JavaScript), e-mail, redes sociais, serviços/propostas, endereço e todos os CTAs. Use somente imagens autorizadas e informações reais verificadas. Nunca inclua tokens, senhas ou chaves no frontend.

Os protótipos usam `noindex, nofollow` e são publicados pelo mesmo GitHub Pages do portfólio. Isso evita um deploy separado, mas não oculta o código-fonte nem impede inspeção pelo navegador.

## Checklist de reutilização

- [ ] Nome, textos, cidade e identidade visual pertencem ao prospect atual.
- [ ] Fotos e logotipos têm autorização de uso e textos alternativos adequados.
- [ ] WhatsApp, e-mail, redes e mensagens pré-preenchidas foram substituídos e testados.
- [ ] Nenhum dado, imagem ou referência do prospect anterior permanece.
- [ ] Nenhum depoimento, número, endosso ou resultado fictício é apresentado como real.
- [ ] CTAs funcionam e formulários sem backend não fingem enviar dados.
- [ ] Menu mobile, foco por teclado e links internos funcionam.
- [ ] A página foi conferida em celular, tablet e desktop, sem rolagem horizontal.
- [ ] `noindex, nofollow`, favicon, Open Graph e crédito da Lamarc Tech permanecem presentes.
- [ ] Caminhos de assets funcionam na URL direta e após atualizar a página.
- [ ] A raiz `cassianolamarc.com.br/` e o `CNAME` continuam intactos.
