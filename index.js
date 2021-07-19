let btnPesquisar=document.getElementById("pesquisar");
let btnLimpar = document.getElementById("limpar");
let result = document.getElementById('result');
let dados;

btnPesquisar.onclick = function(){
    let valor=document.getElementById("cep").value;
    dados=pesquisaCep(valor);
    
}

function pesquisaCep(valor) {
    let cep = valor.replace(/\D/g, '');
    console.log(cep);
    if (cep != "") {
        
        //Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            let url='https://viacep.com.br/ws/'+ cep + '/json';
            result.value="...";
            getFromAPI(url, getData);
        }
        else {
            //cep é inválido.
            invalid();
        }
    }
    else {
        //cep sem valor, limpa formulário.
        invalid();
    }

  
    
}

function getData(dados){
    if(dados.cep===undefined){
       invalid();
    }
    else{
        result.value=`\nCidade: ${dados.localidade} \nBairro: ${dados.bairro} \nRua: ${dados.logradouro}`;
    }
    
}

function getFromAPI(url, callback){
  let dadosCEP;
  fetch(url)
            .then(resp => {
            if(resp.ok){
                return resp;
            }else{
                throw new Error("codigo "+ resp.status);}  
            })
            .then(resp => resp.json())
            .then(data => dadosCEP = data)
            .then(() => callback(dadosCEP))
            .catch(error => console.log(error));
 }


btnLimpar.onclick = function(){
    limpar();
}

function limpar(){
    document.getElementById("cep").value="";
    document.getElementById("result").value=""; 
}

function invalid(){
        alert("CEP inválido.");
        limpar(); 
}