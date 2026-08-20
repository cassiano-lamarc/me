# Reformulação do site — Lamarc Tech

## Objetivo

Analise o projeto existente deste repositório e transforme a página principal, que hoje funciona como currículo/portfólio profissional de Cassiano Lamarc, em um **site empresarial para venda de serviços de tecnologia**.

O novo posicionamento será **Lamarc Tech**: uma empresa que ajuda negócios a ganhar eficiência, melhorar sua presença digital, captar clientes e automatizar processos utilizando tecnologia e inteligência artificial.

Não crie um projeto ou repositório separado. Trabalhe sobre a estrutura atual, preservando o framework, a arquitetura, as configurações de publicação, o domínio e tudo o que já estiver funcionando.

O conteúdo pessoal atual **não deve ser excluído**. Ele deverá ser movido para uma nova área do mesmo site, acessível pelo caminho `/me`.

---

## Estrutura obrigatória de páginas

O site deve ser dividido claramente em duas áreas:

### `/index.html` — Lamarc Tech

A página principal do domínio deve falar **exclusivamente sobre a empresa Lamarc Tech**.

- Não deve parecer um currículo;
- Não deve ter como foco a busca de emprego de Cassiano;
- Deve apresentar os serviços, soluções, projetos empresariais, diferenciais e formas de contato da Lamarc Tech;
- Deve utilizar linguagem comercial e empresarial;
- Pode mencionar Cassiano somente de maneira breve na seção sobre a empresa ou liderança técnica;
- Todo visitante que acessar a raiz do domínio deve enxergar primeiro a Lamarc Tech.

Exemplo de acesso:

```text
https://dominio.com.br/index.html
https://dominio.com.br/
```

### `/me/index.html` — Cassiano Lamarc

Crie uma pasta chamada `/me` e mova para ela o site pessoal atual que fala sobre Cassiano Lamarc.

Estrutura esperada:

```text
/index.html          → site empresarial da Lamarc Tech
/me/index.html       → site pessoal de Cassiano Lamarc
```

O conteúdo atual deve ser preservado sempre que ainda estiver correto, incluindo:

- Apresentação pessoal;
- Experiência profissional;
- Formação;
- Tecnologias e competências;
- Projetos pessoais relevantes;
- Currículo;
- LinkedIn e GitHub;
- Formas de contato profissionais.

O Codex pode melhorar a organização visual e a responsividade do site pessoal, mas não deve transformar essa etapa em uma reconstrução desnecessária. A prioridade é preservar o conteúdo pessoal existente dentro de `/me` e liberar a raiz do domínio para a empresa.

Também adicione o Instagram pessoal de Cassiano na página `/me`, utilizando o endereço real que já estiver presente no projeto. Se não houver Instagram configurado, crie uma constante ou campo claramente marcado como pendente, sem inventar nome de usuário ou URL.

Inclua no site pessoal um link discreto para a empresa:

> Conheça a Lamarc Tech

Esse link deve levar para `/index.html` ou `/`.

No site empresarial, pode existir no rodapé um link discreto como:

> Sobre Cassiano Lamarc

Esse link deve levar para `/me/`, sem tirar o foco comercial da página principal.

---

## Antes de modificar

1. Analise toda a estrutura atual do projeto.
2. Identifique tecnologias, componentes reutilizáveis, rotas, estilos e configurações de deploy.
3. Verifique se existe conteúdo que ainda vale manter, como informações sobre experiência, projetos, tecnologias e formas de contato.
4. Preserve componentes e configurações úteis. A aparência e a comunicação de “currículo procurando emprego” devem sair somente da página empresarial e permanecer, quando fizerem sentido, na página pessoal `/me`.
5. Não invente telefones, e-mails, depoimentos, clientes, números, métricas ou resultados.
6. Caso algum dado de contato ou Instagram não exista no projeto, deixe-o centralizado em uma configuração ou constante claramente identificada para ser preenchida depois.
7. Antes de mover arquivos, verifique caminhos relativos de CSS, JavaScript, imagens, favicon, currículo e outros recursos para que o site pessoal continue funcionando dentro de `/me`.
8. Não duplique desnecessariamente os mesmos arquivos estáticos. Compartilhe recursos comuns quando isso for seguro e mantenha recursos específicos dentro da área correspondente.

---

## Posicionamento da empresa

### Nome

**Lamarc Tech**

### Proposta principal

Soluções de IA, automação, sites e sistemas que ajudam empresas a economizar tempo, organizar processos, melhorar o atendimento e gerar novas oportunidades.

### Público-alvo

- Pequenas e médias empresas;
- Profissionais autônomos;
- Clínicas e consultórios;
- Oficinas e empresas automotivas;
- Empresas de turismo;
- Refrigeração e climatização;
- Móveis planejados;
- Energia solar;
- Prestadores de serviços;
- Negócios locais de Salvador, Região Metropolitana e de outras regiões por atendimento remoto.

### Tom de comunicação

