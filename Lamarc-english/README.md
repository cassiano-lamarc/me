# Lamarc English

Aplicação independente em HTML, CSS e JavaScript puro. A pasta `Lamarc-english/` funciona diretamente como subdiretório do site, sem alterar o portfólio, os protótipos, o CNAME ou as rotas existentes. Nenhuma publicação foi realizada. Não depende de build, pacotes, serviços externos ou backend.

## Execução

Sirva a raiz do repositório por HTTP e acesse `/Lamarc-english/`. Por exemplo, se Python estiver disponível: `python -m http.server 8000`, seguido de `http://localhost:8000/Lamarc-english/`. Pode usar qualquer servidor estático equivalente. Módulos ES precisam de HTTP; não abra via `file://`. Publique a pasta inteira no mesmo nível do `index.html` do portfólio para disponibilizar a rota prevista. Nenhuma integração no HTML principal é necessária.

## Configuração e banco

`js/config.js` centraliza marca, autoria, domínio, endereço, duração, aviso e versão do banco. O HTML mantém título e marca como fallback, atualizados pelo módulo. `js/seed.js` contém as 24 questões obrigatórias do apêndice; `js/questions.js` contém as 96 adicionais e o validador. Os dados compactos das adicionais são convertidos ao contrato completo em memória: enunciado, alternativa correta, três distratores, explicação em português e texto independente quando a habilidade é leitura. Os IDs das alternativas são estáveis; a apresentação é embaralhada.

São 20 itens por nível (10 gramática, 5 vocabulário, 5 leitura). A validação bloqueia o início se houver IDs duplicados, opções inválidas, gabarito inexistente, texto/explicação ausentes ou cotas incorretas. Ao editar o banco, preserve IDs para conteúdo equivalente e incremente `bankVersion` quando houver alterações incompatíveis. A revisão editorial inicial não equivale a validação pedagógica externa: revisar dificuldade, nuances e ambiguidade com especialista e pilotar antes de anunciar precisão ou uso profissional.

## Funcionamento

Cada prova sorteia 2 itens de gramática, 1 de vocabulário e 1 de leitura por nível, com Fisher–Yates. O histórico em localStorage é relido em cada início e registra exposição inclusive de tentativas abandonadas. Cada grupo tem ciclo próprio; ao esgotar, reutiliza itens, evitando a tentativa imediatamente anterior quando possível. Web Locks serializa inícios em navegadores compatíveis; um lease curto e eventos storage ajudam nas demais situações, sem exclusão perfeita entre abas. Outra aba preserva sua própria tentativa em sessionStorage.

O estado explícito percorre intro, answering, reviewing e finished. A sessão guarda IDs, ordem de alternativas, respostas e prazo absoluto. O nome fica apenas em memória, não é salvo. Recarregar permite continuar ou sortear outra tentativa; o prazo não reinicia. Sessões vencidas são concluídas ao retornar. A finalização é idempotente. Sem armazenamento, continua em memória com aviso. O botão de limpeza remove somente chaves desta aplicação, incluindo versões anteriores.

Cada acerto vale 1. Erros, “Não sei” e pendências valem 0. O percentual é `Math.round(acertos / 24 * 100)`. O nível é a maior sequência desde A1 com pelo menos 3/4 em cada faixa. Resultados posteriores altos não preenchem uma lacuna inferior; geram aviso de irregularidade. C1/C2 indicam apenas indícios nas habilidades avaliadas. Quatro itens por faixa oferecem uma estimativa sujeita a variação.

## Exportação e privacidade

O Canvas gera PNG 1080×1350 ou 1080×1920, sem imagens externas. A prévia corresponde ao formato selecionado. Instagram exige download e anexo manual. Compartilhamento nativo usa arquivo quando suportado; cancelamento é tratado normalmente. Fallback baixa o PNG e oferece copiar texto/link, com seleção manual se a área de transferência estiver indisponível. WhatsApp por URL envia somente texto/link, sem imagem automática.

O relatório usa HTML com CSS de impressão A4. “Imprimir / salvar PDF” abre o diálogo do navegador; selecione “Salvar como PDF” se disponível. Não é download direto de PDF nem certificado oficial.

Não há login, sincronização, identificação única por nome, verificação pública autenticada ou antifraude. Gabaritos e cálculo estão disponíveis no navegador; o usuário pode alterar os resultados. Nenhum nome ou resposta é enviado para serviços externos. Só compartilhar após ação explícita do usuário. Links de compartilhamento contêm o nível e percentual, nunca o nome ou respostas. Não há analytics, fontes remotas ou cookies de marketing nesta página.

## Verificação

Execute `node Lamarc-english/tests/check.mjs` na raiz (Node 22+ recomendado). O teste valida banco, cotas, exemplos de nível, 100 sorteios, ciclo inicial sem repetição, exclusão da prova anterior, ordem de alternativas, preservação de prazo e respostas, sessão inválida, JSON corrompido, indisponibilidade de armazenamento, modo sem limite, limpeza restrita e finalização idempotente.

Checklist de conferência manual antes de publicar:

- [ ] Fazer o fluxo completo por teclado e conferir foco, leitura dos campos e ausência de anúncio de cada segundo.
- [ ] Conferir em 320px e desktop, sem rolagem horizontal.
- [ ] Recarregar no meio da prova, continuar e conferir prazo; iniciar outra e conferir perguntas diferentes.
- [ ] Deixar o prazo expirar em revisão e com aba suspensa; confirmar um único resultado ao retornar.
- [ ] Abrir duas abas e iniciar provas, com e sem suporte a Web Locks.
- [ ] Baixar os dois PNGs com nome vazio, nome de 60 caracteres e nome sem espaços; conferir legibilidade.
- [ ] Compartilhar em dispositivo compatível, cancelar e testar fallback sem suporte a arquivos.
- [ ] Conferir impressão A4, relatório com e sem nome, sem botões, cortes ou página vazia adicional.
- [ ] Comparar nível, percentual, data e avisos entre tela, PNG e relatório.

As verificações automatizadas não substituem testes visuais, leitores de tela, dispositivos reais ou revisão pedagógica.
