# entre pautas — comparação factual

Aplicação estática em /entre-pautas/, integrada ao site existente. HTML, CSS e módulos JavaScript, sem build ou servidor de aplicação. Hospedagem GitHub Pages e domínio preservados.

A ferramenta apresenta propostas, a resposta do visitante e registros públicos de Lula e Flávio Bolsonaro, lado a lado, com fontes, datas e contexto. Não calcula afinidade, coincidências, percentuais ou vencedor e não recomenda voto. A cobertura conta perguntas com documentos dos dois, de apenas um ou de nenhum, independentemente das respostas.

## Executar e verificar

Sirva a raiz do repositório por HTTP e abra /entre-pautas/. Módulos ES não funcionam por file://. Para os testes, use Node 20+:

```powershell
cd entre-pautas
npm ci
npm test
npm run test:browser
```

O teste de navegador usa Playwright de desenvolvimento e Chrome instalado. Para Edge, configure PLAYWRIGHT_CHANNEL=msedge. O servidor local de teste é encerrado ao terminar. Publicidade é simulada. Resultados e capturas ficam em test-results/, ignorado pelo Git. O diagnóstico opcional `node tests/published.mjs` acessa o site público e compara os arquivos com a árvore local atual; não publica alterações.

## Dados e limites

Veja [AUDIT.md](AUDIT.md) para cobertura antes/depois, diagnóstico do site publicado, cada fonte adicionada e todas as lacunas. A base cobre atos históricos e manifestações específicas, sem certificar posições atuais ou candidaturas registradas. Fonte insuficiente permanece “Posição não confirmada”. Ausência de voto não é tratada como oposição ou abstenção.

Posições documentadas exigem fonte HTTPS, data, resumo, contexto e conferência. As descrições novas são contextuais e não classificações binárias do tema. Coautoria, voto e sanção são identificados pelo que comprovam; não se presumem equivalentes. A cobertura é apenas documental.

## Fluxo e exportações

Níveis aninhados de 10, 25 e 40 perguntas. Fisher–Yates é executado uma vez por sessão; IDs estáveis preservam as respostas ao voltar e revisar. Mais perguntas não garantem maior cobertura.

O resultado mostra uma tabela com proposta, resposta escolhida e documentos de cada candidato, além das fotos com destaque equivalente. A tabela permite rolagem horizontal no celular. Fontes e ressalvas ficam visíveis em cada célula.

As ações Compartilhar nas redes e Baixar imagem geram o resumo da cobertura com as duas fotos. Baixar TXT salva todas as perguntas, respostas, fontes e ressalvas. Baixar imagens completas gera um ZIP com páginas PNG do mesmo conteúdo factual. A paginação mantém a identificação da pergunta em cada bloco, inclusive quando uma pergunta ocupa mais de uma página. Todos usam compareDocuments, de score.js, sem fórmulas duplicadas. A expectativa opcional não altera o modelo nem aparece nas imagens.

O primeiro toque de compartilhamento prepara a imagem; o seguinte abre o compartilhamento nativo de arquivo quando disponível. Caso contrário, a alternativa é baixar a imagem. Não há envio automático.

## Privacidade e autoria

Respostas e expectativa ficam apenas na memória da aba. Sem login, localStorage, sessionStorage ou envio de respostas em URLs, eventos ou anúncios. Fechar/recarregar encerra a sessão. Publicidade externa pode tratar dados técnicos conforme suas configurações; veja a explicação abaixo.

Fotos e fontes tipográficas são locais. [Atribuições das fotos](assets/candidates/ATTRIBUTION.md). Fotos: Lula — Ricardo Stuckert/PR (CC BY 2.0); Flávio Bolsonaro — Carlos Moura/Agência Senado (CC BY-SA 4.0). A composição exportada é CC BY-SA 4.0. Fontes Manrope e DM Sans têm suas licenças OFL em assets/fonts/.

## AdSense — snippet instalado; blocos manuais desativados

O proprietário forneceu o snippet com `ca-pub-7735416610367320`, instalado no `<head>` da home do domínio e do Entre Pautas. Esse script carrega independentemente de `adConfig.enabled`, que controla somente os blocos manuais. O loader reutiliza o snippet existente. Nenhuma aprovação foi presumida. Anúncios automáticos dependem da aprovação e das configurações do painel. Slots manuais continuam vazios e seus espaços mostram “Publicidade / Espaço disponível”. Não foi criado `ads.txt` sem o registro fornecido pelo painel.

Após obter os dados reais no painel, o proprietário precisa:

1. Revisar as políticas, a elegibilidade e o tratamento de informações sensíveis deste contexto; obter aprovação da conta e do site. A comparação política nunca pode alimentar segmentação.
2. Revisar a privacidade e integrar um mecanismo real de consentimento aplicável. `consentGranted` é uma trava técnica, **não uma implementação de CMP**; deve refletir a decisão válida em tempo de execução e permanecer `false` até lá. Não ligar essa flag permanentemente como atalho.
3. O `clientId` já está preenchido. Para blocos manuais, fornecer os IDs reais em `slots.home`, `slots.quizTop` e `slots.result` de `ads.js`. Definir `approved` e `privacyReviewed` somente após cumprir essas etapas, além de `enabled`. Essas flags não bloqueiam o snippet estático nem anúncios automáticos do painel.
4. Confirmar a instalação do snippet e solicitar/verificar a revisão no painel do AdSense. Se o painel solicitar `ads.txt`, fornecer o registro **exato** para adicionar na raiz do domínio, preservando linhas existentes.
5. Manter a privacidade atualizada conforme as configurações reais do painel. Não conectar candidatos, comparação, expectativa ou respostas à configuração de anúncios.

O loader carrega o script oficial uma vez; cada contêiner só recebe uma unidade e um `push`. Navegação, detalhes e seleção não reinicializam nem atualizam unidades. Sem preenchimento, bloqueio ou falha de rede não impedem o quiz. Não há timers de atualização. Nenhum anúncio foi testado com cliques reais.

Referências oficiais consultadas em 20/10/2026: [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API), [share e ativação do usuário](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share), [canShare](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare), [conexão ao AdSense](https://support.google.com/adsense/answer/7584263?hl=pt-BR), [posicionamento de anúncios](https://support.google.com/adsense/answer/1346295?hl=pt-BR), [publicidade personalizada e informações sensíveis](https://support.google.com/publisherpolicies/answer/15101728?hl=pt-BR). A URL de [revisão/aprovação fornecida](https://support.google.com/adsense/answer/12131223?hl=pt-BR) não retornou conteúdo acessível nesta conferência; verificar no painel antes de ativar.


## Publicação

Alterações desta etapa estão locais. Publicar pelo fluxo GitHub Pages existente de cassiano-lamarc/me, preservando CNAME, domínio e branch configurado. Não incluir node_modules/ ou test-results/. Não é necessário cadastrar ou migrar para Sites.
