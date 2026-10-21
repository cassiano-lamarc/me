// Linhas editoriais: enunciado | correta | distratores (3) | explicação | texto opcional.
import { levels } from './config.js';
const extra = {
A1: {
grammar: [
['They ___ from Brazil.','are','is','am','be','They usa are.'],
['___ name is Julia.','Her','She','Hers','Herself','Her é o possessivo que acompanha name.'],
['This is ___ apple.','an','a','two','many','Apple começa com som de vogal: an.'],
['He ___ in a bank.','works','work','working','to work','No presente simples, he exige works.'],
['___ you speak English?','Do','Does','Are','Is','Perguntas no presente com you usam do.'],
['We ___ not tired.','are','is','am','be','We combina com are; a negativa é are not.'],
['There ___ one chair in the room.','is','are','am','be','One chair é singular: there is.'],
['I have two ___.','brothers','brother','brothering','brothered','Após two, usamos o plural brothers.']
],
vocabulary:[
['What number comes after eleven?','Twelve','Ten','Nine','Eight','Twelve é doze, o número após onze.'],
['You sleep in a ___.','bed','cup','shoe','plate','Bed significa cama.'],
['Which day comes after Monday?','Tuesday','Sunday','Friday','Saturday','Tuesday é terça-feira, após segunda-feira.'],
['We eat breakfast in the ___.','morning','evening','night','midnight','Breakfast é a refeição da manhã.']
],
reading:[
['What is Anna’s job?','A nurse','A teacher','A driver','A cook','O texto diz que Anna é enfermeira.','My name is Anna. I am a nurse. I work in a hospital.'],
['How does Ben go to work?','By bus','By car','On foot','By train','Ben informa que vai de ônibus.','I live in a small town. I go to work by bus every day.'],
['What colour is the cat?','Black','White','Green','Blue','O gato é descrito como preto.','Lisa has a black cat and a white dog. The cat is small.'],
['Where is the book?','On the table','Under the chair','In the bag','By the door','O texto localiza o livro sobre a mesa.','Your book is on the table. Your bag is under the chair.']
]
},
A2:{
grammar:[
['We ___ a film last night.','watched','watch','watching','watches','Last night pede passado simples: watched.'],
['Look at those dark clouds. It ___ rain.','is going to','going','will to','is go','A previsão com evidência presente usa is going to.'],
['There isn’t ___ milk in the fridge.','any','many','a few','a','Milk é incontável; na negativa usamos any.'],
['How ___ apples do you need?','many','much','any','little','Apples é contável plural: how many.'],
['This is the ___ room in the hotel.','smallest','smaller','small','more small','The e a comparação com todo o hotel pedem superlativo.'],
['___ you visit your grandmother yesterday?','Did','Do','Does','Are','Pergunta no passado simples usa did.'],
['I ___ dinner when you called at seven.','was cooking','cook','am cooking','cooks','A ação em andamento no passado usa was cooking.'],
['You ___ wear a seat belt in this car; it is required.','must','may','might','could','A obrigação expressa pelo contexto pede must.']
],
vocabulary:[
['At the station, you buy a ___ before boarding.','ticket','recipe','pillow','menu','Ticket é a passagem usada no transporte.'],
['The opposite of expensive is ___.','cheap','crowded','heavy','late','Cheap significa barato.'],
['A person who serves food in a restaurant is a ___.','waiter','pilot','dentist','farmer','Waiter é o profissional que atende e serve no restaurante.'],
['You are thirsty. You need something to ___.','drink','wear','read','carry','Thirsty significa com sede: precisa beber.']
],
reading:[
['When will the library open on Saturday?','At ten','At eight','At nine','At six','O aviso dá o horário de sábado como dez.','The library opens at eight on weekdays. On Saturdays it opens at ten and closes at six.'],
['Why is Sara selling her bicycle?','She is moving away','It is broken','She has two bicycles','She dislikes cycling','A razão explicitada é a mudança.','Bicycle for sale: good condition, used for one year. Selling because I am moving to another country. Contact Sara.'],
['What should guests bring?','A towel','Dinner','A chair','A tent','A mensagem pede toalha; comida será fornecida.','Join us at the pool on Sunday. We will provide lunch. Please bring your own towel.'],
['Which train should Alex take?','The 9:30 train','The 9:00 train','The 10:00 train','The 11:30 train','O trem das nove foi cancelado e o próximo sai às nove e meia.','Alex, the 9:00 train is cancelled. The next one leaves at 9:30. Take that one and I will meet you.']
]
},
B1:{
grammar:[
['I ___ that film twice, so I know the ending.','have seen','have saw','am seeing','see yesterday','Have seen liga experiências passadas ao presente.'],
['We ___ to Rome in 2019.','went','have gone','have been','going','O ano concluído pede passado simples.'],
['If I had more free time, I ___ a language course.','would take','will take','had taken','take yesterday','Hipótese presente: if + passado, would + verbo.'],
['The woman ___ lives next door is a doctor.','who','which','where','whose','Who retoma uma pessoa como sujeito da relativa.'],
['You ___ smoke here; it is forbidden.','must not','do not have to','might','should','Must not expressa proibição; não é ausência de obrigação.'],
['When I was a child, I ___ play in this park every day.','used to','am used to','use','was use to','Used to descreve um hábito passado.'],
['She has been studying ___ three hours.','for','since','at','by','For introduz duração; since introduziria o início.'],
['The room is empty. Everyone ___ already left.','has','have','is','are','Everyone é singular e o particípio left usa has.']
],
vocabulary:[
['We have run out of bread. This means we ___.','have no bread left','have baked bread','have bought extra bread','have hidden the bread','Run out of significa esgotar o estoque.'],
['Could you give me a hand with this box? The speaker wants ___.','help','permission to leave','a measurement','a receipt','Give someone a hand é ajudar alguém.'],
['The meeting takes place every week. It is ___.','weekly','daily','monthly','yearly','Weekly significa semanal.'],
['I need to make up my mind. I need to ___.','decide','apologize','sleep','repeat','Make up one’s mind significa decidir.']
],
reading:[
['What can visitors now do?','Book visits online','Visit without booking','Enter at midnight','Borrow the exhibits','A mudança permite reserva online, mantendo a exigência de reservar.','The museum still requires advance booking. Previously, visitors had to phone; they can now reserve a time on its website.'],
['Why did the team change its meeting time?','To include a colleague abroad','To finish work earlier','To avoid all online meetings','To reduce the team size','O novo horário foi escolhido para a colega em outro fuso participar.','The team moved its meeting from 9 a.m. to noon so that their colleague in another time zone could join without waking up at dawn.'],
['What does Leo plan to do?','Try a shorter route first','Give up walking','Buy a car immediately','Run the longest route','Leo ajusta o plano para começar com um percurso menor.','Leo wanted to walk ten kilometres each morning, but found it too tiring. Next week he plans to start with three and build up gradually.'],
['What is the main reason for the notice?','To ask residents to save water','To announce cheaper water','To close every kitchen','To sell new taps','O aviso pede economia devido à manutenção.','Water pressure may be low tomorrow during repairs. Please avoid using washing machines until the work is complete and use only the water you need.']
]
},
B2:{
grammar:[
['The bridge ___ in 1998 and is still in use.','was built','has built','was building','built','A ponte recebe a ação no passado: was built.'],
['She said she ___ the documents the previous day.','had sent','will send','has send','is sending','O envio anterior ao relato pede past perfect.'],
['___ the heavy rain, the match continued.','Despite','Although','Even','Whereas','Despite aceita sintagma nominal; although exigiria oração.'],
['You ___ bought milk; we already had plenty.','need not have','must not have','cannot have','would not','Need not have indica uma ação feita sem necessidade.'],
['If we had left earlier, we ___ the train.','would have caught','will catch','would catch tomorrow','had catch','Condicional contrafactual passada usa would have + particípio.'],
['By this time tomorrow, we ___ the installation.','will have completed','have completed yesterday','had completing','will completing','Uma ação concluída antes de um ponto futuro usa future perfect.'],
['I would rather you ___ this matter confidential.','kept','keep yesterday','will keep','have keeping','Would rather + sujeito diferente pede passado para preferência presente.'],
['The manager had the broken window ___ by a specialist.','replaced','replace','replacing','to replace','A construção causativa have something done usa particípio.']
],
vocabulary:[
['The findings ___ doubt on the original theory.','cast','do','make','set','Cast doubt on significa pôr em dúvida.'],
['We need to ___ a balance between speed and accuracy.','strike','hit at','perform','put on','Strike a balance é a combinação usual para equilibrar fatores.'],
['The plan is feasible: it can be ___ with the resources available.','carried out','turned down','given away','broken into','Feasible significa viável; carried out é executado.'],
['The new rule came into ___ on Monday; it is now legally binding.','force','strength','energy','powerful','Come into force é entrar em vigor.']
],
reading:[
['What limits the claim about productivity?','Only volunteers were studied','The trial lasted one day','No one worked remotely','All staff were surveyed','A seleção voluntária limita a generalização para toda a equipe.','A trial found higher productivity among staff working remotely. However, participants had volunteered for remote work, so the results may not represent all employees.'],
['What is the author’s main point?','Lower prices alone may not attract customers','Price never matters','All shops should close earlier','Customers prefer queues','O texto distingue preço de outros fatores que afetam a escolha.','The shop cut its prices, yet sales barely changed. Customers interviewed outside mentioned inconvenient opening hours and long queues rather than cost.'],
['What does the policy aim to do?','Reduce unnecessary journeys while retaining access','Ban every car journey','Make parking free','Close the town centre','A política restringe deslocamentos opcionais e preserva acesso essencial.','The council will restrict through traffic in the centre, while maintaining access for residents and deliveries. Its aim is to remove avoidable journeys, not to stop essential access.'],
['Which conclusion is justified?','The survey does not establish causation','Exercise necessarily improves every grade','Good grades prevent exercise','The groups had identical habits','Associação observada não demonstra causa, sobretudo com fatores não controlados.','Students who exercised regularly had higher grades in a survey. The researchers did not control for sleep or study time and warned against treating the association as proof of cause.']
]
},
C1:{
grammar:[
['Rarely ___ such a clear account of a complex issue.','have I read','I have read','I reading','have read I','Rarely no início exige inversão entre auxiliar e sujeito.'],
['It was the lack of consultation ___ angered residents, rather than the cost itself.','that','what','who','whose','A estrutura enfática it was X that destaca a falta de consulta.'],
['No sooner had the hearing begun ___ the alarm sounded.','than','when','that','as','No sooner combina com than; hardly combinaria com when.'],
['The draft, ___ shortcomings were acknowledged, was nevertheless approved.','whose','which','whom','that','Whose expressa posse e também pode retomar coisas.'],
['Were the grant to be withdrawn, the project ___ to close.','would have','will have','had had','has','A inversão were ... to expressa hipótese remota: would have to.'],
['The evidence is inconclusive; ___, a definitive verdict would be premature.','therefore','nevertheless','likewise','instead of','A segunda oração é consequência da primeira: therefore.'],
['The author appears ___ the objection before the article was published.','to have anticipated','to anticipating','having anticipate','anticipate','O infinitivo perfeito situa a antecipação antes do momento de referência.'],
['Much as I ___ your concern, I cannot endorse the proposed remedy.','understand','understanding','to understand','understood yesterday','Much as + oração finita introduz concessão; understand se ajusta ao presente.']
],
vocabulary:[
['The minister stopped short of endorsing the scheme: she praised its aims but withheld approval. She ___.','did not fully commit to supporting it','formally approved it','rejected its aims entirely','ended the scheme immediately','Stopped short of indica que não chegou a endossar.'],
['The evidence is compelling, though not conclusive. It is ___.','strongly persuasive without settling the matter','irrelevant to the argument','certain to be fabricated','sufficient to remove all doubt','Compelling indica força persuasiva; a ressalva preserva a incerteza.'],
['His apology rang hollow after he repeated the same conduct. It seemed ___.','insincere','inaudible','legally binding','unexpectedly detailed','Ring hollow descreve algo que não soa sincero ou convincente.'],
['The report takes issue with the assumption, while accepting the data. It ___ the assumption.','challenges','documents without comment','implicitly adopts','refuses to mention','Take issue with significa contestar, não rejeitar necessariamente os dados.']
],
reading:[
['What reservation does the writer express?','The measure of success excludes an important outcome','Attendance figures were invented','Public lectures have no value','Visitors were forbidden to speak','A crítica é ao critério estreito que não mede compreensão.','The museum calls its lecture series a success because attendance doubled. That is welcome, but whether visitors left with a deeper understanding is a question the attendance figures cannot answer.'],
['How does the writer position the review?','As formally thorough but limited in practical influence','As a binding order for immediate change','As a refusal to consult anyone','As evidence that reform is unnecessary','O contraste entre minúcia e falta de compromisso sugere influência prática limitada.','The review is meticulous, with an appendix for almost every conceivable objection. The board has welcomed it warmly and committed itself to implementing none of its recommendations.'],
['What does the qualification suggest?','Agreement may reflect how choices were framed','Participants were not asked anything','Every participant wanted the same policy','The poll proves stable public support','A alternativa única favorece o plano e limita a interpretação do apoio.','Most respondents supported the plan when the alternative was described as doing nothing. The poll did not ask whether they would prefer a different reform.'],
['What is the writer implying about the deadline?','It may prioritize an appearance of action over readiness','It was chosen by the technical team','It guarantees a reliable launch','It has already been postponed','A coincidência com o discurso, em vez de uma justificativa técnica, sugere prioridade política.','Engineers requested another month of testing. The launch date, officials explained, had to coincide with the annual policy speech. Readiness, it seems, has acquired a rather convenient calendar.']
]
},
C2:{
grammar:[
['The editor called the figures provisional, lest readers ___ them for final results.','mistake','mistook yesterday','had mistaking','to mistake','Lest introduz prevenção e admite subjuntivo sem flexão: mistake.'],
['Such ___ the force of her evidence that even her opponents withdrew their objections.','was','were','did','had','A construção invertida such was the force enfatiza a força singular.'],
['The panel would have dismissed the claim, ___ for the newly discovered letter.','had it not been','if it were','were it','if not it had','Had it not been for expressa uma condição contrafactual passada.'],
['In the sentence “The director, rather than the advisers, ___ accountable”, which form completes the formal agreement?','is','are','have been','were being','O núcleo do sujeito é director; rather than não o torna plural.'],
['The agreement requires that each party ___ notified before any amendment takes effect.','be','is being yesterday','has being','was been','A exigência formal admite subjuntivo mandativo: be notified.'],
['Only when the accounts had been independently checked ___ willing to sign.','was the trustee','the trustee was','the trustee being','had the trustee willing','Only when inicial exige inversão na oração principal: was the trustee.'],
['The witness denied ___ the document before the hearing, although a dated receipt suggested otherwise.','having seen','to have seen','to seeing','have saw','Deny rege gerúndio; having seen indica anterioridade.'],
['“I would sooner resign than approve it.” Which paraphrase preserves the speaker’s preference?','I would prefer to resign rather than approve it.','I will resign immediately after approving it.','I would approve it if I could resign later.','I resigned before I had a chance to approve it.','Would sooner ... than expressa preferência, não sequência temporal.']
],
vocabulary:[
['“An admirably economical account,” the reviewer wrote, “if one overlooks everything it leaves unexplained.” The praise is best described as ___.','ironic','unqualified','accidental','purely factual','A ressalva mina o elogio e cria ironia.'],
['The negotiator’s carefully worded reply left both sides able to claim support. Its key feature was ___.','strategic ambiguity','unreserved endorsement','a categorical refusal','an explicit concession to one side','A formulação permite leituras distintas úteis à negociação.'],
['The rule is honoured more in the breach than in the observance: staff praise it but routinely ignore it. This means it is ___.','more often broken than followed','universally obeyed','formally abolished','applied only to new staff','O contexto esclarece a expressão: a norma é mais descumprida que observada.'],
['The chair’s “We might perhaps consider finishing” came after three requests to end the meeting. In context, it is ___.','a politely softened directive','a request for research into endings','an expression of complete indifference','a promise to extend the meeting','A sequência de pedidos e a mitigação verbal dão força de diretiva cortês.']
],
reading:[
['What tension does the passage expose?','An apparent safeguard can discourage the scrutiny it promises','Auditors have no formal authority','All relevant records have been destroyed','Independence requires secrecy','O direito formal de perguntar é enfraquecido pela necessidade de justificar cada pergunta ao auditado.','The institution grants auditors unrestricted access, provided each request is first justified to the department being audited. This, the institution says, protects independence while ensuring that no unnecessary questions are asked.'],
['What is the main rhetorical effect of the final sentence?','It undermines the claimed neutrality of the selection','It proves every applicant was assessed unfairly','It endorses reputation as an objective measure','It denies that any criteria existed','A troca de critérios preservando os mesmos favorecidos põe em dúvida a neutralidade, sem provar cada caso.','Selection was said to rest entirely on merit. When asked what merit meant, the panel cited the qualities of those it had already selected. The definition, at least, was remarkably well fitted to its beneficiaries.'],
['Which inference is most defensible?','Public acceptance of the principle need not entail agreement on implementation','Everyone rejects the principle in private','The policy has already been implemented','There is no dispute about costs','O consenso abstrato se desfaz quando surgem consequências concretas.','No speaker opposed fairness. Yet as soon as the discussion turned to who would pay and whose privileges would change, the unanimous principle produced several mutually incompatible policies.'],
['What does the writer suggest about the archive?','Its silences may reflect the conditions under which records were produced','Missing records prove that no dissent existed','Every recorded opinion is false','Officials deliberately destroyed all criticism','O incentivo à conformidade afeta o que foi registrado; silêncio não permite concluir ausência de dissenso.','The archive contains remarkably little dissent. But promotions depended on appearing supportive, and reports were written for superiors. To read the silence as consent would be to forget the audience for whom the documents were composed.']
]
}
};
// O apêndice obrigatório é mantido em seed.js, sem dependências de rede.
import { seed } from './seed.js';
export const questions = [...seed];
for (const level of levels) for (const [skill, rows] of Object.entries(extra[level])) {
  rows.forEach((r, i) => questions.push({id:`${level.toLowerCase()}-${skill[0]}-${i+101}`,level,skill,
    prompt:r[0],options:r.slice(1,5).map((text,j)=>({id:'abcd'[j],text})),correctOptionId:'a',explanationPt:r[5],passage:r[6] || null}));
}
export function validateBank(bank = questions) {
  const ids = new Set();
  for (const q of bank) {
    if (!q.id || ids.has(q.id) || !levels.includes(q.level) || !['grammar','vocabulary','reading'].includes(q.skill) || !q.prompt || !q.explanationPt || (q.skill==='reading' && !q.passage) || q.options?.length!==4 || new Set(q.options.map(o=>o.id)).size!==4 || q.options.some(o=>!o.text) || !q.options.some(o=>o.id===q.correctOptionId)) throw new Error(`Questão inválida: ${q.id}`);
    ids.add(q.id);
  }
  for (const level of levels) for (const [skill,count] of Object.entries({grammar:10,vocabulary:5,reading:5})) {
    if (bank.filter(q=>q.level===level && q.skill===skill).length!==count) throw new Error(`Cota inválida: ${level}/${skill}`);
  }
  return true;
}
