# Lamarc Tech — Protótipos dentro de cassianolamarc.com.br

## Objetivo

Adicionar uma central de protótipos de landing pages da **Lamarc Tech** ao site pessoal já existente em `https://cassianolamarc.com.br/`, atualmente publicado pelo repositório `https://github.com/cassiano-lamarc/me`.

**Regra principal:** o site/portfólio atual na raiz deve continuar funcionando exatamente como funciona hoje. Não redesenhar, substituir ou reorganizar o conteúdo atual apenas para adicionar os protótipos. A implementação desta tarefa deve ficar concentrada em `/prototipos/`, salvo algum ajuste mínimo de publicação que seja realmente necessário.

O objetivo é permitir que, durante a prospecção, eu envie ao possível cliente apenas um link público da demonstração correspondente ao segmento dele, por exemplo:

- `https://cassianolamarc.com.br/prototipos/politico/`
- `https://cassianolamarc.com.br/prototipos/refrigeracao/`
- `https://cassianolamarc.com.br/prototipos/escola/`

O cliente deve receber somente a URL publicada do protótipo correspondente. Ele não precisa receber links de repositório para avaliar a demonstração.

> Importante: se `cassiano-lamarc/me` continuar público e os protótipos forem versionados diretamente nele, o código-fonte desses protótipos também será público no GitHub. Além disso, todo HTML/CSS/JS entregue ao navegador pode ser inspecionado no DevTools. Esta estrutura prioriza simplicidade e as URLs sob o domínio atual; não deve prometer ocultação de código.

## Hospedagem, domínio e publicação

O projeto já possui um site publicado no GitHub Pages e um domínio customizado: `cassianolamarc.com.br`. **Preservar essa configuração existente.**

Não criar outro site GitHub Pages, outro domínio ou subdomínio para esta tarefa. Os protótipos devem fazer parte do mesmo site estático publicado, usando subpastas.

URLs finais esperadas:

```text
https://cassianolamarc.com.br/                         -> portfólio existente
https://cassianolamarc.com.br/prototipos/              -> entrada discreta da central
https://cassianolamarc.com.br/prototipos/politico/     -> piloto político
https://cassianolamarc.com.br/prototipos/refrigeracao/ -> futuro
https://cassianolamarc.com.br/prototipos/escola/       -> futuro
```

O arquivo `CNAME` existente, caso esteja na raiz do projeto publicado, deve continuar apontando para `cassianolamarc.com.br`. **Não criar um segundo `CNAME` dentro de `/prototipos/`.**

Antes de editar, inspecionar a configuração atual do GitHub Pages, a estrutura do repositório e o workflow de deploy, se existir. Adaptar a implementação ao que já está funcionando em vez de substituir a estratégia de publicação.

## Stack

Usar somente:

- HTML5 semântico;
- CSS3;
- JavaScript puro apenas quando realmente necessário;
- arquivos e imagens locais;
- ícones leves, preferencialmente SVG.

Não adicionar Angular, React, Vue, backend, banco de dados ou dependências pesadas. O resultado precisa ser simples, rápido, barato de hospedar e fácil de duplicar para novos nichos.

## Estrutura dentro do repositório existente

Partir da estrutura que já existe em `cassiano-lamarc/me` e adicionar somente a árvore de protótipos. A estrutura conceitual deve ficar semelhante a:

```text
me/
├── index.html                  # PORTFÓLIO ATUAL — preservar
├── CNAME                       # preservar cassianolamarc.com.br, se existir
├── ...                         # CSS, JS, imagens e demais arquivos atuais
└── prototipos/
    ├── index.html              # entrada discreta; não listar todos os nichos
    ├── README.md
    ├── shared/
    │   ├── css/
    │   │   └── base.css
    │   ├── js/
    │   │   └── base.js
    │   └── assets/
    ├── politico/
    │   ├── index.html
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── script.js
    │   └── assets/
    ├── refrigeracao/           # futuro
    └── escola/                 # futuro
```

Cada nicho deve funcionar de forma independente por sua própria rota/pasta. Não criar arquivos como `politico.index.html`; usar `/prototipos/politico/index.html`, permitindo a URL limpa `/prototipos/politico/`.

O diretório `shared/` deve conter somente aquilo que realmente é comum a vários protótipos. O visual específico de cada nicho deve permanecer dentro de sua pasta para evitar que uma alteração em um protótipo quebre os demais.

## Página `/prototipos/`

Criar `/prototipos/index.html` como uma página interna simples da Lamarc Tech para identificar que se trata da Central de Protótipos. **Não substituir nem editar `/index.html` da raiz para fazer isso.**

Ela pode exibir o nome **Lamarc Tech — Protótipos**, mas **não deve listar automaticamente todos os protótipos existentes**. A intenção é que cada prospect receba diretamente a URL do nicho apropriado.

Adicionar `robots` com `noindex, nofollow` às páginas de demonstração, pois são protótipos comerciais e não devem disputar indexação com futuros sites de clientes.

