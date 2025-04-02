
/** @type {HTMLCanvasElement} */
 
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

// contexto.beginPath();
// contexto.rect(0,0, 100, 100);
// contexto.fillStyle = "white";
// contexto.fill();
// contexto.strokeStyle = "black";
// contexto.stroke();

// contexto.beginPath();
// contexto.moveTo(100, 100);
// contexto.lineTo(200, 100);
// contexto.lineTo(100, 200);
// contexto.lineTo(100, 100);
// contexto.fillStyle = "black";
// contexto.fill();
let x;
let velocidadeX;
let angulo;

if( Math.round(Math.random()) == 0){
    x = 100;
    velocidadeX = 2;
    angulo = Math.PI/2;
}else{
    x = 700;
    velocidadeX = -2
    angulo = Math.PI/2


}

let moduloLunar = {
    posicao: {
        x: x,
        y: 100
    },

    angulo: Math.PI/2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0
    },
    combustivel: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

let estrelas = [];
for (let i = 0; i< 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0,
        diminucao: true,
        razaoDeCitilacao: Math.random() * 0.05
    };
}







function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
         moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
    }
    
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //Determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 39 );
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostraVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade: ${(-10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText (velocidade, 100, 60);
}
function mostraVelocidadeHorizontal(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade= `VelocidadeHorizontal: ${(-10 * moduloLunar.velocidade.x).toFixed(2)}`;
    contexto.fillText (velocidade, 320, 80);
}
function mostraAngulo(){
contexto.font = "bold 18px Arial";
contexto.textAlign = "center";
contexto.textBaseLine = "middle";
contexto.fillStyle = "lightgray";
let velocidade= `Ângulo: ${(-10 * moduloLunar.angulo).toFixed(2)}`;
contexto.fillText (velocidade, 245, 60);
}
function mostraAltitude(){
contexto.font = "bold 18px Arial";
contexto.textAlign = "center";
contexto.textBaseLine = "middle";
contexto.fillStyle = "lightgray";
let velocidade= `Altitude: ${(canvas.height - moduloLunar.posicao.y - 10).toFixed(2)}`;
contexto.fillText (velocidade, 370, 60);
}
function mostraCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}%`;
    contexto.fillText(combustivel, 100, 80);
}


function desenharEstrelas(){
     for( let i; i < estrelas.lenght; i++ ){
        let estrelas = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrelas.x, estrelas.y, estrelha.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle ="rgba(255, 255, 255, " + estrelas.transparencia + ")";
        contexto.fill();
        contexto.restore();
    }
}





function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
   
    atracaoGravitacional();
    desenharModuloLunar();
    mostraVelocidade();
    mostraCombustivel();
    mostraVelocidadeHorizontal();
    mostraAngulo();
    mostraAltitude();
    desenharEstrelas();
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura )){
         
        if(moduloLunar.velocidade.y >= 0.5 ||    
           moduloLunar.velocidade.x >= 0.5 ||
           5 < moduloLunar.angulo ||
             moduloLunar.angulo < -5
        )
        {   contexto.font = "bold 40px Calibri";
            contexto.textAlign = "center";
            contexto.textBaseline = "middle";
            contexto.fillStyle = "Red";
            return contexto.fillText("Você morreu na queda!", canvas.width/2, canvas.height/2)
        }else{
            {  contexto.font = "bold 40px Calibri";
                contexto.textAlign = "center";
                contexto.textBaseline = "middle";
                contexto.fillStyle = "green";
                return contexto.fillText("Você pousou com SUCESSO!!!!", canvas.width/2, canvas.height/2)
            


        }
                




        
            }
       
        }  
    
    requestAnimationFrame(desenhar);
    
    
}


//Pressionando a seta para cima para ligar o motor
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
    if(evento.keyCode == 38 && moduloLunar.combustivel > 0){
        moduloLunar.motorLigado = true;
    }else if(evento.keyCode == 39){
       moduloLunar.rotacaoAntiHorario = true;
       console.log(moduloLunar.rotacaoAntiHorario);
   } else if(evento.keyCode == 37){
   
    moduloLunar.rotacaoHorario = true;
    console.log("set para esquerda pressionada");
    }
}
//Soltando a seta para cima para desligar o motor
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    }
    else if(evento.keyCode == 39){
         
        moduloLunar.rotacaoAntiHorario = false;
        console.log(moduloLunar.rotacaoAntiHorario);
    } else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = false;
     }
}

let gravidade = 0.050;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180;
    }else if (moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180;
    }
    
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115 *Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 *Math.sin(moduloLunar.angulo);
        
    }
    moduloLunar.velocidade.y += gravidade



    
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.1010;
        moduloLunar.combustivel -= 1
    }
    moduloLunar.velocidade.y += gravidade;

    if (moduloLunar.combustivel <= 0 ){
        moduloLunar.combustivel = 0;
        moduloLunar.motorLigado = false;
  

    }

}




desenhar();