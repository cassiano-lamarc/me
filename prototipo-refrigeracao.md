# Prompt para o Codex — Protótipo de Landing Page para Refrigeração / Ar-condicionado

## Objetivo

Crie um novo protótipo de landing page profissional para empresas de **refrigeração e ar-condicionado**, usando como principal referência visual o arquivo:

`@file:prototipe.jpeg`

Caso o arquivo de referência esteja com outro nome no workspace, use a imagem anexada pelo usuário (layout com técnico realizando manutenção em split, paleta branca/azul e CTAs verdes de WhatsApp).

Este protótipo fará parte da central de protótipos já existente no site **cassianolamarc.com.br**.

O resultado final deverá ficar acessível em:

`https://cassianolamarc.com.br/prototipos/refrigeracao/`

## Regra crítica: preservar o site existente

O projeto base é o repositório:

`https://github.com/cassiano-lamarc/me`

Antes de alterar qualquer arquivo, inspecione a estrutura atual do projeto.

- NÃO refatore ou redesenhe o portfólio existente.
- NÃO altere o funcionamento de `cassianolamarc.com.br/`.
- NÃO altere/remova o `CNAME` existente.
- NÃO modifique os outros protótipos existentes, inclusive `/prototipos/politico/`.
- Crie o novo site exclusivamente dentro de `/prototipos/refrigeracao/`.
- Evite dependências compartilhadas com a raiz que possam causar regressões.

Estrutura esperada, adaptando-a ao padrão real do repositório:

```text
/
├── index.html
├── CNAME
├── ...arquivos atuais do portfólio
└── prototipos/
    ├── politico/
    │   └── ...preservar
    └── refrigeracao/
        ├── index.html
        ├── style.css
        ├── script.js
        └── assets/
```

## Direção visual

Baseie fortemente a composição na imagem de referência, sem depender de uma cópia pixel a pixel.

Características principais:

- visual limpo, moderno e profissional;
- fundo predominantemente branco;
- azul-marinho/azul como cores institucionais;
- verde reservado principalmente aos CTAs de WhatsApp;
- bastante espaço em branco;
- sombras suaves;
- cantos discretamente arredondados;
- tipografia sans-serif moderna, altamente legível;
- aparência de empresa local séria, qualificada e confiável;
- design pensado primeiro para conversão de visitantes em contatos pelo WhatsApp.

Centralize cores, telefone, textos principais e demais dados fáceis de personalizar no código sempre que fizer sentido.

## Header

Crie um header inspirado na referência:

- logo genérica/placeholder à esquerda;
- navegação no desktop: **Início**, **Serviços**, **Sobre**, **Contato**;
- CTA destacado **Solicitar orçamento** com ícone do WhatsApp;
- estado ativo da seção com pequeno indicador azul;
- header responsivo;
- em mobile, usar navegação compacta/menu apropriado sem comprometer o CTA.

Não invente telefone real, CNPJ ou redes sociais de uma empresa específica.

## Hero

O hero deve causar impacto imediatamente.

No desktop:

- texto no lado esquerdo;
- imagem de um técnico trabalhando em ar-condicionado split no lado direito;
- boa integração entre imagem e fundo;
- CTA visível antes da dobra.

Use como texto principal:

> **Conforto e climatização com serviço de confiança.**

Texto de apoio:

> Instalação, manutenção, higienização e reparo de ar-condicionado com atendimento profissional.

CTA:

> **Solicitar orçamento**

O botão deve abrir um link genérico de WhatsApp com mensagem pré-preenchida, deixando o número claramente marcado no código como placeholder para troca posterior.

Exemplo de mensagem:

> Olá! Vi o site e gostaria de solicitar um orçamento para serviço de ar-condicionado.

### Imagem do hero

Use a referência somente para orientar composição e enquadramento. Se já houver uma imagem adequada fornecida no projeto, reaproveite-a. Caso contrário, crie um placeholder bem dimensionado e deixe evidente onde a imagem final deve ser substituída.

