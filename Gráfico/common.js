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

// Parte 2: Vizualizar Informações Climáticas
const url = 'https://api.climateapi.com/api/v1/global'; // Exemplo de API fictícia

async function visualizarInformacoesClimaticas() {
    const res = await fetch(url);
    const dados = await res.json();

    const temperaturaMedia = (dados.data.avg_temperature).toFixed(2);
    const niveisCO2 = dados.data.co2_emission.toFixed(2);
    const taxaDesmatamento = dados.data.deforestation_rate.toFixed(2);

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `A temperatura média global atual é de <span>${temperaturaMedia}°C</span>, com níveis de emissão de CO2 de <span>${niveisCO2} ppm</span>. A taxa de desmatamento global está em <span>${taxaDesmatamento}%</span>.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

// Parte 3: Exibir Gráficos de Dados Climáticos
async function exibirGraficoClima() {
    const trace1 = {
        x: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        y: [15, 16, 18, 20, 21, 23], // Exemplo de temperaturas mensais
        mode: 'lines',
        type: 'scatter',
        line: {
            color: getCSS('--secondary-color'),
            width: 3
        }
    };

    const layout = {
        title: 'Variação de Temperatura Mensal',
        xaxis: { title: 'Mês', tickfont: tickConfig },
        yaxis: { title: 'Temperatura (°C)', tickfont: tickConfig },
        paper_bgcolor: getCSS('--bg-color'),
        plot_bgcolor: getCSS('--bg-color')
    };

    const data = [trace1];
    Plotly.newPlot('graficos-container', data, layout);
}

// Chamadas para exibir os dados e o gráfico
visualizarInformacoesClimaticas();
exibirGraficoClima();
