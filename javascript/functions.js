//Verifica se CPF é válido
function testaCPF(strCPF) {
    var soma, resto;
    soma = 0;

    if (strCPF == "00000000000"){
        document.getElementById("cpf").setCustomValidity('Invalid');
        return false;
    }

    for (i=1; i<=9; i++){
        soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)){
        resto = 0;
    }

    if (resto != parseInt(strCPF.substring(9, 10))){
        document.getElementById("cpf").setCustomValidity('Invalid');
        return false;
    }

    soma = 0;
    for (i = 1; i <= 10; i++){
        soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)){
        resto = 0;
    }

    if (resto != parseInt(strCPF.substring(10, 11))){
        document.getElementById("cpf").setCustomValidity('Invalid');
        return false;
    }

    document.getElementById("cpf").setCustomValidity('');
    return true;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    //alert(JSON.stringify(xmlHttp.responseText));
    var json = JSON.stringify(eval("({'cars':" + xmlHttp.responseText + "})"));
    //alert(json);
    var obj = JSON.parse(json);
    //alert(obj.cars[1].name);
    for (i in obj.cars) {
        console.log(obj.cars[i].name);
    }
    return obj;
}

function popularCombo(id, url, prefixId) {
    var array = httpGet(url).cars;
    var sel = document.getElementById(id);
    var opt = document.createElement('option');
    opt.innerHTML = "Selecione ....";
    opt.value = "";
    sel.appendChild(opt);
    for(var i = 0; i < array.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = array[i].name;
        opt.value = prefixId === undefined ?
             array[i].id :
             prefixId + "/" + array[i].id;
        sel.appendChild(opt);
    }
}

function fazerConsultaFipe(sel, comb, url) {
    //alert(sel.options[sel.selectedIndex].text);
    //alert(sel.options[sel.selectedIndex].value);
    var selecao = document.getElementById(comb);
    ativarElemento(comb);
    if(selecao != null) {
        while (selecao.options.length > 0) {
            selecao.remove(0);
        }
    }
    popularCombo(comb, url+sel.options[sel.selectedIndex].value+".json", sel.options[sel.selectedIndex].value);

}

function getValorJson(idComb, url) {
    var elemento = document.getElementById(idComb).value;
    var json = httpGet(url + elemento + ".json").cars;
    var elementoTarget = document.getElementById('valor');
    var elementoTarget2 = document.getElementById('nome');
    elementoTarget2.innerHTML = json.name;
    elementoTarget.innerHTML = json.preco;

}

function ativarElemento(id) {
    var  elemento = document.getElementById(id);
    elemento.hidden = false;
    elemento.disabled = false;
    elemento.classList.remove("disabled");
}

function desativarElemento(id) {
    var  elemento = document.getElementById(id);
    elemento.hidden = false;
    elemento.disabled = true;
    elemento.classList.add("disabled");
}

function salvarDadosVeiculo(id1, id2) {
    localStorage["car.nome"] = document.getElementById(id1).innerHTML;
    localStorage["car.valor"] = document.getElementById(id2).innerHTML;
}

function salvarDadosCadastro(id1) {
    localStorage["pessoa.emprestimo"] = document.getElementById(id1).value;
}

function carregarDadosVeiculo(id1, id2) {
    document.getElementById(id1).innerHTML = localStorage["car.nome"];
    document.getElementById(id2).innerHTML = localStorage["car.valor"];
}

function carregarDadosCadastro(id1) {
    document.getElementById(id1).innerHTML = localStorage["pessoa.emprestimo"];
}

function validateForm(id) {
  var fields = ["valoremprestimo", "nome", "email"/*, "cpf", "datanascimento", "telefone"*/]

  var i, l = fields.length;
  var fieldname;
  for (i = 0; i < l; i++) {
    fieldname = fields[i];
    console.log(fieldname);
    console.log(document.getElementById(fieldname).value);
    //console.log(document.getElementById(fieldname).value);
    var elemento = document.getElementById(fieldname).value;
    console.log(elemento);
    if (elemento === "") {
      //alert(fieldname + " não pode estar em branco");
      desativarElemento(id);
      return false;
    }
  }
  ativarElemento(id);
  return true;
}

/*$( document ).on( "mousemove", function( event ) {
    console.log("pageX: " + event.clientX + ", pageY: " + event.clientY );

  //$( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
});*/

$(document).mouseleave(function (event) {
    var relativeX = (event.pageX - $(event.target).offset().left),
                relativeY = (event.pageY - $(event.target).offset().top);
    console.log("pageX: " + relativeX + ", pageY: " + relativeY );
});
// example request
//getAjax('http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json', function(data){ console.log(data); });