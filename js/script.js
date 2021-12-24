

function start(){
    $("#inicio").hide();
    $("#fundoGame").append("<div id='jogador' class='animal'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='animal2'></div>")
    $("#fundoGame").append("<div id='inimigo2'></div>")
    $("#fundoGame").append("<div id='amigo' class='animal3'></div>")

    var jogo = {}
    var velocidade = 5 
    var possicaoY = parseInt(Math.random() * 334)

    var tecla = {
        w:87,
        s:83,
        d:68
    }
    jogo.pressionou = []

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true
    })
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false
    })



    jogo.timer = setInterval(loop,30)

    function loop(){
        movefundo()
        movejogador()
        moveinimigo1()
        moveinimigo2()
    }

    function movefundo(){
        esquerda = parseInt($("#fundoGame").css("background-position"))
        $("#fundoGame").css("background-position",esquerda-1)
    }

    function movejogador(){
        if(jogo.pressionou[tecla.w]){
            let topo = parseInt($("#jogador").css("top"))
            if (topo>10){
                $("#jogador").css("top",topo-10)
            }
            

        }
        if(jogo.pressionou[tecla.s]){
            let topo = parseInt($("#jogador").css("top"))
            if (topo<434){
                $("#jogador").css("top",topo+10)
            }
            
        }
        if(jogo.pressionou[tecla.d]){
            
        }
    }

    function moveinimigo1(){
        possicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left",possicaoX-velocidade)
        $("#inimigo1").css("top",possicaoY)

        if(possicaoX<=0){
            possicaoY = parseInt(Math.random() * 334)
            $("#inimigo1").css("left",634)
            $("#inimigo1").css("top",possicaoY)
        }
    }

    function moveinimigo2(){
        possicaoX = parseInt($("#inimigo2").css("left"))
        $("#inimigo2").css("left",possicaoX-3)

        if(possicaoX<=0){
            $("#inimigo2").css("left",775)
        }

    }

}