Não use imagens externas quebráveis como dependência crítica do layout.

## Faixa de diferenciais

Logo abaixo do hero, crie uma faixa/card horizontal semelhante à referência, com quatro diferenciais e ícones consistentes:

1. **Serviço profissional e qualificado**
2. **Trabalho com qualidade**
3. **Atendimento rápido e eficiente**
4. **Compromisso com sua satisfação**

No mobile, reorganize os itens sem gerar scroll horizontal.

## Seção “Nossos serviços”

Crie quatro cards principais:

### Instalação

Instalação de ar-condicionado com segurança, acabamento e padrão técnico para o melhor desempenho do equipamento.

### Manutenção preventiva

Manutenções periódicas para prevenir falhas, preservar o desempenho e aumentar a vida útil do aparelho.

### Higienização

Limpeza completa do equipamento, removendo sujeira e impurezas acumuladas e contribuindo para um ar mais limpo.

Evite promessas médicas ou sanitárias absolutas.

### Reparo

Diagnóstico e correção de falhas com agilidade para recuperar o funcionamento e o conforto do ambiente.

Cada card deve possuir:

- ícone relacionado ao serviço;
- título;
- descrição curta;
- interação hover discreta no desktop;
- excelente leitura no mobile.

## Seção “Sobre”

Adicione uma seção curta que apresente a empresa protótipo sem inventar anos de mercado, quantidade de clientes, certificações ou números não fornecidos.

Sugestão:

> **Climatização com cuidado em cada detalhe**
>
> Atendimento focado em qualidade, organização e transparência, desde a avaliação do serviço até a entrega. Soluções para residências e pequenos estabelecimentos, sempre buscando segurança e eficiência.

Inclua de 3 a 4 benefícios visuais, como:

- atendimento residencial e comercial;
- instalação cuidadosa;
- manutenção preventiva;
- orçamento facilitado pelo WhatsApp.

## Área de atendimento

Crie uma faixa de alto contraste em azul inspirada no bloco inferior da referência.

Título:

> **Atendimento em Salvador e região**

Texto:

> Entre em contato para consultar disponibilidade de atendimento na sua localidade.

Inclua ícone de localização e novo CTA para WhatsApp.

Como este é um protótipo reutilizável, deixe **Salvador e região** simples de substituir por outra cidade/região.

## Seção de contato / CTA final

Antes do footer, inclua um último bloco de conversão:

> **Seu ar-condicionado precisa de atendimento?**

> Fale pelo WhatsApp, explique o que precisa e solicite seu orçamento.

CTA principal: **Chamar no WhatsApp**.

Não crie formulário que dependa de backend.

## WhatsApp flutuante

Adicione botão flutuante do WhatsApp:

- canto inferior direito;
- visível sem ser excessivamente grande;
- `aria-label` adequado;
- mesmo link/mensagem dos demais CTAs;
- não deve cobrir conteúdo importante no mobile;
- respeitar `safe-area` em dispositivos compatíveis.

## Footer

Crie um footer simples com:

- nome/logo placeholder da empresa;
- atalhos para seções;
- aviso de protótipo/demonstração quando apropriado;
- crédito obrigatório:

> **Desenvolvido por Lamarc Tech**

O crédito deve ser clicável e apontar para:

`https://cassianolamarc.com.br/`

Abrir de maneira segura quando configurado para nova aba (`rel="noopener noreferrer"`).

## Responsividade

O site deve funcionar muito bem em:

- smartphones pequenos;
- smartphones comuns;
- tablets;
- notebooks;
- monitores desktop.

Requisitos:

- sem overflow horizontal;
- hero reorganizado de forma elegante no mobile;
- títulos sem cortes;
- imagens responsivas sem distorção;
- cards reorganizados em grid adequado;
- CTAs fáceis de tocar;
- menu funcional em telas menores;
- não apenas “encolher” o desktop: reorganizar a experiência para mobile.

