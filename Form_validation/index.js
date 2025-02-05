let btn = document.getElementById('enviar');
const msg_erro = document.querySelectorAll(".mensagem-erro");

btn.addEventListener('click', () => {
    const campos = document.querySelectorAll(".input");

    campos.forEach((inp, index) => {
        const erroMensagem = msg_erro[index];

        if(inp.value == "") {
            inp.classList.remove("sucesso");
            inp.classList.add("erro");
            erroMensagem.classList.add('err')
        } else {
            if(inp.classList.contains("erro")){
                inp.classList.remove("erro");
                erroMensagem.classList.remove("err");
            }

            inp.classList.add("sucesso");
        }
    });
});