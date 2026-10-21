# Lamarc English — Avaliador de inglês escrito

## Instrução para implementação

Implemente esta especificação no site existente de Cassiano Lamarc. Entregue o código funcional completo, não apenas um protótipo ou explicação. Use exclusivamente HTML5, CSS3 e JavaScript puro, sem Angular, React, TypeScript, backend, banco de dados, APIs pagas ou etapa obrigatória de build. Antes de alterar o projeto, examine sua estrutura e preserve as páginas e convenções existentes.

Destino previsto: `https://cassianoLamarc.com.br/Lamarc-english/`. Centralize domínio, marca e autoria em um arquivo de configuração para permitir correções sem alterar a lógica. Não suponha acesso ao servidor nem publique sem que isso faça parte da tarefa de implementação.

Marca: **Lamarc English**. Autoria: **Desenvolvido por Cassiano Lamarc**. Site do autor: `https://cassianoLamarc.com.br`.

## Objetivo e limites da avaliação

Criar uma avaliação gratuita de compreensão escrita, gramática e vocabulário, com resultado indicativo entre abaixo de A1 e C2. Duração máxima padrão: 15 minutos, com 24 perguntas objetivas. Interface em português do Brasil; questões e textos em inglês.

Não avaliar listening, pronúncia, conversação nem produção escrita livre. Não chamar o resultado de fluência comprovada, certificação oficial ou equivalência validada ao CEFR/QECR. Exibir: “Estimativa de nível em leitura, gramática e vocabulário. Não avalia compreensão oral, fala ou produção escrita e não substitui uma avaliação completa.”

As faixas e cortes abaixo são regras iniciais do produto, não uma escala psicométrica validada. C1/C2 devem aparecer como indícios nas habilidades avaliadas, com recomendação de avaliação complementar. Realizar revisão pedagógica e pilotagem antes de anunciar precisão ou uso em seleção profissional.

## Fluxo de telas

1. **Apresentação:** marca, explicação curta, habilidades avaliadas, duração, quantidade de questões, privacidade e botão “Começar avaliação”. Nome de exibição opcional, com até 60 caracteres. Sem login ou cadastro obrigatório, pois não há backend.
2. **Avaliação:** uma questão por tela, alternativas, indicador “Questão X de 24”, progresso, tempo restante, botões anterior/próxima e opção “Não sei”. Permitir revisão antes de finalizar. Não revelar acertos durante a prova.
3. **Revisão:** questões respondidas e pendentes; navegar para qualquer uma; confirmar envio se houver pendências.
4. **Resultado:** nome opcional, nível estimado, acertos/24, percentual, resultado por nível, tempo utilizado, data, interpretação e sugestões de estudo. Ações: baixar imagem, compartilhar, relatório PDF, revisar respostas e refazer.
5. **Correção:** enunciado, resposta escolhida, correta e explicação em português. Disponível somente depois da finalização.

Ao esgotar 15 minutos, finalizar uma única vez; pendências contam como incorretas. Aviso discreto aos 2 minutos restantes; não anunciar cada segundo a leitores de tela. A avaliação é cronometrada, mas pode oferecer antes do início um modo sem limite por acessibilidade; registrar “Modo sem limite” no resultado, sem misturar tempos comparativos.

## Banco de questões e distribuição

Entregar banco inicial de **120 questões originais: 20 por nível A1, A2, B1, B2, C1 e C2**, incluídas nos arquivos do projeto. Não entregar placeholders, bancos vazios ou questões a serem buscadas posteriormente. O apêndice contém 24 questões iniciais; produzir as outras 96 seguindo o mesmo esquema e revisar todas.

Cada tentativa contém quatro questões por nível, totalizando 24. Em cada nível, sortear duas de gramática, uma de vocabulário e uma de leitura. Para permitir essa distribuição, cada nível do banco deve conter dez de gramática, cinco de vocabulário e cinco de leitura. Cada questão de leitura deve ter seu próprio texto curto e independente. Textos longos não cabem no limite total de 15 minutos.

