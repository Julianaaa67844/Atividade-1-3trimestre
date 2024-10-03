// Parte 1: Função getCSS
const getCSS = (variavel) => {
    const bodyStyles = getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(variavel);
};

const tickConfig = {
    family: getCSS('--font'),
    size: 16,
    color: getCSS('--primary-color')
};

// Parte 2: Visualizar Informações de Qualidade do Ar
const url = 'https://api.waqi.info/feed/geo:40.712776; -74.005974/?token=YOUR_API_TOKEN'; // Substitua YOUR_API_TOKEN pelo seu token de API

async function visualizarInformacoesQualidadeAr() {
    const res = await fetch(url);
    const dados = await res.json();

    if (dados.status !== 'ok') {
        console.error('Erro ao obter dados da API');
        return;
    }

    const qualidadeAr = dados.data.aqi; // AQI - Índice de Qualidade do Ar
    const poluicaoPrincipal = dados.data.dominentpol;
    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `A qualidade do ar atual é de <span>${qualidadeAr}</span>, com poluição principal sendo <span>${poluicaoPrincipal}</span>.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

// Parte 3: Exibir Gráficos de Dados de Qualidade do Ar
async function exibirGraficoQualidadeAr() {
    const trace1 = {
        x: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'], // Exemplo de meses
        y: [50, 60, 55, 70, 80, 90], // Exemplo de índices de qualidade do ar
        mode: 'lines+markers',
        type: 'scatter',
        line: {
            color: getCSS('--secondary-color'),
            width: 3
        }
    };

    const layout = {
        title: 'Variação do Índice de Qualidade do Ar Mensal',
        xaxis: { title: 'Mês', tickfont: tickConfig },
        yaxis: { title: 'Índice de Qualidade do Ar (AQI)', tickfont: tickConfig },
        paper_bgcolor: getCSS('--bg-color'),
        plot_bgcolor: getCSS('--bg-color')
    };

    const data = [trace1];
    Plotly.newPlot('graficos-container', data, layout);
}

// Chamadas para exibir os dados e o gráfico
visualizarInformacoesQualidadeAr();
exibirGraficoQualidadeAr();

