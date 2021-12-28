

function start(){
    $("#inicio").hide();
    $("#fundoGame").append("<div id='jogador' class='animal'></div>")
    $("#fundoGame").append("<div id='inimigo1' class='animal2'></div>")
    $("#fundoGame").append("<div id='inimigo2'></div>")
    $("#fundoGame").append("<div id='amigo' class='animal3'></div>")
    $("#fundoGame").append("<div id='placar'></div>")
    $("#fundoGame").append("<div id='energia'></div>")

    var jogo = {}
    var velocidade = 5 
    var possicaoY = parseInt(Math.random() * 334)
    var podeAtirar = true
    var continuaJogo = true

    var perdidos = 0
    var salvos = 0
    var pontos = 0
    var energiaAtual = 3


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
        moveAmigo()
        colisao()
        placar()
        energia()
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
            disparo()
            
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
        let velocidadeInimigo2 = 3
        $("#inimigo2").css("left",possicaoX-velocidadeInimigo2)

        if(possicaoX<=0){
            $("#inimigo2").css("left",775)
        }
    }

    function disparo(){
        if (podeAtirar === true){
            podeAtirar = false

            let topo = parseInt($("#jogador").css("top"))
            let possicaoX = parseInt($("#jogador").css("left"))
            let tiroX = possicaoX + 190
            let topoTiro = topo + 37

            $("#fundoGame").append("<div id ='disparo'></div>")
            $("#disparo").css("top", topoTiro)
            $("#disparo").css("left",tiroX)

            var tempoDisparo = setInterval(function(){
                let possicaoX = parseInt($("#disparo").css("left"))
                let velocidadeDisparo = 20
                $("#disparo").css("left",possicaoX + velocidadeDisparo)

                if (possicaoX > 900){
                    window.clearInterval(tempoDisparo)
                    tempoDisparo = null
                    $("#disparo").remove()
                    podeAtirar = true
                }
            },30) 
        }
    }

    function moveAmigo(){
        possicaoX = parseInt($("#amigo").css("left"))
        $("#amigo").css("left",possicaoX + 1)
        if(possicaoX > 906){
            $("#amigo").css("left",0)
        }
    }

    function colisao(){
        let colisao1 = ($("#jogador").collision($("#inimigo1")))
        let colisao2 = ($("#jogador").collision($("#inimigo2")))
        let colisao3 = ($("#disparo").collision($("#inimigo1")))
        let colisao4 = ($("#disparo").collision($("#inimigo2")))
        let colisao5 = ($("#jogador").collision($("#amigo")))
        let colisao6 = ($("#inimigo2").collision($("#amigo")))

        
        if (colisao1.length > 0){
            energiaAtual--
            let inimigo1X = parseInt($("#inimigo1").css("left"))
            let inimigo1Y = parseInt($("#inimigo1").css("top"))
            explosao1(inimigo1X,inimigo1Y)
            

            possicaoY = parseInt(Math.random() * 334)
            $("#inimigo1").css("left", 634)
            $("#inimigo1").css("top",possicaoY)
        }

        if (colisao2.length > 0){
            energiaAtual--
            inimigo2X = parseInt($("#inimigo2").css("left"))
            inimigo2Y = parseInt($("#inimigo2").css("top"))
            explosao1(inimigo2X,inimigo2Y)

            $("#inimigo2").remove()

            reposionaInimigo2()
        }

        if (colisao3.length > 0){
            pontos+=100

            let inimigo1X = parseInt($("#inimigo1").css("left"))
            let inimigo1Y = parseInt($("#inimigo1").css("top"))
            explosao1(inimigo1X,inimigo1Y)
            $("#disparo").css("left",950)
            $("#inimigo1").remove()
            
            let tempoInimigo1 = setInterval(function(){
                window.clearInterval(tempoInimigo1)
                $("#fundoGame").append("<div id='inimigo1'  class='animal2'></div>")
                possicaoY = parseInt(Math.random() * 334)
                $("#inimigo1").css("left", 634)
                $("#inimigo1").css("top",possicaoY)

            },1000)
            
        }

        if (colisao4.length > 0){
            pontos+=50

            inimigo2X = parseInt($("#inimigo2").css("left"))
            inimigo2Y = parseInt($("#inimigo2").css("top"))
            explosao1(inimigo2X,inimigo2Y)

            $("#disparo").css("left",950)
            $("#inimigo2").remove()

            reposionaInimigo2()
        }

        if (colisao5.length > 0){
            salvos++
            reposionaAmigo()
            $("#amigo").remove()
        }

        if (colisao6.length > 0){
            perdidos++
            
            amigoY = parseInt($("#amigo").css("top"))
            amigoX = parseInt($("#amigo").css("left"))
            explosao2(amigoX,amigoY)
            $("#amigo").remove()
            reposionaAmigo()


        }

        

    }

    function explosao1(inimigo1X,inimigo1Y){
      
        $("#fundoGame").append("<div id='explosao1'></div>")
        $("#explosao1").css("background-image","url(../img/explosao.png)")

        

        $("#explosao1").css("top", inimigo1Y)
        $("#explosao1").css("left",inimigo1X)
        $("#explosao1").animate({width:200 , opacity:0},"slow")

        var tempoExplosao = setInterval(removeExplosao,1000)

        function removeExplosao(){
            $("#explosao1").remove()
            window.clearInterval(tempoExplosao)
            tempoExplosao = null 
        }
    }

    function reposionaInimigo2(){
        let tempoColisao = setInterval(reposiciona4 , 5000)

        function reposiciona4(){
            window.clearInterval(tempoColisao)
            tempoColisao = null

            if(continuaJogo){
                $("#fundoGame").append("<div id='inimigo2'></div>")
            }
        }
    }

    function reposionaAmigo(){
        let tempoAmigo = setInterval(reposicionaAmigo,6000)

        function reposicionaAmigo(){
            window.clearInterval(tempoAmigo)
            tempoAmigo = null

            if (continuaJogo){
                $("#fundoGame").append("<div id='amigo' class='animal3'></div>")
            }
        }
    }

    function explosao2(amigoX,amigoY) {
        pontos+=100
        $("#fundoGame").append("<div id='explosao3' class='animal4'></div>")
        $("#explosao3").css("top",amigoY)
        $("#explosao3").css("left",amigoX)
        let tempoExplosao3 = setInterval(resetaExplosao3,1000)
        function resetaExplosao3(){
            $("#explosao3").remove()
            window.clearInterval(tempoExplosao3)
            tempoExplosao3 = null
        }
    }

    function placar(){
        $("#placar").html("<h2>Pontos:"+ pontos + "   Salvos:"+ salvos +"   Perdidos:"+ perdidos +"</h2>")
    }

    function energia(){
        switch (energiaAtual){
            case 3:
                $("#energia").css("background-image","url(../img/energia3.png)")
                break
            case 2:
                $("#energia").css("background-image","url(../img/energia2.png)")
                break
            case 1:
                $("#energia").css("background-image","url(../img/energia1.png)")
                break
            case 0:
                $("#energia").css("background-image","url(../img/energia0.png)")
                break
            default:
                break

        }
    }




}


