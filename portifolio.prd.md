# Briefing para GitHub Copilot — Portfólio de Cassiano Lamarc

Crie uma landing page elegante, moderna e responsiva usando apenas **HTML, CSS e JavaScript puro** para o portfólio profissional de **Cassiano Lamarc**, desenvolvedor de software Fullstack com foco em **.NET, Angular, SQL Server e PostgreSQL**.

## Objetivo

Ao carregar a página, deve ficar imediatamente evidente que se trata de um portfólio de desenvolvedor. O visual deve transmitir senioridade, tecnologia, clareza e profissionalismo.

## Estrutura obrigatória

Crie os arquivos:

* `index.html`
* `style.css`
* `script.js`

## Identidade do site

Nome em destaque:

```text
Cassiano Lamarc
```

Headline principal:

```text
Fullstack .NET & Angular Software Engineer
```

Subheadline:

```text
Desenvolvedor de software com mais de 8 anos de experiência na criação de soluções web, APIs, sistemas corporativos e integrações escaláveis.
```

Stack principal:

```text
.NET | C# | Angular | SQL Server | PostgreSQL | APIs REST | Clean Code
```

## Seções da landing page

### 1. Hero

Deve ocupar a primeira dobra da tela.

Elementos:

* Nome: Cassiano Lamarc
* Cargo: Fullstack .NET & Angular Software Engineer
* Texto curto de apresentação
* Botões:

  * `Ver experiências`
  * `Entrar em contato`
* Links sociais:

  * LinkedIn: `https://br.linkedin.com/in/cassiano-lamarc-493964129/pt`
  * GitHub: usar placeholder `https://github.com/SEU-USUARIO`
  * WhatsApp: usar placeholder `https://wa.me/5500000000000`

Visual:

* Fundo escuro sofisticado
* Gradientes discretos
* Animações suaves
* Elementos visuais que remetam a código, backend, frontend e banco de dados

### 2. Sobre

Texto sugerido:

```text
Sou um desenvolvedor de software focado na construção de aplicações robustas, escaláveis e bem estruturadas. Minha atuação combina desenvolvimento backend com .NET e C#, frontend com Angular e modelagem de dados em SQL Server e PostgreSQL. Tenho experiência em APIs, sistemas corporativos, manutenção evolutiva, integrações e boas práticas como Clean Code, SOLID e arquitetura em camadas.
```

### 3. Experiências cronológicas com scroll controlado

Criar uma seção chamada `Experiência`.

Essa seção deve ter comportamento especial em JavaScript:

* Quando o usuário chegar nessa seção, a tela deve parecer “estática”.
* Ao continuar rolando o mouse, a página não deve avançar imediatamente.
* Em vez disso, as experiências devem mudar uma a uma.
* Quando chegar na última experiência, o scroll normal da página deve continuar.
* Ao rolar para cima, deve acontecer o inverso: as experiências anteriores aparecem novamente.

Use JavaScript com eventos de scroll ou wheel para controlar essa interação.

As experiências devem ser apresentadas em ordem cronológica.

Use cards ou timeline vertical/horizontal com transições suaves.

Experiências-base:

#### Experiência 1 — Início da carreira

```text
Desenvolvimento e manutenção de sistemas corporativos, atuando com lógica de negócio, banco de dados relacional e melhorias em aplicações internas.
```

Tecnologias:

```text
C# | SQL Server | JavaScript | HTML | CSS
```

#### Experiência 2 — Consolidação backend

```text
Atuação no desenvolvimento de APIs e sistemas backend utilizando .NET, C#, arquitetura em camadas, boas práticas de código e integração com bancos relacionais.
```

Tecnologias:

```text
.NET | C# | APIs REST | SQL Server | PostgreSQL
```

#### Experiência 3 — Fullstack com Angular

```text
Desenvolvimento de aplicações web completas, integrando interfaces modernas em Angular com serviços backend em .NET.
```

Tecnologias:

```text
Angular | TypeScript | .NET | C# | REST APIs
```

#### Experiência 4 — Engenharia de software atual

```text
Criação de soluções escaláveis, manutenção evolutiva, melhoria de performance, integração entre sistemas e aplicação de princípios de Clean Code e SOLID.
```

Tecnologias:

```text
.NET | Angular | SQL Server | PostgreSQL | Clean Code | SOLID
```

### 4. Tecnologias

Criar uma seção visual com badges ou cards para:

* .NET
* C#
* Angular
* TypeScript
* SQL Server
* PostgreSQL
* APIs REST
* Git
* Clean Code
* SOLID

### 5. Locais aceitáveis de trabalho

Criar seção chamada `Locais aceitáveis de trabalho`.

Mostrar opções:

```text
Remoto
Híbrido
Presencial, mediante localização e proposta
Brasil
Projetos internacionais remotos
```

### 6. Contato

Criar uma seção ou página visual de contato dentro da própria landing page.

Campos:

* Nome
* E-mail
* Mensagem
* Botão `Enviar mensagem`

O formulário não precisa enviar de verdade. Ao clicar, mostrar uma mensagem em JavaScript:

```text
Mensagem preparada! Entre em contato também pelo LinkedIn ou WhatsApp.
```

Links de contato:

* LinkedIn
* GitHub
* WhatsApp

### 7. Botão de idioma

Adicionar um botão fixo no topo:

```text
PT | EN
```

Ao clicar, alternar os textos principais entre português e inglês usando JavaScript.

Não precisa recarregar a página.

Criar um objeto JS com traduções, por exemplo:

```javascript
const translations = {
  pt: {},
  en: {}
}
```

## Requisitos visuais

O site deve ser:

* Elegante
* Moderno
* Responsivo
* Com boa tipografia
* Com contraste adequado
* Com animações suaves
* Com aparência profissional de portfólio de desenvolvedor

Sugestão de estilo:

* Fundo: tons escuros, como `#0f172a`, `#111827`, `#020617`
* Destaques: azul, cyan ou roxo
* Cards com vidro fosco usando `backdrop-filter`
* Bordas suaves
* Sombras discretas
* Animações com `transition` e `transform`

## Requisitos técnicos

* Usar HTML semântico
* Usar CSS moderno com variáveis
* Usar JavaScript puro
* Não usar frameworks
* Não usar bibliotecas externas obrigatórias
* Código organizado e comentado
* Layout responsivo para desktop, tablet e mobile
* Scroll suave com `scroll-behavior: smooth`
* A seção de experiências deve usar JavaScript para controlar a troca de cards durante o scroll

## Resultado esperado

Gerar uma landing page completa, visualmente refinada, com foco em apresentar Cassiano Lamarc como desenvolvedor Fullstack especializado em .NET, Angular e bancos SQL, com destaque para trajetória profissional, tecnologias, locais aceitáveis de trabalho, contato e alternância de idioma.
