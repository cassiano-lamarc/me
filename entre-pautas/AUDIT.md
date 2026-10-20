# Verificação e migração para comparação factual

Conferência em 20/10/2026. Alterações locais; esta etapa não publicou arquivos nem modificou a configuração do GitHub Pages.

## Diagnóstico da versão publicada

Oito arquivos centrais (`index.html`, `app.js`, `data.js`, `evidence.js`, `score.js`, `report.js`, `export-image.js`, `session.js`) publicados em https://cassianolamarc.com.br/entre-pautas/ eram iguais aos locais antes das alterações, normalizando quebras de linha. Todos retornaram HTTP 200 e tipos HTML/JavaScript adequados. O servidor declara `Cache-Control: max-age=600`; esse cabeçalho sozinho não demonstra erro de cache. Não foi observada mistura de versões.

O Chrome executou dois cenários sintéticos na versão publicada, com publicidade simulada: dez respostas “A favor” produziram 100%/0%, com base de duas perguntas; dez “Depende” produziram —/—. Nenhum erro de JavaScript ou resposta HTTP de falha nos arquivos da aplicação. O relato de 0% para ambos não foi reproduzido, portanto sua causa específica continua não confirmada. Não foi atribuído ao cache.

O problema comprovado era a cobertura limitada da base e a apresentação como placar. A nova implementação elimina pontuação, denominador de afinidade e vencedor. O modelo comum `compareDocuments` organiza cada pergunta e conta documentos, independentemente da resposta. Não foram criados pesos, classificações eleitorais ou recomendações personalizadas.

## Cobertura antes e depois

Contagens descrevem perguntas com registro contextualizado dos dois / de apenas um / de nenhum. Não medem concordância, qualidade equivalente das evidências ou posição atual.

| Nível | Antes: dois / um / nenhum | Depois: dois / um / nenhum |
| --- | --- | --- |
| Simples (10) | 2 / 1 / 7 | 2 / 6 / 2 |
| Média (25) | 2 / 1 / 22 | 3 / 8 / 14 |
| Completa (40) | 2 / 1 / 37 | 3 / 8 / 29 |

## Registros adicionados e ressalvas

Foram acrescentados nove registros confirmados contextualizados (sete de Lula e dois de Flávio), em oito perguntas. Duas fontes adicionais foram mantidas como contexto insuficiente para confirmar posição (Bolsa Família e cotas, Flávio). As perguntas e os níveis foram preservados; a ressalva tributária deixou de mencionar pontuação e as opções de avaliação da consulta foram adequadas ao resultado factual. As fontes originais de intervenção, armas e marco temporal foram preservadas.

As notícias da Agência Gov sobre salário mínimo e moradia estavam temporariamente indisponíveis ao abrir. Foram substituídas pelas respectivas leis oficiais acessíveis. Nenhuma posição de Jair Bolsonaro foi atribuída a Flávio.

### renda-basica

Manter uma transferência de renda federal para famílias de baixa renda, condicionada à frequência escolar e ao acompanhamento de saúde?

**Lula:** Sancionou o Bolsa Família em 2023.
Registro da lei de 2023, não endosso de qualquer valor ou regra posterior. O texto consolidado contém alterações posteriores identificadas.

- [Lei 14.601/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm) — 2023-06-19. Sancionou a transferência condicionada de renda. O art. 10 inclui acompanhamento de saúde e frequência escolar.

**Flávio Bolsonaro:** Posição não confirmada.
Há manifestação sobre financiamento na PEC da Transição, mas ela não confirma posição sobre as condicionalidades desta pergunta. Não foi atribuída oposição ao programa.

- [Pronunciamento de Flávio — PEC da Transição](https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/494920) — 2022-12-07. Defendeu destaque relativo ao financiamento e ao poder de compra do benefício. O encaminhamento não estabelece posição sobre toda a política de renda condicionada.

### escola-integral

Financiar a ampliação da jornada escolar na rede pública para pelo menos sete horas por dia?

**Lula:** Sancionou o Programa Escola em Tempo Integral.
Recorte do programa de 2023. Não comprova efeitos no aprendizado nem disponibilidade atual de vagas.

- [Lei 14.640/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14640.htm) — 2023-07-31. Sancionou assistência técnica e financeira para novas matrículas; a lei considera jornada de pelo menos sete horas diárias ou 35 semanais.

**Flávio Bolsonaro:** Posição não confirmada.
Pesquisa de registros individuais não confirmou posição sobre este recorte. Aprovação coletiva não foi atribuída como voto pessoal.


### salario-minimo

Reajustar o salário mínimo pela inflação somada ao crescimento real da economia, quando positivo?

**Lula:** Sancionou a regra de valorização em 2023.
Descreve a regra sancionada em 2023; não certifica sua vigência sem alterações nem apoio a qualquer limite futuro.

