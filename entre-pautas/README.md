# entre pautas — beta

Aplicação estática em `/entre-pautas/`, integrada ao site existente de Cassiano Lamarc. HTML/CSS/JavaScript nativos, sem build, servidor de aplicação, banco ou dependência de execução. A home recebeu apenas um link no rodapé; `CNAME` e a hospedagem existente foram preservados.

**Interface atual:** o resultado oferece somente **Compartilhar nas redes** e **Baixar imagem**. A expectativa opcional aparece depois dessas ações e não entra no PNG. A imagem inclui `@cassianolamarc` e `cassianolamarc.com.br`. O primeiro toque prepara a prévia; o seguinte abre o compartilhamento de arquivo quando suportado. Nos demais aparelhos, a alternativa é baixar a imagem. Não há ações de copiar, compartilhar link, TXT ou relatório completo na interface. Os utilitários internos de TXT/relatório/ZIP descritos abaixo permanecem no código, sem exposição no produto.

## Executar e verificar

Sirva a raiz do repositório por HTTP e abra `/entre-pautas/`. Módulos ES precisam de um servidor HTTP; abrir `index.html` por `file://` não funciona. Não há instalação necessária para publicar.

Para os testes, com Node 20+:

```powershell
cd entre-pautas
npm ci
npm test
npm run test:browser
```

Playwright é uma dependência **somente de desenvolvimento**, nunca carregada no produto. O teste de navegador inicia e encerra seu próprio servidor local e usa Chrome instalado. Para usar Edge: `$env:PLAYWRIGHT_CHANNEL = 'msedge'`. Capturas e downloads de teste ficam em `test-results/`, ignorado no Git. Os testes não acessam anúncios reais.

## Base factual e limites editoriais

**2 comparáveis e 38 exploratórias**, conferência editorial em **20/10/2026**. Os três níveis contêm as mesmas duas comparações; não há ganho de precisão ao ampliar apenas a parte exploratória. Essa limitação aparece na entrada, no questionário, no resultado e nas exportações.

As comparações documentam **atos históricos específicos de 2023**, não certificam posições atuais, candidaturas registradas, planos eleitorais ou intenção de voto:

1. Intervenção federal na segurança do DF em janeiro/2023, incluindo Ricardo Cappelli como interventor. Lula assinou o [Decreto 11.377](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11377.htm). Flávio declarou voto contrário e explicou suas objeções no [pronunciamento de 10/01/2023](https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/495483). Ele também condenou os ataques; sua oposição à medida não é classificada como apoio aos ataques. A fonte de sua posição é uma declaração registrada, não uma lista nominal.
2. Manutenção do Decreto 11.615 na edição de julho/2023. Lula assinou o [ato original](https://legislacao.presidencia.gov.br/atos?ano=2023&ato=bf7cXUE50MZpWT3b4&data=21%2F07%2F2023&numero=11615&tipo=DEC); Flávio apresentou com outros senadores o [PDL 193/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/158826) para sustar seus efeitos. Não atribuímos ao parlamentar um voto inexistente. O [texto consolidado](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11615.htm) contém alterações posteriores e não deve substituir o recorte original.

O marco temporal ilustra uma exclusão: há veto documentado de Lula, mas o [registro de Flávio no PL 2.903/2023](https://www25.senado.leg.br/web/atividade/materias/-/materia/157888/votacoes) é ausência por atividade parlamentar, **não abstenção e não prova de posição**. A pauta não pontua. Arcabouço e reforma tributária também continuam exploratórios: textos e recortes diferentes não foram tratados como automaticamente equivalentes. Nenhuma posição de Jair foi atribuída a Flávio.

Para ampliar a base, adicionar a `evidence.js` fontes atribuíveis à própria pessoa, com data, resumo em paráfrase, recorte, ressalvas e data de conferência. `isComparable` exige fonte e posição binária para ambos; essa validação estrutural não substitui a revisão editorial. Posição condicional ou fonte insuficiente permanece `unknown`. Não repetir artificialmente temas para aumentar seu peso.

## Organização e funcionamento

- `candidates.js`, `data.js`, `evidence.js`: candidatos, 40 pautas neutras com detalhes e listas explícitas aninhadas de 10/25/40; evidências separadas.
- `session.js`, `score.js`: Fisher–Yates uma vez ao iniciar; respostas por ID estável; sem persistência. Cada pauta comparável respondida com favor/contra vale um ponto. Ambos podem pontuar. Percentuais independentes, empates e denominador zero tratados explicitamente.
- `app.js`, `details.js`, `style.css`: telas, revisão, modal nativo com Escape e retorno do foco, radios por teclado, autoria e informações de privacidade/metodologia.
- `report.js`, `export-image.js`, `zip.js`: TXT com todas as fontes; PNG social 1080 × 1920; relatório em páginas de 1080 × 1920 e ZIP sem compressão, implementado localmente com CRC-32. PNGs já são comprimidos; biblioteca externa não é necessária. Quebra por `measureText`, fonte de corpo 28–34 px e blocos indivisíveis por resposta. Páginas desenhadas sequencialmente; canvas liberado após cada PNG. Imagem social cacheada por sessão/revisão e sem expectativa opcional.
- `share.js`: detecção de compartilhamento de arquivos, segundo toque após geração e prévia, link canônico sem respostas como alternativa, cópia com fallback e cancelamento benigno.
- `ads.js`: slots manuais persistentes fora de `#app`, sem recriação por pergunta. O snippet de conexão é carregado pelo HTML e reutilizado pelo loader.

Fotos reais locais, identidade e licença verificadas: [atribuições](assets/candidates/ATTRIBUTION.md). Fontes Manrope e DM Sans locais, obtidas do repositório `google/fonts`, com licenças OFL em `assets/fonts/`. Enquadramento igual na interface; falha de imagem usa iniciais neutras com nome preservado. Composições exportadas são identificadas como CC BY-SA 4.0 para respeitar a licença da fotografia de Flávio.

## Privacidade

Respostas, expectativa e arquivos gerados ficam na memória da aba; a aplicação não os grava em cookies, localStorage ou sessionStorage, nem os envia em URLs, logs, eventos analíticos ou parâmetros de publicidade. Recarregar encerra a sessão. O script externo do AdSense é carregado ao abrir a página e pode tratar dados técnicos, cookies ou tecnologias semelhantes conforme as configurações da conta e o consentimento aplicável. A hospedagem também recebe requisições normais de arquivos. Fontes e fotos são locais. Download e compartilhamento dependem da ação do usuário; a imagem omite a expectativa opcional.

## AdSense — snippet instalado; blocos manuais desativados

O proprietário forneceu o snippet com `ca-pub-7735416610367320`, instalado no `<head>` da home do domínio e do Entre Pautas. Esse script carrega independentemente de `adConfig.enabled`, que controla somente os blocos manuais. O loader reutiliza o snippet existente. Nenhuma aprovação foi presumida. Anúncios automáticos dependem da aprovação e das configurações do painel. Slots manuais continuam vazios e seus espaços mostram “Publicidade / Espaço disponível”. Não foi criado `ads.txt` sem o registro fornecido pelo painel.

Após obter os dados reais no painel, o proprietário precisa:

1. Revisar as políticas, a elegibilidade e o tratamento de informações sensíveis deste contexto; obter aprovação da conta e do site. A comparação política nunca pode alimentar segmentação.
2. Revisar a privacidade e integrar um mecanismo real de consentimento aplicável. `consentGranted` é uma trava técnica, **não uma implementação de CMP**; deve refletir a decisão válida em tempo de execução e permanecer `false` até lá. Não ligar essa flag permanentemente como atalho.
3. O `clientId` já está preenchido. Para blocos manuais, fornecer os IDs reais em `slots.home`, `slots.quizTop` e `slots.result` de `ads.js`. Definir `approved` e `privacyReviewed` somente após cumprir essas etapas, além de `enabled`. Essas flags não bloqueiam o snippet estático nem anúncios automáticos do painel.
4. Confirmar a instalação do snippet e solicitar/verificar a revisão no painel do AdSense. Se o painel solicitar `ads.txt`, fornecer o registro **exato** para adicionar na raiz do domínio, preservando linhas existentes.
5. Manter a privacidade atualizada conforme as configurações reais do painel. Não conectar candidatos, score, expectativa ou respostas à configuração de anúncios.

O loader carrega o script oficial uma vez; cada contêiner só recebe uma unidade e um `push`. Navegação, detalhes e seleção não reinicializam nem atualizam unidades. Sem preenchimento, bloqueio ou falha de rede não impedem o quiz. Não há timers de atualização. Nenhum anúncio foi testado com cliques reais.

Referências oficiais consultadas em 20/10/2026: [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API), [share e ativação do usuário](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share), [canShare](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare), [conexão ao AdSense](https://support.google.com/adsense/answer/7584263?hl=pt-BR), [posicionamento de anúncios](https://support.google.com/adsense/answer/1346295?hl=pt-BR), [publicidade personalizada e informações sensíveis](https://support.google.com/publisherpolicies/answer/15101728?hl=pt-BR). A URL de [revisão/aprovação fornecida](https://support.google.com/adsense/answer/12131223?hl=pt-BR) não retornou conteúdo acessível nesta conferência; verificar no painel antes de ativar.

## Validação realizada

`npm test`: 8 testes de comportamento para níveis, IDs, shuffle, preservação, pontuação incluindo coincidência com ambos, empate/zero/exclusões, expectativa/TXT, paginação/quebra, ZIP, share/clipboard e AdSense com mocks.

`npm run test:browser`: Chrome headless, servidor sob subdiretório; fluxo completo de 10/25/40 perguntas; revisão, foco/Escape e navegação mantendo a pergunta visível; somente duas ações de saída; expectativa abaixo do compartilhamento e ausente no PNG; site e Instagram no PNG, sem texto fora do canvas; download, compartilhamento nativo cancelado e alternativa por download; ausência de requisições externas, cookies e armazenamento. Os testes internos de TXT/ZIP/paginação continuam em `npm test`, sem botões para essas funções na interface atual.

Capturas em 320, 375, 430 e 1280 px; inspeção visual da entrada, pergunta, resultado e relatório. A referência `meu-alinhamento.cacassiano2011911719.chatgpt.site` não abriu neste ambiente, portanto os tokens e padrões do documento fornecido foram usados. Não houve teste em aparelho físico nem envio a Instagram/TikTok; a disponibilidade de apps e o compartilhamento nativo dependem do dispositivo.

## Publicação

Publicar os arquivos pelo fluxo GitHub Pages já associado a `cassiano-lamarc/me`, mantendo domínio, branch configurado e permissões. Não é preciso migrar stack, cadastrar Site no conector Sites ou alterar `CNAME`. A aplicação não importa o script/analytics da home institucional. Não publicar `node_modules/` ou `test-results/`.
