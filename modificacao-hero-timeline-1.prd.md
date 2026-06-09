# Atualização do Hero e Timeline de Experiências

Realize os seguintes ajustes na landing page para melhorar a apresentação visual e a experiência do usuário.

---

# 1. Remover completamente o card da foto

A foto do Hero NÃO deve ficar dentro de nenhuma caixa, moldura, card, container translúcido ou elemento semelhante.

## Remover

Qualquer estrutura parecida com:

```html
<div class="hero-photo-container">
    <img src="..." />
</div>
```

ou

```css
.hero-photo-container {
    border: ...;
    background: ...;
    backdrop-filter: ...;
}
```

---

# 2. A foto deve fazer parte da composição do Hero

A imagem deve ser tratada como um elemento visual principal da landing page.

Objetivo visual:

* Aparência semelhante a páginas premium de executivos de tecnologia
* Aparência semelhante a fundadores de startups
* Aparência semelhante a pilotos de Fórmula 1 em páginas institucionais
* A pessoa deve parecer fazer parte do layout e não estar dentro de um componente

A imagem deve:

* Ficar livre sobre o background
* Não possuir borda
* Não possuir moldura
* Não possuir card
* Não possuir container visível

---

# 3. Aumentar significativamente o tamanho da foto

A foto atual está pequena.

Aumentar para algo entre:

```css
width: 650px;
```

até

```css
width: 750px;
```

dependendo da resolução.

A imagem deve ocupar aproximadamente:

```text
40% a 45% da largura visível da seção Hero
```

---

# 4. Glow tecnológico atrás da imagem

Adicionar um glow discreto atrás da foto.

Exemplo visual:

```css
.hero-visual::before {
    content: "";

    position: absolute;

    width: 500px;
    height: 500px;

    background:
        radial-gradient(
            circle,
            rgba(59,130,246,.25) 0%,
            rgba(59,130,246,.10) 40%,
            transparent 75%
        );

    filter: blur(80px);

    z-index: -1;
}
```

Objetivo:

* Destacar o profissional
* Integrar a foto ao background
* Criar aparência moderna e premium

---

# 5. Posicionamento da foto

A foto deve:

* Ficar alinhada ao lado direito do Hero
* Ter tamanho dominante
* Não ficar centralizada dentro de uma caixa
* Ficar alinhada ao conteúdo textual

Visual desejado:

```text
+--------------------------------------------------------+
|                                                        |
| Cassiano Lamarc            FOTO GRANDE                 |
| Senior Software Engineer   FOTO GRANDE                 |
| Descrição                  FOTO GRANDE                 |
| Botões                     FOTO GRANDE                 |
|                              FOTO GRANDE               |
+--------------------------------------------------------+
```

E NÃO:

```text
+--------------------------------------------------------+
| Texto                    [ CARD ]                      |
|                          [ FOTO ]                      |
+--------------------------------------------------------+
```

---

# 6. Ajuste da timeline de experiências

A timeline está exibindo:

```text
01/06
02/06
03/06
04/06
05/06
06/06
```

Esse formato não deve existir.

Remover completamente a numeração:

```text
01/06
02/06
03/06
04/06
05/06
06/06
```

---

# 7. Exibir datas reais das experiências

A timeline deve exibir os períodos reais de atuação.

Exemplos:

```text
Nov 2023 – Atual
Jan 2022 – Nov 2023
Ago 2020 – Dez 2021
Jul 2019 – Ago 2020
Nov 2018 – Jul 2019
Dez 2017 – Nov 2018
```

Quando o idioma for inglês:

```text
Nov 2023 – Present
Jan 2022 – Nov 2023
Aug 2020 – Dec 2021
Jul 2019 – Aug 2020
Nov 2018 – Jul 2019
Dec 2017 – Nov 2018
```

---

# 8. Ordem cronológica correta

A timeline atualmente parece estar invertida.

O comportamento desejado é:

## Primeira experiência no topo

```text
Salut
Dez 2017 – Nov 2018
```

## Segunda

```text
Sonda / Petrobras
Nov 2018 – Jul 2019
```

## Terceira

```text
Capgemini
Jul 2019 – Ago 2020
```

## Quarta

```text
LeadLovers
Ago 2020 – Dez 2021
```

## Quinta

```text
Mottu
Jan 2022 – Nov 2023
```

## Última experiência (atual)

```text
G4F
Nov 2023 – Atual
```

---

# 9. Comportamento do scroll da timeline

Manter o comportamento especial:

* A seção fica fixa ao entrar nela
* O scroll altera a experiência exibida
* Cada rolagem avança ou retorna uma experiência
* Ao chegar na última experiência, o scroll normal continua

Porém a navegação deve seguir a ordem cronológica natural:

```text
Salut
↓
Sonda
↓
Capgemini
↓
LeadLovers
↓
Mottu
↓
G4F
```

Assim o visitante acompanha a evolução profissional ao longo da carreira.

---

# 10. Indicador visual da timeline

Adicionar um indicador elegante mostrando progresso da carreira.

Exemplo:

```text
2017 ─────●─────●─────●─────●─────●─────● 2025
```

ou

```text
[ Salut ]
      ↓
[ Petrobras ]
      ↓
[ Capgemini ]
      ↓
[ LeadLovers ]
      ↓
[ Mottu ]
      ↓
[ G4F ]
```

O objetivo é mostrar claramente a evolução profissional ao longo dos anos.

---

# Resultado esperado

A seção Hero deve parecer uma landing page premium internacional, com a foto grande integrada ao layout.

A seção de experiências deve contar uma história evolutiva da carreira, iniciando na Salut e terminando na G4F, exibindo períodos reais de atuação e removendo qualquer numeração artificial como "01/06", "02/06", etc.