- Empresarial, moderno e confiável;
- Direto e fácil de entender;
- Pouco texto por bloco;
- Focado no problema e no resultado para o cliente;
- Evitar excesso de termos técnicos;
- Não apresentar Cassiano como freelancer procurando trabalho;
- Mostrar a Lamarc Tech como uma empresa capaz de diagnosticar problemas e entregar soluções.

---

## Serviços que devem aparecer

### 1. Inteligência artificial e automação

- Chatbots e atendimento automatizado;
- Automação de atendimento pelo WhatsApp;
- Triagem e qualificação de potenciais clientes;
- Automação de tarefas repetitivas;
- Integração entre ferramentas e sistemas;
- Assistentes virtuais para empresas;
- Fluxos automáticos de notificações e acompanhamento;
- Soluções com IA aplicadas às necessidades reais do negócio.

Não prometer que a Lamarc Tech consegue “clientes automaticamente”. Explicar que as soluções ajudam a melhorar atendimento, conversão, organização e produtividade.

### 2. Sites e presença digital

- Sites empresariais;
- Landing pages;
- Portfólios profissionais;
- Catálogos digitais;
- Sites substitutos do Linktree;
- Páginas para campanhas e anúncios;
- Sites responsivos e otimizados para celular;
- Integração com WhatsApp, Instagram, mapas e formulários.

### 3. Sistemas sob medida

- Sistemas web;
- Painéis administrativos;
- Dashboards;
- APIs e integrações;
- Sistemas para organizar clientes, atendimentos e processos;
- Ferramentas internas para reduzir trabalho manual;
- Evolução e manutenção de sistemas já existentes.

### 4. Consultoria e estrutura digital

- Diagnóstico de processos;
- Identificação de tarefas que podem ser automatizadas;
- Planejamento de soluções digitais;
- Estrutura tecnológica para campanhas;
- Orientação sobre presença digital e captação de leads;
- Integração entre site, atendimento e processo comercial.

Deixe claro que gestão completa de tráfego pago só deve ser anunciada se houver confirmação posterior. Por enquanto, pode apresentar criação da estrutura tecnológica e das páginas utilizadas em campanhas.

---

## Projetos e experiências que devem aparecer

Crie uma seção chamada **Projetos**, **Soluções desenvolvidas** ou **Trabalhos realizados**. Aproveite links e imagens reais encontrados no repositório. Não invente resultados ou métricas.

### HardApply

Produto digital criado para ajudar profissionais a organizar candidaturas, entrevistas, currículos e notificações. Pode ser apresentado como demonstração da capacidade de criar um sistema completo, com front-end, back-end, autenticação, banco de dados e automações.

### Jessik Turismo

Projeto de presença digital para agência de turismo, com proposta de substituir o Linktree, apresentar serviços, destinos e facilitar o contato.

### MV Eletrodiesel

Site empresarial para oficina especializada em sistemas de injeção diesel, apresentando serviços, experiência, localização e contato para orçamento.

### Luiz Envelopamento

Site e portfólio para empresa de envelopamento, destacando trabalhos, áreas atendidas e contato comercial.

### Refrigeração e climatização

Protótipos e páginas comerciais para empresas de instalação, manutenção e assistência técnica de ar-condicionado.

### Outros protótipos por segmento

Apresentar, quando existirem materiais no projeto, trabalhos ou protótipos para:

- Clínicas odontológicas;
- Móveis planejados;
- Energia solar;
- Escolas e cursos;
- Projetos sociais;
- Políticos;
- Turismo;
- Serviços automotivos.

Classifique corretamente cada item como “projeto realizado”, “produto próprio”, “protótipo” ou “conceito”, sem apresentar protótipos como clientes atendidos.

---

## Estrutura sugerida da página inicial

### 1. Cabeçalho

- Logo/nome Lamarc Tech;
- Links: Início, Serviços, Projetos, Sobre e Contato;
- Botão em destaque: **Solicitar orçamento** ou **Falar sobre um projeto**;
- Menu responsivo no celular.

### 2. Seção principal

Sugestão de título:

> Tecnologia e inteligência artificial para sua empresa crescer com mais eficiência.

Sugestão de apoio:

> Criamos sites, sistemas e automações que reduzem tarefas manuais, melhoram o atendimento e transformam ideias em soluções reais.

Chamadas:

- **Falar sobre meu projeto**;
- **Conhecer soluções**.

### 3. Problemas que resolvemos

Apresentar situações com as quais o empresário se identifica:

- Atendimento lento ou desorganizado;
- Perda de contatos e oportunidades;
- Tarefas repetitivas consumindo tempo;
- Empresa dependente apenas do Instagram;
- Falta de site ou presença digital profissional;
- Informações espalhadas em várias ferramentas;
- Processos manuais que poderiam ser automatizados.

### 4. Serviços

Mostrar os quatro grupos de serviços descritos neste documento. Cada card deve explicar:

- O problema;
- A solução oferecida;
- O benefício esperado;
- Uma chamada para conversar.

### 5. Projetos

Exibir os projetos com imagem, nome, segmento, resumo curto, tipo do projeto e link, quando disponível.

Criar filtros apenas se isso não tornar a implementação desnecessariamente complexa. Categorias possíveis:

