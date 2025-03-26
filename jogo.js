/**  @type {HTMLCanvasElement}  */
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d"); 


let moduloLunar = {
    posição: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "black",
    motorligado : false,

};



function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath(); // Inicia um novo caminho
    contexto.translate(moduloLunar.posição.x, moduloLunar.posição.y);
    contexto.rotate(moduloLunar.angulo );
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura); // Desenha um retângulo
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill(); // Preenche o retângulo
    contexto.closePath();
    
    if(moduloLunar.motorligado){
      desenharChama();
    }

    contexto.restore();


}

  
function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 100);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

let x = 100;

function desenhar(){


    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.translate(canvas.width/2, canvas.height/2);
    contexto.beginPath(); // Inicia um novo caminho
    contexto.rotate(Math.PI / 4);
    contexto.rect(x, 100, 25, 10); // Desenha um retângulo
    contexto.fillStyle = "black"; // Preenche o círculo de preto
    contexto.fill(); // Preenche o círculo
    contexto.restore();


    x = x + 1;
  requestAnimationFrame(desenhar);
  desenharModuloLunar();

}


document.addEventListener("keydown", teclapressionada);

function teclapressionada(evento){

    if(evento.KeyCode==40){
        moduloLunar.motorligado = true;

    }
           }
document.addEventListener("keyup", teclasolta);

function teclasolta(evento){
    if(evento.keyCode==38){
        moduloLunar.motorligado = false;
    }
}

let gravidade = 0.1;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.motorligado){
        moduloLunar.velocidade.y -= 0.2;
    }
    moduloLunar.velocidade.y += gravidade;
}
desenhar();
