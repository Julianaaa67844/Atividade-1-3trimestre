import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    // API para dados de clima
    const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
    const apiKey = 'sua_api_key'; // Coloque sua chave da API aqui
    const dadosClima = [];

    // Coletando dados de clima para cada cidade
    for (const cidade of cidades) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const dados = await res.json();
        if (res.ok) {
            dadosClima.push({
                nome: dados.name,
                temperatura: dados.main.temp,
                umidade: dados.main.humidity
            });
        } else {
            console.error(`Erro ao obter dados para ${cidade}: ${dados.message}`);
        }
    }

    const nomeDasCidades = dadosClima.map(dado => dado.nome);
    const temperaturas = dadosClima.map(dado => dado.temperatura);
    const umidades = dadosClima.map(dado => dado.umidade);

    const data = [
        {
            x: nomeDasCidades,
            y: temperaturas,
            type: 'bar',
            text: temperaturas.map(temp => `${temp} °C`), // Temperatura como texto ao passar o mouse
            marker: {
                color: getCSS('--primary-color')
            },
            name: 'Temperatura (°C)'
        },
        {
            x: nomeDasCidades,
            y: umidades,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
                color: getCSS('--secondary-color')
            },
            name: 'Umidade (%)'
        }
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Temperatura e Umidade nas Cidades',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Cidades',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Valores',
                font: {
                    color: getCSS('--secondary-color')
                }
            },
            range: [0, Math.max(...temperaturas, ...umidades) + 10] // Ajusta o range do eixo Y
        }
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);
    Plotly.newPlot(grafico, data, layout);
}

quantidadeUsuariosPorRede();