## Requisitos comuns a todos os protótipos

Todos os protótipos atuais e futuros devem seguir estas regras:

- mobile first e totalmente responsivos;
- excelente aparência em desktop, tablet e celular;
- sem scroll horizontal acidental;
- carregamento rápido;
- imagens otimizadas e com `loading="lazy"` quando não forem hero;
- hero responsivo e sem perda do conteúdo principal em telas pequenas;
- HTML semântico e acessibilidade básica;
- contraste adequado e foco visível em elementos interativos;
- `alt` nas imagens;
- navegação suave entre seções;
- header responsivo com menu mobile;
- CTA claro e repetido nos pontos adequados;
- botão flutuante de WhatsApp quando fizer sentido;
- favicon genérico da Lamarc Tech enquanto for protótipo;
- Open Graph básico para o link ficar apresentável quando enviado pelo WhatsApp;
- SEO técnico mínimo, mas com `noindex, nofollow` enquanto for demonstração;
- nenhuma chave, token, senha ou segredo no frontend;
- nenhum formulário deve fingir que envia dados: se não houver backend, apresentar apenas CTA real (WhatsApp, telefone ou e-mail) ou comportamento demonstrativo claramente identificado;
- respeitar `prefers-reduced-motion`;
- animações discretas e leves;
- evitar bibliotecas grandes e processamento client-side desnecessário;
- rodapé em todos os protótipos com o crédito clicável **“Desenvolvido por Lamarc Tech”**, apontando para `https://cassianolamarc.com.br/`, abrindo de forma segura em nova aba.

## Identidade de protótipo

O conteúdo deve parecer uma landing page real o suficiente para o prospect visualizar o resultado final, mas sem inventar depoimentos, números de campanha, endossos, clientes ou informações factuais atribuídas a uma pessoa real.

Centralizar os campos que serão personalizados para cada possível cliente. Onde possível, usar variáveis CSS, comentários ou uma seção bem identificada no início do código para tornar rápida a troca de:

- nome;
- slogan;
- foto principal;
- cores;
- cidade/região;
- WhatsApp;
- Instagram/redes sociais;
- propostas/serviços;
- endereço;
- demais CTAs.

---

# Protótipo piloto — Político

Criar agora o primeiro protótipo em `/prototipos/politico/`.

Este protótipo não deve representar um político real. Utilizar identidade, nome, foto, números e textos fictícios/genéricos, deixando claro no código que são placeholders para personalização.

## Objetivo visual

Criar uma landing page de campanha moderna, séria, humana e confiável. O design deve transmitir proximidade com a população, capacidade de gestão e clareza de propostas.

Evitar aparência de template genérico, excesso de efeitos, visual agressivo ou elementos que lembrem propaganda enganosa.

Usar como identidade inicial uma combinação elegante de:

- azul-marinho ou azul profundo como base;
- azul mais vivo como cor de apoio;
- branco/off-white para áreas de respiro;
- uma cor de destaque moderada para CTAs.

As cores devem ficar concentradas em CSS custom properties para que eu consiga adaptar o protótipo rapidamente às cores de outro candidato.

## Conteúdo sugerido

Usar um candidato fictício, por exemplo **“João Silva”**, sem associá-lo a partido, número eleitoral ou eleição real. Todo conteúdo é apenas demonstração visual.

### 1. Header

- logotipo/nome do candidato;
- links: Início, Sobre, Propostas, Prioridades, Contato;
- CTA de destaque: **“Conheça as propostas”**;
- menu hambúrguer funcional no mobile.

### 2. Hero

Hero visualmente forte, pensado para funcionar muito bem tanto no desktop quanto no celular.

Incluir:

- espaço para fotografia profissional do candidato;
- pequeno texto de contexto, como “Um novo olhar para nossa cidade”;
- headline curta e impactante, como **“Experiência para cuidar. Coragem para transformar.”**;
- texto curto apresentando a proposta de proximidade e desenvolvimento;
- CTA primário **“Conheça minhas propostas”**;
- CTA secundário **“Fale com nossa equipe”**;
- elemento gráfico discreto que faça parte da identidade visual.

No mobile, garantir que o rosto/foto não seja cortado de forma ruim e que os CTAs permaneçam fáceis de tocar.

### 3. Sobre

Seção **“Quem é João Silva”** com foto e texto placeholder explicando trajetória, ligação com a comunidade e motivação para servir.

O texto deve soar natural e humano, mas não inventar currículo verificável, cargos anteriores ou realizações específicas.

### 4. Propostas / prioridades

Criar cards visuais para temas como:

- Saúde;
- Educação;
- Emprego e renda;
- Segurança;
- Mobilidade;
- Esporte e lazer.

Cada card deve possuir ícone, título e descrição breve. Os textos precisam ser claramente demonstrativos e fáceis de substituir.

