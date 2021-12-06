const campoA = document.getElementById('campo_a')
const campoB = document.getElementById('campo_b')
const campoH = document.getElementById('campo_h')

let cateto_a = document.getElementById('cateto_a')
let cateto_b = document.getElementById('cateto_b')
let hipotenusa = document.getElementById('hipotenusa')

let campoAtivo = document.getElementsByClassName('campoAtivado')

var functionBtn = document.getElementsByTagName("button");
for(var x=0; x<functionBtn.length; x++){
    functionBtn[x].addEventListener("click", retornarFuncoes);
}

function retornarFuncoes(e){
    var btnValor = e.target.id;
    switch(btnValor){
        case "1":
        case "2":
        case "3": 
        case "4":
        case "5": 
        case "6": 
        case "7":  
        case "8":
        case "9":
        case "0":
            atribuirValor(btnValor, campoAtivo)
        break;
        case "=":
            calcularResultado()
        break;
        case "cateto_a":
            trocarCampo(btnValor);
        break;
        case "cateto_b":
            trocarCampo(btnValor);
        break;
        case "hipotenusa":
            trocarCampo(btnValor);
        break;
        case "limpar":
            limparCampos(campoAtivo)
        break;
        case ".":
            atribuirValor(btnValor, campoAtivo)
        break;
    }
}


function trocarCampo(campos) {
    const id = document.getElementById(campos)
    const trocarCor = id.classList
    trocarCor.add('campoAtivo') 
    if(campos === 'cateto_a') {
       cateto_b.classList.remove('campoAtivo')
       hipotenusa.classList.remove('campoAtivo')

        campoA.classList.add('campoAtivado')
        campoB.classList.remove('campoAtivado')
        campoH.classList.remove('campoAtivado')
    }  else if(campos === 'cateto_b') {
        cateto_a.classList.remove('campoAtivo')
        hipotenusa.classList.remove('campoAtivo')

        campoA.classList.remove('campoAtivado')
        campoB.classList.add('campoAtivado')
        campoH.classList.remove('campoAtivado')
    } else if(campos === 'hipotenusa') {
        cateto_a.classList.remove('campoAtivo')
        cateto_b.classList.remove('campoAtivo')

        campoA.classList.remove('campoAtivado')
        campoB.classList.remove('campoAtivado')
        campoH.classList.add('campoAtivado')
    }
}

function limparCampos(campoAtivo) { 
    campoAtivo[0].innerHTML = '0'
}

function atribuirValor(valor, campoAtivo) {
    if(campoAtivo[0].innerHTML == 0) {
        campoAtivo[0].innerHTML = ''
        campoAtivo[0].innerHTML = campoAtivo[0].innerHTML + valor 
    } else {
        campoAtivo[0].innerHTML = campoAtivo[0].innerHTML + valor
    }
}

function calcularResultado() {
    const valorCampoA = campoA.innerHTML
    const valorCampoB = campoB.innerHTML
    const valorCampoH = campoH.innerHTML
    const respH = document.getElementById('hipotenusaValue')
    const respCA = document.getElementById('catetoA_value')
    const respCB = document.getElementById('catetoB_value')
    const respAlt = document.getElementById('alturaValue')
    const respA = document.getElementById('triânguloValue')


    let catetoA = valorCampoA * valorCampoA
    let catetoB = valorCampoB * valorCampoB
    let hipotenusaSemValor = valorCampoH * valorCampoH

    function testar() {
        if  (valorCampoB == 0 && valorCampoA == 0 && valorCampoH != 0 ) {
            let vH = valorCampoH * valorCampoH
            let cAcB = vH / 2
            catetoA = cAcB
            catetoB = cAcB
            return true
    
        } else if(valorCampoH != 0 && valorCampoB != 0 || valorCampoA != 0 && valorCampoB != 0 || valorCampoA != 0 && valorCampoH != 0) {
            if( valorCampoH == 0 ) {
                let hipotenusa = catetoA + catetoB
                hipotenusaSemValor = hipotenusa
                return true
    
            } else if (valorCampoA == 0) {
                let cA = hipotenusaSemValor - catetoB
                if(cA > valorCampoH) {
                    catetoA = cA
                    return true

                }else {
                    alert("O cateto nao pode ser maior que a hipotenusa")
                    return false
                }
               
            } else if (valorCampoB == 0) {
                let cB = hipotenusaSemValor - catetoA
                if(cB > valorCampoH) {
                    catetoB = cB
                    return true

                }else {
                    alert("O cateto nao pode ser maior que a hipotenusa")
                    return false
                }
    
            } else if (valorCampoB != 0  && valorCampoA != 0  && valorCampoH != 0 ) {
                alert('Preencha apenas 2 campos!')
                return false
            }
        }else {
            alert('Preencha só a hipotenusa ou 2 campos que queria!')
            return false
        }
    }

    const mostrarValores = testar()

    if(mostrarValores) {

        const pontoA = Math.sqrt((catetoA * catetoA) / hipotenusaSemValor)
        const pontoB = Math.sqrt(hipotenusaSemValor) - pontoA
        const alt = Math.sqrt(pontoA * pontoB)
        const area = (Math.sqrt(hipotenusaSemValor) * alt) / 2


        respH.value = hipotenusaSemValor = Math.sqrt(hipotenusaSemValor).toFixed(3)
        respCA.value = catetoA = Math.sqrt(catetoA).toFixed(3)
        respCB.value = catetoB = Math.sqrt(catetoB).toFixed(3)
        respAlt.value = alt.toFixed(3)
        respA.value = area.toFixed(3)
    }
}