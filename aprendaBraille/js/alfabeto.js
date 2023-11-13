const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var letraAtual;
var contCorretas = 0;
var contIncorretas = 0;



function enviarDadosParaFirestore(email, corretas, incorretas) {
    // Substitua "usuarios" pelo nome da sua coleção no Firestore
    db.collection("respostas").doc(email).set({
        respostasCorretas: corretas,
        respostasIncorretas: incorretas
    })
    .then(function() {
        console.log("Dados enviados para o Firestore com sucesso!");
    })
    .catch(function(error) {
        console.error("Erro ao enviar dados para o Firestore: ", error);
    });
}

function gerarLetra() {
    var alfabeto = "abcdefghijklmnopqrstuvwxyz";
    var letraAleatoria = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    letraAtual = letraAleatoria;
    return letraAleatoria;
}

function atualizarBraille() {
    document.getElementById("brailleConteudo").innerHTML = br.braille(gerarLetra());
}

function atualizarContadores() {
    document.getElementById("contCorretas").textContent = contCorretas;
    document.getElementById("contIncorretas").textContent = contIncorretas;
}

function verificar() {
var resposta = document.getElementById("entrada").value;
if (resposta === letraAtual) {
contCorretas++;
atualizarContadores();
atualizarBraille(); // Atualiza a célula Braille
alert("Correto!");

// Adicione lógica para enviar dados para o Firestore
var emailUsuario =   firebase.auth().currentUser.email; // Substitua pelo método real de obter o e-mail do usuário
document.getElementById("entrada").value ='';
enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
} else {
contIncorretas++;
atualizarContadores();
var emailUsuario =   firebase.auth().currentUser.email; // Substitua pelo método real de obter o e-mail do usuário
enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
alert("Tente novamente.");
}
document.getElementById("entrada").value ='';
}

atualizarBraille();
atualizarContadores();