- [Lei 14.663/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14663.htm) — 2023-08-28. Sancionou regra a partir de 2024 que combina INPC e crescimento real do PIB do segundo ano anterior.

**Flávio Bolsonaro:** Posição não confirmada.
Não foi confirmado registro individual sobre a fórmula exata desta pergunta. Pesquisa documental permanece pendente.


### moradia-social

Subsidiar moradia para famílias de baixa renda com recursos do orçamento federal?

**Lula:** Sancionou a retomada do Minha Casa, Minha Vida.
É o programa de 2023, com faixas e modalidades próprias; não se presume apoio a todo modelo de subsídio habitacional.

- [Lei 14.620/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14620.htm) — 2023-07-13. Sancionou o novo programa habitacional, destinado a facilitar acesso à moradia, incluindo subsídios para famílias de menor renda.

**Flávio Bolsonaro:** Posição não confirmada.
Falta confirmação de registro individual para subsídio com recursos orçamentários neste recorte.


### igualdade-salarial

Exigir relatórios de transparência salarial de grandes empresas para fiscalizar desigualdades entre mulheres e homens?

**Lula:** Sancionou lei com transparência salarial.
A sanção abrange um conjunto de medidas. Não representa aprovação de qualquer regulamentação futura.

- [Lei 14.611/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14611.htm) — 2023-07-03. Sancionou lei com mecanismos de transparência e fiscalização da remuneração, incluindo relatórios para empresas com cem ou mais empregados.

**Flávio Bolsonaro:** Anunciou oposição ao PL 1.085/2023 na CAE.
Oposição ao projeto completo não prova oposição isolada aos relatórios. Manifestação na comissão, não voto nominal em Plenário. A fonte descreve relatórios para empresas com cem ou mais empregados.

