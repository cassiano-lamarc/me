# Prompt — Integrar portfólio principal à Central de Protótipos Lamarc Tech

Quero modificar o site existente publicado em `https://cassianolamarc.com.br/`, mantendo a identidade visual e todas as funcionalidades atuais, para transformar a área de landing pages em uma porta de entrada para uma **Central de Protótipos**.

O objetivo comercial é o seguinte:

1. O visitante acessa `https://cassianolamarc.com.br/`.
2. No portfólio principal, ele encontra uma opção clara relacionada à contratação/criação de Landing Pages.
3. Ao clicar em **Ver protótipos**, **Conheça nossos modelos**, ou CTA equivalente, é direcionado para `https://cassianolamarc.com.br/prototipos/`.
4. Na Central de Protótipos, o visitante visualiza os nichos disponíveis.
5. Ao selecionar um nicho, acessa a landing page demonstrativa correspondente, por exemplo:
   - `https://cassianolamarc.com.br/prototipos/politico/`
   - `https://cassianolamarc.com.br/prototipos/refrigeracao/`
   - futuramente: `/prototipos/escola/`, `/prototipos/energia-solar/`, `/prototipos/clinica/`, etc.
6. Depois de analisar uma demo, o visitante deve conseguir voltar facilmente à Central ou entrar em contato para contratar/pedir personalização.

## Regra principal

Trabalhe sobre o projeto existente. **Não recrie o site do zero.** Antes de alterar qualquer coisa, inspecione a estrutura, estilos, scripts, componentes e rotas atuais.

Preserve:

- o domínio e o `CNAME` atuais;
- o funcionamento do GitHub Pages;
- conteúdo e seções existentes que não estejam relacionadas a esta mudança;
- identidade visual, tipografia, cores e padrões do portfólio principal;
- responsividade;
- links e funcionalidades existentes.

As principais páginas que precisam ser modificadas são:

```text
/
├── index.html                    # portfólio principal — MODIFICAR
└── prototipos/
    ├── index.html                # central de protótipos — MODIFICAR/CRIAR
    ├── politico/
    │   └── index.html            # protótipo já existente ou independente
    └── refrigeracao/
        └── index.html            # protótipo já existente ou independente
```

Não altere desnecessariamente os protótipos já prontos.

---

## 1. Alteração do portfólio principal — `/index.html`

No site principal, criar ou adaptar uma área comercial voltada à criação de Landing Pages.

Ela pode aparecer na seção de serviços/portfólio existente, respeitando o design atual. A comunicação deve deixar claro que eu desenvolvo landing pages profissionais para empresas, profissionais e campanhas de diferentes segmentos.

Sugestão de conteúdo:

**Landing Pages profissionais**

> Sites rápidos, responsivos e pensados para apresentar seu negócio com profissionalismo, gerar confiança e transformar visitantes em novos contatos e clientes.

Adicionar um CTA destacado, por exemplo:

**Ver protótipos de Landing Pages**

Esse botão deve navegar para:

```text
/prototipos/
```

Preferir URL relativa, para funcionar corretamente tanto localmente quanto no domínio final.

Se fizer sentido com a interface atual, incluir também um CTA secundário de contato/orçamento.

### Navegação

Se o layout atual possuir menu principal e houver espaço sem prejudicar a experiência, adicionar uma entrada curta como **Landing Pages** ou **Contrate** que leve à nova área comercial ou diretamente à central. Não sobrecarregar o menu.

---

## 2. Central de Protótipos — `/prototipos/index.html`

Transformar `/prototipos/` em uma verdadeira vitrine comercial da **Lamarc Tech**, e não apenas em uma listagem de arquivos.

### Header

Criar um header simples e profissional contendo:

- Lamarc Tech / identidade visual já utilizada no projeto;
- link **Voltar ao portfólio**, direcionando para `/`;
- CTA de contato/orçamento, quando adequado.

### Hero

Criar uma apresentação curta, por exemplo:

**Escolha um modelo e imagine o seu negócio aqui**

Texto de apoio explicando que os exemplos são protótipos e podem ser personalizados com identidade visual, textos, imagens, serviços, contatos e necessidades de cada cliente.

Evitar transmitir a ideia de “template engessado”. O objetivo é demonstrar possibilidades de criação.

### Grade de nichos

Criar uma grade responsiva de cards para os protótipos.

Cada card deve conter:

- imagem/capa representativa do nicho, quando houver;
- ícone coerente;
- nome do segmento;
- descrição curta;
- botão **Ver protótipo**;
- card inteiro clicável se isso não prejudicar acessibilidade.

Protótipos inicialmente acessíveis:

| Nicho | Rota |
| --- | --- |
| Político | `/prototipos/politico/` |
| Refrigeração / Ar-condicionado | `/prototipos/refrigeracao/` |

Antes de finalizar, confira as pastas existentes no projeto e inclua automaticamente na central outros protótipos que já estiverem implementados e utilizáveis.

**Não crie links quebrados.** Um nicho só deve ter CTA ativo se a respectiva página existir.

Para futuros nichos, deixar a estrutura simples de estender. Exemplos futuros:

- Escolas e educação;
- Energia solar;
- Clínicas;
- Oficinas;
- Envelopamento;
- Restaurantes;
- Serviços profissionais.

Não é necessário criar as landing pages desses nichos agora.

### CTA comercial final

Após os protótipos, adicionar uma seção de conversão com texto semelhante a:

**Gostou de um modelo? Vamos criar o seu.**

Explique brevemente que o site será personalizado para o negócio do cliente.

Adicionar CTA para contato/orçamento utilizando o canal de contato já existente no portfólio. **Reaproveite os dados reais existentes no projeto; não invente telefone, e-mail ou WhatsApp.**

---

## 3. Navegação dentro dos protótipos

Sem descaracterizar as landing pages demonstrativas, avaliar a inclusão de um controle discreto para:

- **Voltar aos protótipos** → `/prototipos/`;
- **Quero um site como este** → contato/orçamento.

Se isso exigir mudanças invasivas nas demos atuais, priorize a central e não altere os protótipos nesta tarefa.

---

## 4. Design e experiência

A Central deve parecer parte do ecossistema de `cassianolamarc.com.br`, mas pode ter uma apresentação mais comercial.

Requisitos:

- mobile-first e totalmente responsiva;
- excelente visual em desktop, tablet e celular;
- cards com boa hierarquia visual;
- animações discretas e leves;
- estados de hover e focus;
- navegação por teclado;
- contraste adequado;
- imagens com `alt` apropriado;
- HTML semântico;
- evitar dependências pesadas;
- priorizar carregamento rápido e boa pontuação de performance;
- respeitar `prefers-reduced-motion` quando houver animações.

Não transformar a página em um painel administrativo. Ela é uma **vitrine de vendas** para potenciais clientes.

---

## 5. SEO e compartilhamento

O portfólio principal pode continuar com a estratégia de indexação atual.

Para `/prototipos/`, configurar `title`, `description`, Open Graph e favicon de forma coerente com a Lamarc Tech/portfólio.

Os protótipos individuais são demonstrações e não devem competir no Google com negócios reais. Se ainda não estiver configurado neles, utilizar:

```html
<meta name="robots" content="noindex, nofollow">
```

A central `/prototipos/` pode ser indexável, pois passa a fazer parte do funil comercial do portfólio.

---

## 6. Rotas e GitHub Pages

Tudo continuará publicado no mesmo domínio:

```text
cassianolamarc.com.br/
└── prototipos/
    ├── politico/
    ├── refrigeracao/
    └── ...
```

Não modificar DNS, domínio ou configuração de publicação sem necessidade.

Não criar URLs como `politico.index.html`. Cada protótipo deve usar sua própria pasta com `index.html`, permitindo URLs limpas.

Todos os caminhos de CSS, JS, imagens e navegação precisam funcionar corretamente a partir das subpastas do GitHub Pages.

---

## 7. Segurança contra regressões

Antes de implementar:

1. inspecione a estrutura atual;
2. identifique como o site principal gerencia estilos e scripts;
3. localize todos os protótipos já existentes;
4. preserve arquivos e funcionalidades não relacionados;
5. não sobrescreva um protótipo pronto com conteúdo genérico.

Depois de implementar, valide:

- `/` continua abrindo normalmente;
- o CTA do portfólio chega a `/prototipos/`;
- `/prototipos/` funciona diretamente ao abrir a URL;
- todos os cards apontam para rotas existentes;
- `/prototipos/politico/` funciona;
- `/prototipos/refrigeracao/` funciona;
- voltar da central para o portfólio funciona;
- assets carregam sem 404;
- não existem links quebrados;
- layout funciona em largura mobile, tablet e desktop;
- nenhuma funcionalidade existente do portfólio foi quebrada.

## Resultado esperado

O fluxo final deve ser:

```text
cassianolamarc.com.br
        ↓
Landing Pages / Contrate / Portfólio
        ↓
cassianolamarc.com.br/prototipos/
        ↓
Escolha do nicho
        ↓
Protótipo específico
        ↓
Contato / orçamento
```

Implemente a alteração completa, reutilizando ao máximo a estrutura atual e mantendo o resultado consistente com a identidade visual já existente.
