//Inicio da distribuição
let NumeroDeCartas;
ConfiguradorDoJogo();
function ConfiguradorDoJogo() {
    NumeroDeCartas = getNumeroDeCartas();
    Resposta = GeraResposta(NumeroDeCartas);
    gerarCartas(NumeroDeCartas, Resposta);
}

function getNumeroDeCartas() {
    let input = Number(prompt("Com quantas cartas você quer jogar?"));
    while (!(input >= 4 && input <= 14 && input % 2 === 0)){
        input = Number(prompt("Com quantas cartas você quer jogar?"));
    }
    return input;
}

function GeraResposta(NumeroDeCartas) {
    let Resposta = [];
    for (let key = 0; key < NumeroDeCartas / 2; key ++) {
        Resposta.push(key);
        Resposta.push(key);       
    }
    embaralhar(Resposta);
    return Resposta;
}

function embaralhar(array) {
    let numeroAtual = array.length,  numeroAleatorio;
    while (0 !== numeroAtual) {
      numeroAleatorio = Math.floor(Math.random() * numeroAtual);
      numeroAtual--;
      [array[numeroAtual], array[numeroAleatorio]] = [array[numeroAleatorio], array[numeroAtual]];
    }
    return array;
}

function gerarCartas(NumeroDeCartas, Resposta) {
    const costasDaCarta = [
        "metalparrot",
        "bobrossparrot",
        "explodyparrot",
        "fiestaparrot",
        "revertitparrot",
        "tripletsparrot",
        "unicornparrot",
    ];
    const jogo = document.querySelector("main");
    jogo.innerHTML = "";
    for (let i = 0; i < NumeroDeCartas; i++) {
        jogo.innerHTML += `<div class="carta" onclick="verificarJogo(this)" data-identifier="carta">
        <div class="frente-carta face" data-identifier="front-face">
            <img src="imagens/front.png">
        </div>
        <div class="costas-carta face" data-identifier="back-face">
            <img src="imagens/${costasDaCarta[Resposta[i]]}.gif">
        </div>
    </div>`;
    }
}
// Fim da distribuição

// Incio do jogo
let primeiroPar = true, primeiraCarta, sugundaCarta;
let pontuacao = 0;
let contadorDeJogadas = 0;
let antiSpam = false;
function verificarJogo(carta) {
    if (!(carta.classList.contains("virada")) && !antiSpam){
        if (!primeiroPar){
            antiSpam = true;
            setTimeout(function () {
                antiSpam = false;
            }, 1100)
        }
        contadorDeJogadas++;
        viraCarta(carta);
    }
}

function viraCarta(carta){
    carta.classList.add('virada')
    if (primeiroPar){
        primeiraCarta = carta;
        primeiroPar = false;
    }else{
        sugundaCarta = carta;
        verificarCartas();
        primeiroPar = true;
    }
}

function verificarCartas(){
    if (primeiraCarta.lastElementChild.innerHTML === sugundaCarta.lastElementChild.innerHTML){
        primeiraCarta = null;
        sugundaCarta = null;
        pontuacao++;
    }else{
        setTimeout(function () {
            primeiraCarta.classList.remove("virada");
            sugundaCarta.classList.remove("virada");
        }, 1000);
    }
    setTimeout(fimDeJogo, 500);
}

function fimDeJogo() {
    if (pontuacao === (NumeroDeCartas / 2)){
        alert(`Você ganhou em ${contadorDeJogadas} jogadas!!`);
        if (confirm("Jogar novamente?")){
            pontuacao = 0;
            contadorDeJogadas = 0;
            ConfiguradorDoJogo();
        }
    }
}