- [Manifestação na CAE — Agência Senado](https://www12.senado.leg.br/noticias/materias/2023/05/31/igualdade-salarial-entre-mulheres-e-homens-passa-na-cae-e-vai-ao-plenario/) — 2023-05-31. Anunciou voto contrário ao projeto, citando dúvidas sobre efetividade e judicialização; declarou-se favorável à igualdade salarial.

### universidade-cotas

Reservar vagas em universidades federais para estudantes de escolas públicas com critérios sociais e raciais?

**Lula:** Sancionou a revisão da Lei de Cotas.
Registro de uma lei com critérios sociais e raciais combinados; não permite isolar apoio a toda fórmula possível de cotas.

- [Sanção da ampliação das cotas — Agência Senado](https://www12.senado.leg.br/noticias/noticias/materias/2023/11/14/sancionada-ampliacao-da-lei-de-cotas) — 2023-11-13. Sancionou a Lei 14.723/2023, que reformula a reserva de vagas no ensino federal e inclui estudantes quilombolas.

**Flávio Bolsonaro:** Posição não confirmada.
A manifestação sobre preferência por uma emenda não confirma, isoladamente, apoio ou oposição a todos os critérios da pergunta.

- [Pronunciamento de Flávio — PL 5.384/2020](https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/501657) — 2023-10-24. Defendeu preferência para a emenda substitutiva e argumentou pela inclusão de todos os pobres. Não foi convertido em posição geral sobre a política combinada de cotas.

### tributos-consumo

Substituir tributos sobre consumo por um sistema de imposto sobre valor agregado com cobrança federal e regional?

**Lula:** Posição não confirmada.
A pergunta não identifica uma versão legislativa. Ainda falta vincular uma manifestação pessoal ao recorte federal e regional exato, sem equiparar textos distintos.


**Flávio Bolsonaro:** Coautor em 2019; oposição ao texto debatido em 2023.
São projetos e momentos diferentes. Coautoria não é voto nominal. A crítica à versão de 2023 não foi convertida em oposição geral ao IVA ou ao princípio de simplificação.

- [PEC 110/2019 — autoria e tramitação, Senado](https://www25.senado.leg.br/web/atividade/materias/-/materia/137699) — 2019-07-09. O registro identifica Flávio entre os autores da PEC que propõe substituir tributos e criar imposto sobre bens e serviços.
- [Debate da reforma em 2023 — Agência Senado](https://www12.senado.leg.br/noticias/noticias/materias/2023/11/08/reforma-tributaria-posicao-resiste-mas-texto-obtem-apoio-necessario) — 2023-11-08. A Agência Senado o identifica entre os senadores que acompanharam críticas à versão em debate. Isso não caracteriza oposição a toda reforma tributária.

### arcabouco

Vincular o crescimento de despesas federais ao crescimento da receita, com limites mínimo e máximo?

**Lula:** Sancionou o regime fiscal de 2023.
Sanção de um regime específico, com vetos. A pergunta é mais ampla; versões posteriores e texto aprovado no Senado não foram equiparados.

- [Lei Complementar 200/2023 — Presidência](https://www.presidencia.gov.br/ccivil_03/leis/lcp/lcp200.htm) — 2023-08-30. Sancionou regra de crescimento das despesas vinculada à receita, com limites de expansão real e condições ligadas às metas fiscais.

**Flávio Bolsonaro:** Posição não confirmada.
A validação do registro nominal e do texto específico permanece pendente. Não se atribuiu uma posição geral a partir de versões distintas do projeto.


## Lacunas restantes

Esta pesquisa não é exaustiva. A falta de confirmação na base não afirma inexistência de registros públicos. Abaixo estão todas as pendências por pergunta e pessoa. Itens sem fonte continuam explicitamente pendentes de pesquisa/validação, sem data de verificação simulada.

| Pergunta | Posições ainda não confirmadas |
| --- | --- |
| tributos-consumo | Lula |
| renda-basica | Flávio Bolsonaro |
| sus-atencao | Lula; Flávio Bolsonaro |
| escola-integral | Flávio Bolsonaro |
| marco-temporal | Flávio Bolsonaro |
| salario-minimo | Flávio Bolsonaro |
| desmatamento | Lula; Flávio Bolsonaro |
| moradia-social | Flávio Bolsonaro |
| arcabouco | Flávio Bolsonaro |
| creches | Lula; Flávio Bolsonaro |
| universidade-cotas | Flávio Bolsonaro |
| ensino-tecnico | Lula; Flávio Bolsonaro |
| vacinas | Lula; Flávio Bolsonaro |
| telemedicina | Lula; Flávio Bolsonaro |
| saneamento | Lula; Flávio Bolsonaro |
| transporte | Lula; Flávio Bolsonaro |
| energia-renovavel | Lula; Flávio Bolsonaro |
| agricultura-familiar | Lula; Flávio Bolsonaro |
| imposto-renda | Lula; Flávio Bolsonaro |
| violencia-mulher | Lula; Flávio Bolsonaro |
| camera-policial | Lula; Flávio Bolsonaro |
| internet-escolas | Lula; Flávio Bolsonaro |
| jornada-trabalho | Lula; Flávio Bolsonaro |
| aplicativos | Lula; Flávio Bolsonaro |
| previdencia | Lula; Flávio Bolsonaro |
| saude-mental | Lula; Flávio Bolsonaro |
| medicamentos | Lula; Flávio Bolsonaro |
| aborto | Lula; Flávio Bolsonaro |
| drogas | Lula; Flávio Bolsonaro |
| prisao | Lula; Flávio Bolsonaro |
| desastres | Lula; Flávio Bolsonaro |
| povos-indigenas | Lula; Flávio Bolsonaro |
| cultura | Lula; Flávio Bolsonaro |
| dados-pessoais | Lula; Flávio Bolsonaro |
| comercio-exterior | Lula; Flávio Bolsonaro |
| federacao | Lula; Flávio Bolsonaro |
| transparencia | Lula; Flávio Bolsonaro |

## Arquivos alterados

- `app.js`: tabela por pergunta, fotos equivalentes, revisão, consulta às fontes e quatro ações de exportação/compartilhamento.
- `score.js`: substituição integral do cálculo de afinidade pelo modelo de cobertura documental.
- `evidence.js`: fontes novas, resumos, datas e ressalvas; desconhecidos explícitos.
- `data.js`: atualização de uma ressalva e da avaliação opcional, sem alterar IDs, perguntas ou níveis.
- `report.js`: resumo neutro e TXT completo derivados do modelo comum.
- `export-image.js`: PNG de cobertura com as duas fotos e relatório completo paginado com registros, fontes e URLs.
- `index.html`, `style.css`: textos informativos e tabela com rolagem horizontal acessível.
- `tests/core.test.mjs`, `tests/browser.mjs`: invariância da cobertura, fontes, exportações, revisão e fluxos 10/25/40.
- `tests/published.mjs`: diagnóstico opcional e somente leitura do site publicado, sem depender de arquivos de baseline locais.
- `README.md`, `AUDIT.md`: funcionamento atual, diagnóstico, cobertura e lacunas.

## Verificações

`npm test`: nove testes. `npm run test:browser`: Chrome nos três níveis, sem erros JavaScript, com 10/25/40 linhas, fotos equivalentes, ausência de percentuais, TXT, PNG, ZIP das imagens completas, fontes nos relatórios, revisão e preservação da ordem. Capturas verificadas em larguras de 320, 375, 430 e 1280 px. Publicidade simulada, sem cliques em anúncios reais. Nenhum cookie ou armazenamento de respostas criado.

As imagens de resumo omitem respostas individuais e expectativa opcional. O TXT e o ZIP completo incluem respostas por ação explícita do visitante. Os destinos reais do compartilhamento dependem do aparelho; não foi realizado envio a redes sociais.
