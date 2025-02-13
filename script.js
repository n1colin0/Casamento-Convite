function salvarNome() {
    let nome = document.getElementById("nomeConvidado").value.trim();
    let confirmou = document.getElementById("confirmarPresenca").checked;
    let naoConfirmou = document.getElementById("naoConfirmar").checked;

    // Verifica se o nome foi preenchido
    if (nome === "") {
        alert("Por favor, insira seu nome!");
        return;
    }

    // Verifica se a presença foi confirmada ou não
    if (!confirmou && !naoConfirmou) {
        alert("Por favor, selecione uma opção!");
        return;
    }

    // Define a resposta de presença
    let resposta = confirmou ? "Sim" : "Não";

    // Salva o nome no localStorage
    localStorage.setItem("nomeConvidado", nome);

    // Preenche o formulário invisível
    document.getElementById("inputNome").value = nome;
    document.getElementById("inputPresenca").value = resposta;

    // Evitar o redirecionamento e usar AJAX para o envio
    let form = document.getElementById("formConfirmacao");

    // Enviar o formulário via AJAX para evitar a mensagem de sucesso
    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
    .then(response => {
        // Ocultar a primeira parte com animação
        document.getElementById("parte1").classList.add("hidden");

        // Exibir a segunda parte após um pequeno delay (para a animação funcionar)
        setTimeout(() => {
            document.getElementById("parte1").style.display = "none";
            document.getElementById("parte2").style.display = "block";
            document.getElementById("parte2").classList.add("visible");
        }, 500); // O tempo da animação é 500ms, então o setTimeout deve ser igual ou maior
    })
    .catch(error => {
        console.error('Erro ao enviar o formulário:', error);
        alert("Ocorreu um erro ao enviar a confirmação. Tente novamente.");
    });
}

// Ao carregar a página, verifica se há um nome salvo
document.addEventListener("DOMContentLoaded", function () {
    let nomeSalvo = localStorage.getItem("nomeConvidado");
    if (nomeSalvo) {
        document.getElementById("nomeExibido").textContent = nomeSalvo;
    }
});