- Sistemas;
- Sites;
- Automações;
- Protótipos.

### 6. Como trabalhamos

Usar um processo simples:

1. Entender o problema;
2. Propor a solução;
3. Construir e validar;
4. Publicar, acompanhar e evoluir.

### 7. Sobre a Lamarc Tech

Apresentar a empresa e a liderança técnica de Cassiano Lamarc de forma breve. A experiência profissional pode ser usada como prova de capacidade, mas não deve voltar a transformar a página em currículo.

Pontos que podem ser utilizados se estiverem confirmados no conteúdo atual:

- Experiência em desenvolvimento de software;
- Conhecimento em .NET, C#, Angular, React, bancos de dados, APIs e nuvem;
- Experiência com arquitetura de software e soluções empresariais;
- Capacidade de construir do protótipo ao sistema publicado.

### 8. Chamada final

Título sugerido:

> Qual problema da sua empresa está tomando tempo demais?

Texto:

> Conte sua necessidade. A Lamarc Tech analisa o cenário e propõe uma solução clara, sem complicação desnecessária.

Botão principal:

> Conversar no WhatsApp

O botão deve usar o número real já configurado no projeto. Adicione uma mensagem inicial pronta, como:

> Olá! Vim pelo site da Lamarc Tech e gostaria de conversar sobre uma solução para minha empresa.

### 9. Rodapé

- Lamarc Tech;
- Resumo dos serviços;
- Salvador/BA e atendimento remoto;
- WhatsApp;
- E-mail;
- Instagram e LinkedIn, se existirem;
- Política de privacidade, se houver formulário ou coleta de dados.

---

## Direção visual

- Visual empresarial e tecnológico;
- Aparência premium, mas acessível para negócios locais;
- Pode utilizar azul profundo, azul elétrico, ciano e tons neutros;
- Alto contraste e excelente legibilidade;
- Bastante espaço entre blocos;
- Ícones coerentes e discretos;
- Evitar aparência genérica de template de IA;
- Evitar excesso de brilhos, partículas, animações e efeitos neon;
- Usar animações leves apenas quando melhorarem a experiência;
- Priorizar imagens reais dos projetos e mockups criados a partir deles;
- Garantir excelente apresentação em celulares.

---

## Requisitos técnicos

- Manter a tecnologia e a arquitetura atuais sempre que possível;
- Garantir que `/index.html` seja a página empresarial e que `/me/index.html` seja a página pessoal;
- Preservar o funcionamento do site pessoal depois da mudança para a subpasta `/me`;
- Corrigir todos os caminhos relativos de imagens, folhas de estilo, scripts, documentos e links após a movimentação;
- Garantir que tanto `/me` quanto `/me/` direcionem corretamente para `/me/index.html`, de acordo com as possibilidades da hospedagem atual;
- Não utilizar redirecionamento da página principal para `/me`;
- Reutilizar componentes existentes que ainda façam sentido;
- Criar componentes reutilizáveis para serviços e projetos;
- Centralizar textos e dados dos projetos para facilitar futuras atualizações;
- Não deixar informações importantes duplicadas em vários componentes;
- Aplicar HTML semântico e acessibilidade;
- Adicionar textos alternativos às imagens;
- Garantir navegação por teclado;
- Garantir contraste adequado;
- Otimizar imagens e carregamento;
- Configurar título, descrição, Open Graph, favicon e demais metadados;
- Trabalhar SEO local para termos relacionados a tecnologia, IA, automação, criação de sites e sistemas em Salvador/BA;
- Não prejudicar as configurações atuais de domínio e deploy;
- Não adicionar dependências desnecessárias;
- Não incluir conteúdo falso para preencher espaço.

---

## SEO básico

Utilizar de maneira natural termos como:

- Empresa de tecnologia em Salvador;
- Automação para empresas;
- Inteligência artificial para negócios;
- Criação de sites em Salvador;
- Desenvolvimento de sistemas;
- Chatbot para WhatsApp;
- Landing pages para empresas;
- Sistemas sob medida;
- Automação de atendimento.

Não repetir palavras-chave artificialmente.

---

## Entrega esperada

1. Apresente primeiro um resumo curto do que encontrou no projeto atual.
2. Informe quais partes serão mantidas, modificadas e removidas.
3. Implemente a reformulação completa no projeto existente.
4. Substitua todos os textos genéricos e conteúdos de exemplo.
5. Execute lint, testes e build disponíveis no projeto.
6. Corrija os erros causados pela alteração.
7. Verifique responsividade e funcionamento dos links principais.
8. Teste separadamente a página empresarial `/index.html` e a página pessoal `/me/index.html`.
9. Confirme que os arquivos, imagens, estilos, scripts, currículo e links do site pessoal continuam acessíveis dentro de `/me`.
10. Ao finalizar, apresente:
   - Arquivos modificados;
   - Principais decisões;
   - Como executar localmente;
   - Pendências que dependem de dados reais;
   - Sugestões para uma próxima versão.

Não publique, altere DNS, domínio ou serviços externos sem autorização explícita.