Apresentar blocos em dificuldade crescente A1 → C2; sortear questões e ordem dentro de cada bloco. Embaralhar alternativas preservando os respectivos IDs e gabaritos. Não usar posição fixa da resposta correta. Cada questão tem exatamente quatro alternativas e somente uma correta; “Não sei” é uma ação adicional, não uma alternativa do banco.

Cobertura pedagógica esperada:

| Nível | Conteúdos |
| --- | --- |
| A1 | be, pronomes, artigos, presente simples, números, rotina e informações pessoais |
| A2 | passado simples, futuro básico, comparativos, quantificadores e situações cotidianas |
| B1 | present perfect versus passado, condicionais usuais, relativas, modais e inferências simples |
| B2 | passiva, reported speech, modal perfect, concessão, collocations e argumentos |
| C1 | inversão, estruturas enfáticas, registro, coesão e posicionamento implícito |
| C2 | nuances lexicais, pragmática, ambiguidades, retórica e inferências complexas |

C1/C2 não podem consistir apenas em palavras raras ou gramática isolada. Incluir contexto suficiente para que uma única interpretação seja defensável. Conteúdo original, sem copiar exames comerciais. Revisar ambiguidade, variedade britânica/americana e adequação do nível; aceitar variantes legítimas ao redigir os distratores.

## Sorteio e prevenção de repetição

Usar Fisher–Yates, nunca `sort(() => Math.random() - 0.5)`. Manter histórico dos IDs apresentados em `localStorage`, por versão do banco, nível e habilidade. Registrar exposição no início da tentativa, inclusive se abandonada. Não repetir questão dentro de uma prova.

Para cada cota, priorizar questões nunca apresentadas. Quando a reserva se esgotar, reiniciar o ciclo daquele nível/habilidade e evitar questões da tentativa imediatamente anterior sempre que houver alternativas suficientes. Impedir a repetição do conjunto completo da tentativa anterior quando houver combinações disponíveis.

Não prometer “nunca repetir”: um banco finito precisa ser reutilizado. A garantia vale apenas no mesmo navegador, enquanto os dados locais forem preservados. Outra aba deve reler o histórico antes de um novo sorteio. Tratar eventos `storage` e evitar início simultâneo quando possível, sem alegar exclusão perfeita entre abas.

Salvar tentativa ativa, ordem das alternativas, respostas e horário final absoluto em `sessionStorage`. Recarregar deve oferecer “Continuar avaliação” ou “Iniciar outra avaliação”; continuar preserva perguntas e tempo, iniciar outra sorteia novo conjunto. Não reiniciar o cronômetro no reload. Calcular o tempo por timestamp, não por contagem de intervalos; atualizar ao voltar de aba suspensa. Tentativa expirada é finalizada ao retornar. Não persistir nome sem necessidade; limpar sessão ao encerrar ou por ação do usuário.

Se armazenamento estiver bloqueado, a aplicação continua em memória e informa discretamente que não poderá preservar histórico ao sair. JSON corrompido não pode quebrar a página. Disponibilizar “Limpar meus dados deste navegador”.

## Pontuação e estimativa

Cada questão vale um ponto. Resposta errada, “Não sei” ou pendente vale zero; sem pontuação negativa.

- Score geral: `Math.round(acertos / 24 * 100)`.
- Por nível: acertos/4 e percentual.
- Nível atingido: maior nível consecutivo, começando em A1, com pelo menos três acertos nas quatro questões em cada nível até ele.
- Se A1 tiver menos de três acertos: “Abaixo de A1 — resultado indicativo”.
- Se houver lacuna em nível inferior e bom resultado posterior: preservar o nível consecutivo e exibir “Seu desempenho foi irregular entre os níveis; uma avaliação complementar pode esclarecer seu nível”.
- Para C1/C2 usar “Indícios de C1/C2 nas habilidades avaliadas” no texto explicativo.

Exemplos verificáveis: `[3,3,3,1,0,0]` → B1; `[4,2,4,4,3,3]` → A1 com desempenho irregular; `[2,0,0,0,0,0]` → abaixo de A1; `[4,4,4,4,4,4]` → C2 indicativo. O percentual geral não determina sozinho o nível.