## Implementação

Priorize uma implementação leve.

- HTML5 semântico.
- CSS organizado e responsivo.
- JavaScript vanilla apenas quando necessário.
- Não introduza framework pesado sem necessidade.
- Use CSS Grid/Flexbox.
- Evite animações pesadas.
- Use `loading="lazy"` nas imagens abaixo da dobra.
- Defina dimensões/aspect ratio de imagens para reduzir layout shift.
- Não dependa de backend.
- Não exponha chaves, tokens ou segredos.
- Todos os caminhos de assets devem funcionar corretamente em `/prototipos/refrigeracao/`.

Se o repositório já tiver convenções de tecnologia/estrutura aplicáveis a `prototipos`, respeite-as.

## Ícones

Use uma única biblioteca leve já presente no projeto ou SVGs inline consistentes.

São necessários ícones para:

- WhatsApp;
- instalação;
- manutenção;
- higienização;
- ferramentas/reparo;
- localização;
- qualidade/profissionalismo;
- atendimento rápido;
- satisfação.

Não use emoji como substituto dos ícones principais.

## SEO e protótipo

Como a página é de demonstração e não deve competir no Google com sites de clientes, inclua:

```html
<meta name="robots" content="noindex, nofollow">
```

Ainda assim:

- use `<title>` descritivo;
- meta description;
- hierarquia correta de headings;
- somente um `h1`;
- HTML semântico.

## Acessibilidade

- contraste adequado;
- foco visível para teclado;
- textos alternativos nas imagens relevantes;
- botões/links com nomes acessíveis;
- tamanho confortável das áreas de toque;
- respeitar `prefers-reduced-motion`;
- não depender apenas da cor para comunicar estados.

## Performance

O protótipo precisa abrir rapidamente quando enviado a um possível cliente pelo WhatsApp.

- comprima/otimize imagens;
- prefira WebP/AVIF quando aplicável;
- evite bibliotecas grandes;
- minimize JS;
- evite efeitos que prejudiquem celulares modestos;
- sem vídeos automáticos ou recursos pesados desnecessários.

## Conteúdo e caráter de demonstração

Este é um **protótipo comercial reutilizável**. Portanto:

- não use nome de empresa real sem instrução;
- não invente avaliações/depoimentos de clientes;
- não invente certificações;
- não invente CNPJ;
- não invente preços;
- não invente telefone real;
- marque dados variáveis de forma clara no código;
- deixe simples substituir nome, logo, telefone, cidade, textos e imagens quando o protótipo for adaptado para um prospect.

## Checklist antes de concluir

Antes de considerar a tarefa concluída:

1. Verifique que `cassianolamarc.com.br/` e os arquivos da raiz não foram alterados indevidamente.
2. Verifique que `/prototipos/politico/` e outros protótipos existentes permanecem intactos.
3. Confirme que a nova página está isolada em `/prototipos/refrigeracao/`.
4. Valide navegação por âncoras.
5. Valide todos os CTAs de WhatsApp.
6. Confirme que não existe telefone real deixado por engano.
7. Teste desktop e mobile.
8. Verifique overflow horizontal.
9. Verifique console do navegador e links/assets quebrados.
10. Confirme `noindex, nofollow`.
11. Confirme o crédito/link para Lamarc Tech.
12. Faça uma revisão visual comparando o resultado com a imagem de referência.

## Resultado esperado

Entregue um protótipo visualmente forte e convincente para que Cassiano possa enviar diretamente a donos de empresas de refrigeração/ar-condicionado como demonstração.

A página deve transmitir rapidamente:

**profissionalismo + confiança + serviço técnico + facilidade para pedir orçamento pelo WhatsApp.**

Ao finalizar, informe objetivamente:

- quais arquivos foram criados/alterados;
- a rota local criada;
- como personalizar nome, WhatsApp, cidade e imagens;
- qualquer ponto que ainda dependa de conteúdo real do futuro cliente.
