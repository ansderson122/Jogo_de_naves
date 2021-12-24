

function start(){
    $("#inicio").hide();
    $("#fundoGame").append("<div id='jogador' class='animal'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='animal2'></div>")
    $("#fundoGame").append("<div id='inimigo2'></div>")
    $("#fundoGame").append("<div id='amigo' class='animal3'></div>")

    var jogo = {}
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

}


