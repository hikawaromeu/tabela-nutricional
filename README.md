# Tabela Nutricional Interativa

Bem-vindo ao repositório da Tabela Nutricional Interativa! Este é um projeto front-end desenvolvido para permitir que os usuários consultem informações nutricionais de diversos alimentos e montem refeições personalizadas de forma fácil e intuitiva.

---

## 📖 Descrição Funcional

O objetivo principal desta aplicação é oferecer uma ferramenta prática para o planejamento e acompanhamento nutricional. O usuário pode explorar uma vasta lista de alimentos, visualizar seus dados nutricionais e adicioná-los a uma área de "refeição" para calcular os totais de calorias, carboidratos, proteínas e gorduras.

### ✨ Funcionalidades Principais

*   **Listagem de Alimentos:** Exibe os alimentos em formato de "cards", cada um com suas informações nutricionais detalhadas.
*   **Busca Dinâmica:** Um campo de busca permite filtrar os alimentos em tempo real por nome ou por tags (ex: "fruta", "proteína", "vitamina c").
*   **Montagem de Refeição (Drag and Drop):** O usuário pode arrastar e soltar os cards de alimentos em uma área designada para criar uma refeição personalizada.
*   **Cálculo Nutricional Total (Previsto):** A área da refeição é projetada para, futuramente, somar e exibir os valores nutricionais totais dos alimentos selecionados.
*   **Interface Limpa e Intuitiva:** O design foi pensado para ser simples e direto, facilitando a navegação e o uso das funcionalidades.

---

## 🛠️ Descrição Técnica

Este projeto foi construído utilizando tecnologias web fundamentais (HTML, CSS e JavaScript), sem a necessidade de frameworks externos, focando na manipulação do DOM e na interatividade.

### 🚀 Tecnologias Utilizadas

*   **HTML5:** Para a estruturação semântica da página.
*   **CSS3:** Para a estilização dos componentes, cards e layout geral.
*   **JavaScript (Vanilla):** Responsável por toda a lógica e interatividade da aplicação.
*   **JSON:** O arquivo `data.json` atua como um banco de dados local, armazenando a lista de alimentos e suas respectivas informações nutricionais.

### 🏗️ Arquitetura do Projeto

A lógica da aplicação é centralizada no `script.js`, que executa as seguintes tarefas:

1.  **Carregamento de Dados:** Ao iniciar, o script faz uma requisição (usando `fetch API`) para carregar os dados do arquivo `data.json`.
2.  **Renderização dos Cards:** Os dados carregados são processados e injetados dinamicamente no HTML, criando um card para cada alimento dentro da seção `.card-container`.
3.  **Lógica de Busca:** Um `event listener` no campo de busca filtra os cards exibidos com base no texto digitado pelo usuário, comparando-o com o nome e as `tags` de cada alimento.
4.  **Funcionalidade Drag and Drop:**
    *   Os cards de alimentos são configurados como "arrastáveis" (`draggable=true`).
    *   A seção `#drop-zone` possui `event listeners` para os eventos `dragover` (para permitir que um elemento seja solto sobre ela) e `drop` (para capturar o elemento solto e adicioná-lo à lista da refeição).

### 📂 Estrutura de Arquivos


Estou participando da seleção dos melhores projetos da Imersão Dev com Alura e Google.

O objetivo principal deste projeto é oferecer uma ferramenta prática para o planejamento e informação nutricional de suas refeições. Pessoas que tem uma dieta ou um treinamento com focos específicos, seja passado por profissionais da área ou não. O usuário pode explorar uma vasta lista de alimentos, visualizar seus dados nutricionais e adicioná-los a uma área de "refeição" para calcular os totais de calorias, carboidratos, proteínas e gorduras. Sendo assim, consegue acompanhar o quanto consumiu em certas refeições para controle próprio ou para apresentar no caderno de alimentação ao profissional que está lhe auxiliando. Interface Limpa e Intuitiva: O design foi pensado para ser simples e direto, facilitando a navegação e o uso das funcionalidades.

https://github.com/hikawaromeu/tabela-nutricional
