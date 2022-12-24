;(function(){
    "use strict";

    let botaoAdicionar = document.getElementById("buscar-pacientes")

    botaoAdicionar.addEventListener("click", buscarPacientes)

    function buscarPacientes(){
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes") // Mudar para uma api verdadeira
        
        xhr.addEventListener("load", function(){
            
            let erroAjax = document.querySelector("#erro-ajax");

            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                let resposta = xhr.responseText;
                let pacientes = JSON.parse(resposta);
    
                pacientes.forEach(function(paciente) {
                    adicionarPacienteNaTabela(paciente);
                });
            } else {
                erroAjax.classList.remove("invisivel");
            }
        });

        xhr.send();

    }
})()