Mostrar que quatro itens por faixa oferecem uma estimativa breve e sujeita a variação entre tentativas. Recomendações locais por faixa: fundamentos A1/A2, consolidação B1/B2 e refinamento de leitura/registro C1/C2, sem promessas comerciais inventadas.

## Resultado compartilhável

Gerar imagem PNG diretamente com Canvas, sem capturar a interface inteira. Dois formatos: Story 1080×1920 e feed 1080×1350. Usar margens generosas, fonte legível, contraste e quebra de nomes longos. Aguardar carregamento das fontes e evitar imagens externas que contaminem o canvas.

A imagem contém: Lamarc English, “Meu resultado em inglês escrito”, nome se preenchido, nível estimado, acertos e percentual, data, endereço da avaliação, “Desenvolvido por Cassiano Lamarc” e aviso compacto “Resultado indicativo • leitura, gramática e vocabulário”. Não incluir respostas ou dados locais na URL.

Botão “Compartilhar resultado”: tentar compartilhar arquivo PNG via recursos nativos do navegador somente quando suportados. Usar detecção de recursos e tratar cancelamento como cancelamento, sem erro vermelho. Quando não houver suporte, baixar a imagem e permitir copiar texto e link.

Instagram: oferecer “Baixar para Instagram” e orientar a anexar a imagem em Story ou publicação. Não prometer postagem automática ou abertura garantida do editor com arquivo anexado. WhatsApp: compartilhar arquivo pela folha nativa quando disponível; fallback de texto/link e download separado. Abrir uma URL de WhatsApp não deve ser descrito como envio automático da imagem.

Texto sugerido: “Fiz a avaliação de inglês escrito da Lamarc English! Resultado estimado: {nivel} — {percentual}% de acertos. Faça a sua: {url}”.

## Relatório PDF sem dependências obrigatórias

Criar página/seção de relatório HTML com CSS de impressão em A4 e botão “Imprimir / salvar PDF”, usando o diálogo do navegador. Explicar que o usuário seleciona “Salvar como PDF”, se a opção estiver disponível. Não apresentar isso como download direto de PDF.

O relatório inclui marca, nome opcional, data, duração ou modo sem limite, nível, score geral, tabela por nível, habilidades avaliadas, recomendações, aviso de estimativa e autoria com endereço do site. Aplicar `@media print`, remover navegação, botões e fundos desnecessários, controlar quebras e evitar cortes de texto. Não chamar de certificado oficial. PDF binário com download direto fica fora da v1 estritamente sem bibliotecas; só adicionar mediante mudança explícita do requisito.

## Estrutura e contratos de dados

Estrutura sugerida, adaptável ao repositório existente:

```text
Lamarc-english/
  index.html
  css/styles.css
  css/print.css
  js/config.js
  js/questions.js
  js/storage.js
  js/quiz.js
  js/scoring.js
  js/share.js
  js/app.js
  README.md
```

JavaScript em módulos ES; caminhos relativos compatíveis com subdiretório. Servir via HTTP em desenvolvimento, não depender de `file://`. Sem SPA router obrigatório, sem interceptar rotas do site pai. CSS isolado sob `.Lamarc-english` e sem alterar estilos globais do portfólio.

Contrato de questão:

```js
{
  id: 'a1-g-001',
  level: 'A1',
  skill: 'grammar', // grammar | vocabulary | reading
  passage: null,
  prompt: 'She ___ a teacher.',
  options: [
    { id: 'a', text: 'is' },
    { id: 'b', text: 'are' },
    { id: 'c', text: 'am' },
    { id: 'd', text: 'be' }
  ],
  correctOptionId: 'a',
  explanationPt: 'Com she, usamos is no presente do verbo be.'
}
```

Usar estado explícito: intro, answering, reviewing, finished. `finishAttempt()` deve ser idempotente. Persistir IDs de alternativas, nunca índices após embaralhar. Validador do banco verifica IDs únicos, níveis e habilidades válidos, quatro opções com IDs únicos, gabarito existente, explicação e cota mínima de cada grupo. Falha de banco bloqueia início com mensagem amigável e diagnóstico no console.

