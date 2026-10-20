# entre pautas — comparação factual dos programas no TSE

Aplicação estática em `/entre-pautas/`, integrada ao site de Cassiano Lamarc. Usa HTML, CSS e módulos JavaScript nativos, sem build, banco de dados ou servidor de aplicação. O questionário apresenta a resposta do visitante ao lado dos registros dos programas disponibilizados nas páginas do TSE para as eleições de 2026.

## Base atual

Há **oito perguntas**, em uma única pesquisa **Planos TSE 2026**. Cada uma tem apoio documentado dos dois programas ao recorte comum apresentado. Os instrumentos, prioridades e públicos podem diferir: apoio ao tema não significa concordância integral com a política do outro programa. Não se deduz oposição a partir de silêncio.

As páginas de origem, PDFs, títulos, datas disponíveis, mapeamento por pergunta e ressalvas estão em [TSE-SOURCES.md](TSE-SOURCES.md). Os resumos são paráfrases curtas. As páginas dos PDFs são contadas a partir de 1. Não foi identificada data de publicação explícita; a interface mostra **Publicação não informada; consulta em 2026-10-20**. A data de consulta não é apresentada como data do documento.

`data.js` preserva o catálogo anterior de 40 perguntas em `archivedProposals`; seus enunciados e as duas comparações históricas de 2023 não aparecem no questionário atual. As oito perguntas foram reescritas para corresponder aos recortes comuns documentados. As antigas opções de 10, 25 e 40 perguntas foram removidas.

`plans.js` contém os programas e suas citações. `eligibility.js` exige posição `favor` ou `against` documentada para cada pessoa, data de conferência e uma fonte utilizável. Fonte com publicação desconhecida só é aceita quando isso está explicitamente marcado, com consulta, ano do programa, URL do TSE e páginas válidas. A validação estrutural não substitui revisão editorial da autoria e do recorte.

O filtro é aplicado antes do sorteio. Perguntas com posição desconhecida, condicional ou documentação insuficiente de um dos dois ficam fora. Uma sessão sem perguntas é rejeitada e a interface desabilita o início se a seleção estiver vazia.

## Resultado e saídas

A tela final informa **cobertura documental**: são oito perguntas com registros dos dois, nenhuma de apenas um e nenhuma sem confirmação. Portanto, mostra **100% de cobertura para cada pessoa**. O valor não depende de o visitante responder A favor, Contra, Depende ou Sem opinião. Não há cálculo de afinidade ou indicação de vencedor.

As duas fotos têm destaque equivalente. O compartilhamento aparece antes do acordeão **Propostas, respostas e documentos**, inicialmente fechado. A tabela contém proposta, resposta do visitante, posição de cada programa, páginas, fontes, consulta e ressalvas. A revisão mantém a ordem sorteada e as respostas da sessão.

As ações disponíveis são:

- **Compartilhar nas redes:** prepara uma imagem de resumo; o segundo toque abre o compartilhamento nativo quando suportado.
- **Baixar imagem:** PNG de resumo de 1080 × 1920 com cobertura, fotos, site e Instagram, sem respostas individuais nem expectativa opcional.
- **Baixar TXT:** comparação completa com respostas, citações e expectativa opcional.
- **Baixar imagens completas:** ZIP de páginas PNG com respostas, documentos, referências e contexto.

## Executar e verificar

Sirva a raiz do repositório por HTTP e abra `/entre-pautas/`. Módulos ES não funcionam abrindo o HTML diretamente por `file://`. Para os testes, com Node 20+:

```powershell
cd entre-pautas
npm ci
npm test
npm run test:browser
```

Playwright é dependência somente de desenvolvimento. O teste de navegador inicia e encerra seu próprio servidor local e usa Chrome instalado. Para Edge: `$env:PLAYWRIGHT_CHANNEL = 'msedge'`. Capturas e downloads ficam em `test-results/`, ignorado pelo Git; a publicidade é simulada.

Os testes unitários verificam os oito IDs, arquivo editorial, citações próprias de cada programa, páginas, publicação desconhecida e consulta separadas, exclusões por documentação insuficiente, sessão vazia, sorteio e revisão, cobertura invariável, lacunas de um ou dos dois, TXT, paginação, ZIP, compartilhamento e anúncios com mocks. O teste de navegador percorre as oito perguntas e verifica fontes, ausência dos enunciados antigos, acordeão, fotos, PNG/TXT/ZIP, cobertura após revisão, foco, larguras de tela e privacidade.

## Organização

- `candidates.js`, `plans.js`, `eligibility.js`, `data.js`: pessoas, programas, documentação, critério de inclusão, arquivo e perguntas disponíveis.
- `evidence.js`: registros históricos do catálogo arquivado.
- `session.js`: Fisher–Yates uma vez por sessão e respostas por ID, sem persistência.
- `score.js`: comparação documental e cobertura; o nome histórico foi preservado, sem pontuação de afinidade.
- `app.js`, `details.js`, `style.css`: telas, acordeão, revisão, modal com retorno de foco e respostas por teclado.
- `report.js`, `export-image.js`, `zip.js`: TXT, PNG de resumo, páginas completas e ZIP local sem compressão com CRC-32; textos extensos são divididos em blocos que cabem nas páginas.
- `share.js`: compartilhamento nativo, cancelamento e alternativa por download.
- `ads.js`: espaços persistentes fora de `#app`, sem reinicialização por pergunta.

Fotos locais com origem e licenças em [assets/candidates/ATTRIBUTION.md](assets/candidates/ATTRIBUTION.md): Lula, Ricardo Stuckert/PR (CC BY 2.0); Flávio, Carlos Moura/Agência Senado (CC BY-SA 4.0). As composições exportadas são identificadas como CC BY-SA 4.0. Manrope e DM Sans são locais, com licenças OFL em `assets/fonts/`.

## Privacidade e publicidade

Respostas e expectativa ficam somente na memória da aba, sem cookies, localStorage, sessionStorage, login ou analytics da aplicação. Recarregar ou fechar encerra a sessão. A aplicação não as inclui em URLs, logs ou parâmetros de anúncios. Downloads e compartilhamento dependem de ação do visitante; relatórios completos podem conter suas respostas. A hospedagem recebe requisições normais de arquivos.

O snippet do AdSense com `ca-pub-7735416610367320` permanece no HTML. Ele carrega independentemente de `adConfig.enabled` e pode tratar dados técnicos e cookies conforme configurações e consentimento aplicáveis. Os blocos manuais continuam desativados; os espaços exibem Publicidade / Espaço disponível. Anúncios automáticos dependem da aprovação e das configurações do painel Google. Nenhum anúncio real é clicado nos testes.

A ativação de blocos manuais depende da revisão de privacidade, consentimento válido em tempo de execução, aprovação da conta e IDs reais dos slots de `ads.js`. `consentGranted` é uma trava técnica e não implementa uma CMP; não deve ser fixado como atalho para consentimento. Respostas e comparação não devem alimentar publicidade. Criar `ads.txt` somente com o registro exato fornecido no painel.

## Publicação

Usar o fluxo GitHub Pages já associado a `cassiano-lamarc/me`, preservando domínio e `CNAME`. Não é necessário migrar stack ou cadastrar um novo Site. Não publicar `node_modules/` ou `test-results/`. Alterações e verificações locais não implicam publicação.
