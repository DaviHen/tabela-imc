;(function(){
    "use strict";

    let titulo = document.querySelector(".titulo");
    titulo.textContent = "Aparecida Nutricionista";

    let pacientes = document.querySelectorAll(".paciente");
    let tabela = document.querySelector("#tabela-pacientes");

    
    for(let i = 0; i < pacientes.length; i++){
        preencherCamposDePacientes(pacientes[i]);
    }
    

    
    function preencherCamposDePacientes(paciente){
        
        let tdPeso = paciente.querySelector(".info-peso");
        let peso = tdPeso.textContent;
        
        let tdAltura = paciente.querySelector(".info-altura");
        let altura = tdAltura.textContent;

        let tdImc = paciente.querySelector(".info-imc");

        let validacaoPeso = validarPeso(peso);
        let validacaoAltura = validarAltura(altura);

        if(!validacaoPeso){
            validacaoPeso = false;
            tdPeso.textContent = "Peso inválido"
            paciente.classList.add("paciente-invalido")
        }

        if(!validacaoAltura){
            validacaoAltura = false;
            tdAltura.textContent = "Altura inválida"
            paciente.classList.add("paciente-invalido")
        }

        if(validacaoAltura && validacaoPeso){
            let imc = calcularImc(peso, altura)
            tdImc.textContent = imc;
        }
    }

    let botaoAdicionar = document.querySelector("#adicionar-paciente");
    botaoAdicionar.addEventListener("click", criarPaciente);

    function criarPaciente(event){

        event.preventDefault();
    
        let form = document.querySelector("#form-adiciona");
    
        let pacienteObj = obterPacienteDoFormulario(form);

        let erros = validarPaciente(pacienteObj)

        if(erros.length > 0){
            exibirMensagensErro(erros);
            return;
        }

        adicionarPacienteNaTabela(pacienteObj)

        form.reset();
        document.getElementById("mensagem-erro").innerHTML = "";
    }

    function adicionarPacienteNaTabela(paciente){
        let pacienteTr = montaTr(paciente);
        tabela.appendChild(pacienteTr);
    }

    function exibirMensagensErro(erros){
        let ul = document.getElementById("mensagem-erro");
        ul.innerHTML = "";

        erros.forEach( (erro) => {
            let li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        })
    }

    
    function calcularImc(peso, altura){
        let imc = 0;
        imc = peso / (altura * altura); 
        return imc.toFixed(2);
    }

    function obterPacienteDoFormulario(form){

        let pacienteObj = {
            nome: form.nome.value,
            peso: form.peso.value,
            altura: form.altura.value,
            gordura: form.gordura.value,
            imc: calcularImc(form.peso.value, form.altura.value)
        };
        return pacienteObj

    }

    function montaTr(paciente){
        let pacienteTr = document.createElement("tr");
        pacienteTr.classList.add("paciente");
    
        pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
        pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
        pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
        pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
        pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

        return pacienteTr
    }

    function montaTd(conteudo, classe){
        let td = document.createElement("td");
        td.textContent = conteudo;
        td.classList.add(classe)

        return td
    }

    function validarPeso(peso){
        if(peso >= 0 && peso < 500){
            return true
        } else{
            return false;
        }
    }

    function validarAltura(altura){
        if(altura >= 0 && altura <= 3.0){
            return true
        } else{
            return false;
        }
    }

    function validarPaciente(paciente){

        let arrErros = [];

        if(paciente.nome.length == 0){
            arrErros.push("O nome é inválido")
        }

        if(!validarPeso(paciente.peso) || paciente.peso.length == 0){
            arrErros.push("O peso é inválido")
        }
        if(!validarAltura(paciente.altura) || paciente.altura.length == 0){
            arrErros.push("A altura é inválida")
        }

        if(paciente.gordura.length == 0){
            arrErros.push("A gordura é inválida")
        }

        return arrErros;
    }

    /* Remover pacientes */

    tabela.addEventListener("dblclick", function(event){
        event.target.parentNode.classList.add("fadeOut")

        setTimeout(function(){
            event.target.parentNode.remove();
        }, 500)
    })

    /* */
   

})()