## Interface, acessibilidade e privacidade

Visual moderno, acolhedor e educacional: azul profundo, branco e um acento vibrante; sem criar logo ou credenciais institucionais fictícias. Mobile first, funcional desde 320 px, com botões confortáveis. Respeitar identidade visual existente quando houver.

Usar `fieldset`, `legend`, inputs radio e labels acessíveis. Navegação completa por teclado, foco visível, foco direcionado ao título da próxima questão, mensagens de erro associadas ao campo e preferência por movimento reduzido. Não depender somente de cor para indicar correção. Marcar textos em inglês com `lang="en"` e documento em `pt-BR`.

Não solicitar e-mail, CPF ou login. Não enviar nome/respostas a serviços externos. Compartilhar somente após ação do usuário, com prévia do resultado. Renderizar texto do usuário via `textContent`, sem `innerHTML`. Limitar tamanho do nome. Não incluir analytics, cookies de marketing ou scripts externos por padrão.

Explicar no README que gabaritos e cálculo estão disponíveis no navegador, resultados são alteráveis pelo usuário e não servem como prova antifraude. Nome igual não identifica uma pessoa. Sem backend não há contas, sincronização entre dispositivos ou verificação pública autenticada.

## Critérios de aceite e entrega

- Página existente preservada e nova rota funcionando em subdiretório.
- 120 questões completas e revisadas, vinte por nível, nas cotas de habilidades definidas.
- 24 questões por tentativa; ordem de alternativas muda sem afetar correção.
- Tentativas sucessivas priorizam inéditas; esgotamento não trava nem repete dentro da prova.
- Reload permite continuar corretamente ou iniciar novo conjunto; relógio não reinicia.
- Expiração, envio manual e eventos concorrentes não duplicam resultado.
- Casos de pontuação fornecidos produzem o nível previsto.
- Resultado, PNG e impressão apresentam os mesmos dados e avisos.
- Imagem legível nos dois formatos, incluindo nome longo e nome vazio.
- Fallback de compartilhamento funciona sem suporte a arquivos; cancelamento não é tratado como falha.
- Impressão A4 sem botões, conteúdo cortado ou páginas vazias adicionais.
- Teclado, mobile, armazenamento bloqueado/corrompido e retorno de aba suspensa verificados.
- README explica execução local, integração, edição do banco, regra de pontuação, limites e checklist de verificação.

Entregar todos os arquivos prontos, resumo das alterações e verificações realizadas. Não afirmar que testes foram executados se não foram. Não adicionar backend, login ou dependências para contornar restrições.

## Apêndice — 24 questões iniciais obrigatórias

Formato: nível / habilidade; enunciado ou texto; alternativas A–D; resposta; explicação. Converter ao contrato acima e complementar até 120. A classificação é editorial inicial, sujeita à revisão pedagógica.

### A1

1. Gramática — She ___ a teacher. A) is B) are C) am D) be. **A**. Com she, usamos is.
2. Gramática — I ___ coffee every morning. A) drinks B) drink C) drinking D) drank. **B**. O presente simples com I usa drink.
3. Vocabulário — Your mother's sister is your ___. A) uncle B) cousin C) aunt D) niece. **C**. Aunt significa tia.
4. Leitura — “The shop opens at nine in the morning and closes at five in the afternoon.” When does the shop close? A) 9 a.m. B) 12 p.m. C) 3 p.m. D) 5 p.m. **D**. Five in the afternoon corresponde a 17h.

### A2

5. Gramática — We ___ to the beach yesterday. A) go B) went C) gone D) going. **B**. Yesterday indica passado; o passado de go é went.
6. Gramática — This bag is ___ than mine. A) heavy B) heaviest C) heavier D) more heavier. **C**. O comparativo de heavy é heavier.
7. Vocabulário — You need to buy medicine. Where should you go? A) A bakery B) A library C) A garage D) A pharmacy. **D**. Pharmacy é farmácia.
8. Leitura — “Tom missed the bus, so he walked to school. He arrived ten minutes late.” Why was Tom late? A) He missed the bus. B) School started later. C) He lost his shoes. D) The school was closed. **A**. O texto relaciona a perda do ônibus ao atraso.