### 5. Seção de destaque

Criar uma faixa de alto impacto com uma mensagem de visão para a cidade, fotografia de fundo ou composição gráfica e CTA.

Exemplo de tom:

> Uma cidade melhor se constrói ouvindo quem vive nela todos os dias.

### 6. Compromissos

Criar uma seção com 3 ou 4 compromissos estruturais, por exemplo:

- ouvir antes de decidir;
- transparência;
- presença nos bairros;
- foco em resultados para as pessoas.

Não apresentar estatísticas ou resultados falsos.

### 7. Galeria / campanha nas ruas

Criar área visual preparada para receber fotos de visitas, reuniões e ações de campanha. Usar placeholders que depois possam ser trocados facilmente.

### 8. Redes sociais e contato

Adicionar seção de convite para acompanhar o candidato, com placeholders para Instagram, Facebook e WhatsApp.

O CTA de WhatsApp deve utilizar uma mensagem pré-preenchida genérica e um número placeholder fácil de localizar no código.

### 9. Rodapé

Incluir:

- nome fictício do candidato;
- navegação curta;
- links sociais placeholder;
- aviso de que se trata de um **protótipo demonstrativo**;
- crédito **“Desenvolvido por Lamarc Tech”** → `https://cassianolamarc.com.br/`.

Não inventar CNPJ, partido, número de candidatura, dados obrigatórios de campanha ou informações legais. Esses elementos só devem ser adicionados quando houver dados reais do cliente e revisão apropriada para a campanha em questão.

## Comportamento e acabamento

- navbar com mudança visual suave após scroll;
- menu mobile funcional e acessível;
- scroll suave;
- pequenas animações de entrada, sem exagero;
- cards com estados de hover/focus no desktop;
- WhatsApp flutuante sem cobrir conteúdo no mobile;
- imagens com proporções estáveis para evitar layout shift;
- layout testado visualmente em aproximadamente 360 px, 768 px, 1024 px e 1440 px;
- evitar textos minúsculos no celular;
- evitar grandes blocos de texto;
- não usar carrossel automático;
- não utilizar conteúdo ou imagem protegida retirada de campanhas reais.

## README

Criar um `README.md` em `/prototipos/` explicando de forma objetiva:

1. finalidade da Central de Protótipos;
2. como executar localmente;
3. como criar um novo nicho copiando a estrutura apropriada;
4. quais campos precisam ser personalizados antes de enviar o link a um prospect;
5. que os protótipos são publicados junto com o site existente pelo mesmo GitHub Pages;
6. que a raiz `cassianolamarc.com.br/` não deve ser alterada ao criar um novo nicho;
7. quais URLs públicas correspondem às pastas;
8. checklist para garantir que nenhum dado de outro prospect permaneceu antes de reutilizar um protótipo.

## Critérios de aceite

Considerar a tarefa concluída somente quando:

- o site existente em `https://cassianolamarc.com.br/` continuar funcionando sem regressões;
- o `CNAME` e a configuração atual de domínio permanecerem válidos;
- a estrutura `/prototipos/` estiver criada sem substituir arquivos atuais da raiz;
- `/prototipos/politico/` abrir diretamente e funcionar isoladamente;
- todos os links internos funcionarem;
- menu mobile funcionar;
- não houver erros no console;
- não houver dependências desnecessárias;
- o protótipo estiver visualmente consistente nos principais breakpoints;
- Lighthouse não apontar problemas óbvios de acessibilidade/performance causados pela implementação;
- não houver segredos no código;
- nenhuma informação fizer parecer que João Silva é um candidato real;
- `noindex, nofollow` estiver configurado nos protótipos;
- o footer da Lamarc Tech estiver presente e com link correto;
- o README explicar como adicionar `refrigeracao`, `escola` e os próximos nichos;
- nenhuma alteração desnecessária tiver sido feita no portfólio atual;
- os assets e links funcionarem tanto com navegação direta para `/prototipos/politico/` quanto após refresh da página.

## Orientação final ao Codex

Trabalhe **sobre o repositório existente `cassiano-lamarc/me`**. Primeiro inspecione os arquivos atuais e identifique exatamente como o GitHub Pages publica `cassianolamarc.com.br`. Preserve o portfólio atual e então implemente a estrutura `/prototipos/` e o protótipo piloto de político completos.

Use caminhos relativos ou absolutos compatíveis com a subpasta `/prototipos/politico/`; não escreva assets como se o protótipo estivesse hospedado na raiz do domínio.

Antes de finalizar, abra/renderize tanto `cassianolamarc.com.br/` quanto `/prototipos/politico/` (ou equivalentes locais), faça uma verificação visual em desktop e mobile e corrija problemas de responsividade, espaçamento, contraste, cortes de imagem e navegação.

Não pare apenas na criação dos arquivos: entregue um protótipo apresentável o suficiente para ser enviado a um possível cliente como demonstração comercial da Lamarc Tech.
