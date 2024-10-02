
noticias.js:
const apiKey = 'eb8fe155ae844efab8aa8d88e78dbcd9';
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function carregarNoticias() {
    const res = await fetch(url);
    const dados = await res.json();
    
    // Verifica se há artigos
    if (dados.articles && dados.articles.length > 0) {
        const noticiasContainer = document.getElementById('noticias-container');
        
        dados.articles.slice(0, 10).forEach(noticia => {
            // Criar o elemento de notícia
            const noticiaDiv = document.createElement('div');
            noticiaDiv.classList.add('noticia');
            
            const titulo = document.createElement('h2');
            titulo.textContent = noticia.title;
            
            const descricao = document.createElement('p');
            descricao.textContent = noticia.description || "Descrição não disponível.";

            const link = document.createElement('a');
            link.href = noticia.url;
            link.target = '_blank';
            link.textContent = 'Leia mais';

            // Adicionar elementos ao div de notícia
            noticiaDiv.appendChild(titulo);
            noticiaDiv.appendChild(descricao);
            noticiaDiv.appendChild(link);

            // Adicionar o div ao container
            noticiasContainer.appendChild(noticiaDiv);
        });
    } else {
        alert('Nenhuma notícia encontrada.');
    }
}

carregarNoticias();
