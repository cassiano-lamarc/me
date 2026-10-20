# Consulta por grupos e autoria dos documentos

Os grupos exibidos são **Lula e PT** e **Flávio Bolsonaro e PL**. A ordem editorial é Lula → PT e Flávio → Jair → PL. A primeira referência documental confirmada recebe o rótulo “Referência contextual prioritária”. Todos os responsáveis continuam visíveis, inclusive as posições individuais não confirmadas e os registros das demais prioridades. A ordem não depende das respostas do visitante e não gera pontuação.

Essa é uma organização editorial de documentos. Não certifica alinhamento entre as pessoas, adoção de um programa partidário, promessa de campanha, sucessão eleitoral ou compartilhamento de uma opinião. Um ato de Jair não se torna posição de Flávio; um texto do PT não se torna declaração direta de Lula. A cobertura agora conta grupos com algum documento contextualizado; não conta candidatos com opinião individual confirmada. Propostas partidárias genéricas continuam com ressalvas sobre diferenças de recorte.

## Fontes acrescentadas

- **Jair Bolsonaro — telemedicina:** [Lei 14.510, de 27/12/2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14510.htm), assinada por Jair. Autoriza e disciplina telessaúde, com consentimento e garantia de atendimento presencial. Não prova expansão efetiva das consultas ou financiamento, nem posição de Flávio.
- **PT — atenção básica, creches e ensino integral:** [Rede PT, 06/09/2022](https://pt.org.br/para-lula-a-recuperacao-economica-comeca-pelas-mulheres/), publicação sobre propostas para a rede de cuidados. Não especifica orçamento, parcela federal nas creches ou jornada escolar de sete horas. A autoria permanece identificada como publicação partidária, sem atribuição de uma fala direta a Lula.
- **PL — conectividade:** [aprovação do programa partidário, 19/12/2022](https://partidoliberal.org.br/pl-realiza-convencao-nacional-e-aprova-novo-programa-partidario/), nota oficial que lista digitalização e conectividade entre as prioridades. Não confirma a proposta específica de financiamento de internet nas escolas: permanece “Posição não confirmada”. O PDF integral do programa retornou HTTP 403 nesta consulta; não foi simulada leitura do documento.

Conferência das fontes acima: 20/10/2026. São documentos históricos; não certificam posição atual. Os demais recortes de Jair, PL e PT continuam pendentes quando não há fonte cadastrada. A pesquisa não é exaustiva.

## Cobertura dos grupos

| Nível | Dois grupos | Apenas um grupo | Nenhum |
| --- | ---: | ---: | ---: |
| 10 perguntas | 2 | 7 | 1 |
| 25 perguntas | 3 | 11 | 11 |
| 40 perguntas | 3 | 11 | 26 |

As contagens anteriores em AUDIT.md documentam a etapa de comparação individual antes da inclusão de referências contextuais dos grupos.

## Implementação

`group-records.js` separa autores e documentos suplementares. `score.js` organiza as entradas e calcula cobertura dos grupos. Os registros individuais de `data.js`/`evidence.js` são preservados. A tela e o TXT mostram autor, posição documentada ou lacuna, fonte, data e ressalva. As imagens completas usam o mesmo texto; a imagem de compartilhamento usa o resumo documental com os nomes dos grupos. As fotos continuam identificadas como retratos das pessoas.

O acordeão e o botão de compartilhar destacado foram preservados. Os testes verificam a prioridade e impedem que o uso de uma referência contextual altere os dados individuais. Não foi restaurado cálculo de afinidade.

Alterações locais; sem publicação nesta etapa.
