const API_KEY = 'Cole sua chave aqui';

class ClimaApp {
    constructor() {
        this.resultado = document.getElementById('resultado');
        this.inputCidade = document.getElementById('cidade');
        this.botao = document.querySelector('button');
        this.botao.addEventListener('click', () => this.buscarClima());
        this.inputCidade.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.buscarClima();
        });
    }

    async buscarClima() {
        const cidade = this.inputCidade.value.trim();
        
        if (!cidade) {
            this.mostrarErro('Digite uma cidade!');
            return;
        }
        
        if (API_KEY === 'COLE_SUA_CHAVE_AQUI') {
            this.mostrarErro('Cole sua API Key!');
            return;
        }

        this.mostrarLoading();

        try {
            const dados = await this.fetchClima(cidade);
            this.mostrarClima(dados);
        } catch (error) {
            this.mostrarErro(error.message);
        }
    }

    async fetchClima(cidade) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada!');
        }
        
        return await response.json();
    }

    mostrarLoading() {
        this.resultado.innerHTML = '<div class="loading">⏳ Carregando...</div>';
    }

    mostrarErro(msg) {
        this.resultado.innerHTML = `<div class="erro">${msg}</div>`;
    }

    mostrarClima(dados) {
        const icone = dados.weather[0].icon;
        this.resultado.innerHTML = `
            <div class="clima">
                <h2>${dados.name}, ${dados.sys.country}</h2>
                <div class="temp">${Math.round(dados.main.temp)}°C</div>
                <img src="https://openweathermap.org/img/wn/${icone}@2x.png">
                <p><strong>${dados.weather[0].description}</strong></p>
                <p>Sensação: ${Math.round(dados.main.feels_like)}°C</p>
                <p>Umidade: ${dados.main.humidity}%</p>
                <p>Vento: ${dados.wind.speed}km/h</p>
            </div>
        `;
    }
}

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ClimaApp();
});