### B1

9. Gramática — I have lived here ___ 2020. A) for B) since C) during D) by. **B**. Since introduz o início de um período que chega ao presente.
10. Gramática — If it rains tomorrow, we ___ at home. A) stayed B) would stayed C) will stay D) had stayed. **C**. Condicional real futura: if + presente, will + verbo.
11. Vocabulário — Could you look after my dog while I'm away? “Look after” means ___. A) search for B) run behind C) look at D) take care of. **D**. Look after significa cuidar.
12. Leitura — “Maya used to drive to work. Since moving closer to the office, she cycles instead.” What changed? A) She now cycles to work. B) She works from home. C) She moved farther away. D) She bought a new car. **A**. A mudança permitiu que ela substituísse o carro pela bicicleta.

### B2

13. Gramática — I wish I ___ more time to finish this report today. A) have B) had C) will have D) am having. **B**. Wish + passado expressa desejo sobre uma situação presente diferente.
14. Gramática — He ___ the email; he has already replied to it. A) can't have read B) shouldn't read C) must have read D) needn't have read. **C**. A resposta é evidência para uma dedução sobre o passado.
15. Vocabulário — The company decided to ___ the launch until June. A) bring up B) carry out C) turn down D) put off. **D**. Put off significa adiar.
16. Leitura — “Although subscriptions increased, revenue fell because most new users chose the discounted plan.” Which conclusion is supported? A) More subscriptions did not result in more revenue. B) Every user paid less. C) The company stopped offering full-price plans. D) Subscriptions decreased. **A**. O aumento de assinaturas coexistiu com queda de receita; o texto não faz as outras afirmações.

### C1

17. Gramática — Not until the meeting ended ___ the mistake. A) she noticed B) did she notice C) she had notice D) had she noticing. **B**. A expressão negativa inicial provoca inversão com auxiliar.
18. Gramática — Had I known about the delay, I ___ a later train. A) take B) would take C) would have taken D) had taken. **C**. Had I known equivale a if I had known numa condicional contrafactual passada.
19. Vocabulário — Her support was qualified: she approved the principle but questioned the cost. Here, “qualified” means ___. A) professionally certified B) enthusiastic and unconditional C) legally required D) limited by reservations. **D**. O contraste indica apoio com ressalvas.
20. Leitura — “The proposal is certainly ambitious. Whether ambition alone will compensate for the absence of a funding plan remains to be seen.” The writer's attitude is ___. A) skeptical about its feasibility B) certain of its success C) indifferent to its funding D) opposed to ambition in general. **A**. O autor reconhece a ambição, mas põe em dúvida a viabilidade sem financiamento.

### C2

21. Gramática — So little weight ___ to the objections that the decision was announced without further discussion. A) they gave B) did they give C) they had giving D) gave they. **B**. A expressão restritiva antecipada exige inversão; o auxiliar permite a construção ativa completa.
22. Gramática — The chair insisted that the report ___ before any vote could take place. A) was circulating B) has circulated C) be circulated D) circulates. **C**. Insist com sentido de exigir admite subjuntivo mandativo; a passiva é be circulated.
23. Vocabulário — Calling the disruption “a slight inconvenience” was a masterpiece of understatement: the entire rail network had stopped. “Understatement” refers to ___. A) an overly technical account B) a direct accusation C) an unsupported prediction D) a deliberately restrained description. **D**. A descrição reduz a gravidade do ocorrido, produzindo o efeito retórico.
24. Leitura — “The committee congratulated itself on consulting widely, though the only submissions quoted in its report were those endorsing the policy it had already drafted.” What criticism is implied? A) Consultation may have served to legitimize a predetermined position. B) No consultation took place. C) Every submission rejected the policy. D) The committee had no policy before consultation. **A**. A seleção de manifestações favoráveis sugere validação seletiva; não prova ausência de consulta nem unanimidade contrária.
