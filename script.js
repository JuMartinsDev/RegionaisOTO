document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#form-licitacao');
    const tableBody = document.getElementById('licitacoes-list');
    let editIndex = -1;

   

    

// Função para buscar e processar o arquivo CSV
function carregarCSV() {
    fetch('dados.csv')  // Caminho para o arquivo CSV
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o CSV.');
            }
            return response.text();  // Retorna o conteúdo do CSV como texto
        })
        .then(csvConteudo => {
            const dados = csvParaArray(csvConteudo);  // Converte CSV para array
            gerarTabela(dados);  // Gera a tabela com os dados
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo CSV:', error);
        });
}

// Função para converter CSV para array (usando ; como delimitador)
function csvParaArray(csv) {
    const linhas = csv.split('\n');  // Divide o CSV em linhas
    return linhas.map(linha => linha.split(';'));  // Divide cada linha usando o delimitador ;
}

// Função para gerar a tabela HTML
function gerarTabela(dados) {
    const tabelaContainer = document.getElementById('licitacoes-table-container');
    tabelaContainer.innerHTML = '';  // Limpar qualquer conteúdo anterior

    const tabela = document.createElement('table');
    tabela.id = 'licitacoes-table';

    // Criando o cabeçalho da tabela
    const cabecalho = dados[0];  // A primeira linha do CSV são os cabeçalhos
    const thead = document.createElement('thead');
    const trCabecalho = document.createElement('tr');
    cabecalho.forEach(coluna => {
        const th = document.createElement('th');
        th.innerText = coluna;
        trCabecalho.appendChild(th);
    });
    thead.appendChild(trCabecalho);
    tabela.appendChild(thead);

    // Criando o corpo da tabela
    const tbody = document.createElement('tbody');
    for (let i = 1; i < dados.length; i++) {
        const tr = document.createElement('tr');
        dados[i].forEach(celula => {
            const td = document.createElement('td');
            td.innerText = celula;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
    tabela.appendChild(tbody);

    // Adicionando a tabela ao container
    tabelaContainer.appendChild(tabela);
}

// Chama a função para carregar e processar o CSV quando a página carregar
window.onload = carregarCSV;

});
