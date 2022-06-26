//FUNÇÃO PARA PROTEGER A VARIÁVEL $ / FUNÇÃO AUTO INVOCADA
;(function ($) {
    $.fn.temporizador = function (opcoes) {
        const opcoesFinais = $.extend(
            {
                mensagem: 'Em breve!',
                horario: '23:59:59'
            },
            opcoes
        )

        //Criando os elementos
        const horaDezena = $('<span class="digito">').html('0')
        const horaUnidade = $('<span class="digito">').html('0')
        const minutoDezena = $('<span class="digito">').html('0')
        const minutoUnidade = $('<span class="digito">').html('0')
        const segundoDezena = $('<span class="digito">').html('0')
        const segundoUnidade = $('<span class="digito">').html('0')

        const separadorHora = $('<span class="separador">').html(':')
        const separadorMinuto = $('<span class="separador">').html(':')

        const mensagem = $('<div class="mensagem">').html(opcoesFinais.mensagem)

        $(this).addClass('temporizador')
        $(this).append(
            horaDezena,
            horaUnidade,
            separadorHora,
            minutoDezena,
            minutoUnidade,
            separadorMinuto,
            segundoDezena,
            segundoUnidade,
            mensagem
        )

        //Capturar hora nesse formato
        const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/)
        const horarioAlvo = regex.exec(opcoesFinais.horario)

        //Para definir a hora em cada índice correspondente
        let temporizador = setInterval(() => {
            const agora = new Date()
            const alvo = new Date()
            alvo.setHours(horarioAlvo[1])
            alvo.setMinutes(horarioAlvo[2])
            alvo.setSeconds(horarioAlvo[3])

            const diferencaEmMili = alvo.getTime() - agora.getTime()
            if (diferencaEmMili >= 0) {
                const diferenca = regex.exec(
                    new Date(diferencaEmMili).toISOString()
                ) //toISOString para pegar o valor setado correspondente
                //console.log(diferenca)

                //Nos parametros pegamos ([pegou a hora][o primeiro caractere da hora(dezena)])
                horaDezena.html(diferenca[1][0])
                //Nos parametros pegamos ([pegou a hora][o segundo caractere da hora(unidade)])
                horaUnidade.html(diferenca[1][1])
                minutoDezena.html(diferenca[2][0])
                minutoUnidade.html(diferenca[2][1])
                segundoDezena.html(diferenca[3][0])
                segundoUnidade.html(diferenca[3][1])
            } else {
                clearInterval(temporizador)
            }
        }, 1000)

        return this
    }
})(jQuery)

