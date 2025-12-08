const cardContainer = document.querySelector(".card-container"); // Seleciona o container dos cards
const searchInput = document.querySelector("div input"); // Seleciona o input de busca
const dropZone = document.getElementById("drop-zone"); // Seleciona a área de drop
const listButton = document.getElementById("botao-busca"); // Seleciona o botão de listagem
let dados = [];

// Função que é chamada quando a página carrega
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json(); // Armazena os dados do JSON na variável global
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função para renderizar os cards na tela
function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar os novos cards

    for (const dado of dados) {
        const article = document.createElement("article");
        article.draggable = true; // Torna o card arrastável
        article.id = `card-${dado.nome.replace(/\s+/g, '-')}`; // Adiciona um ID único

        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.porcao}</p>
            <p>${dado.energia}</p>
            <p>${dado.carbo}</p>
            <p>${dado.proteinas}</p>
            <p>${dado.gordura}</p>
            <p><strong>Tags:</strong> ${dado.tags.join(', ')}</p>`;

        // Adiciona o evento para iniciar o arrasto
        article.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
        cardContainer.appendChild(article);
    }
}

// Função para normalizar texto (remover acentos e converter para minúsculas)
function normalizarTexto(texto) {
    if (!texto) return "";
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Adiciona um "ouvinte" para o evento de digitação no campo de busca
function filtrarDados() {
    const termoBusca = normalizarTexto(searchInput.value); // Normaliza o termo da busca
    const dadosFiltrados = dados.filter(dado => 
        normalizarTexto(dado.nome).includes(termoBusca) ||
        dado.tags.some(tag => normalizarTexto(tag).includes(termoBusca))
    );
    renderizarCards(dadosFiltrados); // Renderiza os cards com os dados filtrados
}

searchInput.addEventListener("input", filtrarDados);

// Adiciona evento ao botão para listar tudo novamente
listButton.addEventListener("click", () => {
    searchInput.value = ""; // Limpa o campo de busca
    renderizarCards(dados);
})

// --- Funcionalidade de Drag and Drop ---

// Previne o comportamento padrão para permitir o drop
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('drag-over'); // Adiciona classe para feedback visual
});

// Remove o feedback visual quando o item sai da zona de drop
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

// Lida com o evento de soltar o card
dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('drag-over');
    const id = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);

    if (draggableElement) {
        const clone = draggableElement.cloneNode(true); // Clona o card
        clone.removeAttribute('draggable'); // O clone não precisa ser arrastável
        clone.classList.add('card-in-zone'); // Adiciona uma classe para estilização e eventos

        // Adiciona evento para remover o card ao clicar
        clone.addEventListener('click', () => {
            clone.remove();
            atualizarTotais();
        });

        // Adiciona o clone ao final da área de seleção (abaixo dos totais e botões)
        dropZone.appendChild(clone);
        
        atualizarTotais(); // Atualiza os totais
    }
});

// --- Funções para cálculo de totais ---

function atualizarTotais() {
    const cardsNaZona = dropZone.querySelectorAll('article');
    let totais = { energia: 0, carbo: 0, proteinas: 0, gordura: 0 };

    cardsNaZona.forEach(card => {
        const textoEnergia = card.querySelector('p:nth-of-type(2)').textContent;
        const textoCarbo = card.querySelector('p:nth-of-type(3)').textContent;
        const textoProteinas = card.querySelector('p:nth-of-type(4)').textContent;
        const textoGordura = card.querySelector('p:nth-of-type(5)').textContent;

        // Função auxiliar para extrair número do texto
        const extrairNumero = (texto) => parseFloat(texto.match(/[\d,.]+/)[0].replace(',', '.')) || 0;

        totais.energia += extrairNumero(textoEnergia);
        totais.carbo += extrairNumero(textoCarbo);
        totais.proteinas += extrairNumero(textoProteinas);
        totais.gordura += extrairNumero(textoGordura);
    });

    const containerTotais = document.getElementById('total-nutrientes');
    containerTotais.innerHTML = `
        <h3>Totais da Seleção:</h3>
        <p><strong>Valor Energético:</strong> ${totais.energia.toFixed(1)} kcal</p>
        <p><strong>Carboidratos:</strong> ${totais.carbo.toFixed(1)} g</p>
        <p><strong>Proteínas:</strong> ${totais.proteinas.toFixed(1)} g</p>
        <p><strong>Gorduras:</strong> ${totais.gordura.toFixed(1)} g</p>
    `;
}

// --- Funções para os botões da Drop Zone ---

// Cria e adiciona os botões de ação na drop zone
function criarBotoesDropZone() {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'drop-zone-actions';

    // Botão para reiniciar a seleção
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.textContent = 'Reiniciar Seleção';
    resetButton.addEventListener('click', () => {
        const cardsInDropZone = dropZone.querySelectorAll('article');
        cardsInDropZone.forEach(card => card.remove());
        atualizarTotais(); // Zera os totais
    });

    // Botão para imprimir a seleção
    const printButton = document.createElement('button');
    printButton.id = 'print-button';
    printButton.textContent = 'Imprimir Seleção';
    printButton.addEventListener('click', () => {
        window.print();
    });

    actionsContainer.appendChild(resetButton);
    actionsContainer.appendChild(printButton);
    dropZone.appendChild(actionsContainer);

    // Cria o container para exibir os totais e o insere após os botões
    const totalsContainer = document.createElement('div');
    totalsContainer.id = 'total-nutrientes';
    // Insere o container de totais logo após o container de ações
    actionsContainer.insertAdjacentElement('afterend', totalsContainer);
}

// Adiciona estilos para a impressão
function adicionarEstilosDeImpressao() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            /* Esconde elementos que não devem ser impressos */
            body > header,
            body > main > .card-container,
            body > footer,
            .drop-zone-actions {
                display: none !important;
            }

            /* Reseta o layout do body e main para a impressão */
            body, main {
                margin: 0 !important;
                padding: 0 !important;
                background-image: none !important;
                display: block !important;
                color: black !important; /* Garante que todo o texto seja preto */
            }

            /* Ajusta a drop-zone para ocupar todo o espaço de impressão */
            #drop-zone {
                position: static !important;
                border: none !important;
                box-shadow: none !important;
                max-height: none !important;
                overflow: visible !important;
                background-color: transparent !important; /* Remove cor de fundo */
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicia o processo ao carregar o script
carregarDados();
criarBotoesDropZone();
adicionarEstilosDeImpressao();
atualizarTotais(); // Calcula os totais iniciais (zero)
