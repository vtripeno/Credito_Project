function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    //alert(JSON.stringify(xmlHttp.responseText));
    var json = JSON.stringify(eval("({'cars':" + xmlHttp.responseText + "})"));
    //alert(json);
    var obj = JSON.parse(json);
    //alert(obj.cars[1].name);
    x = ""
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
    selecao.hidden = false;
    selecao.disabled = false;
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


// example request
//getAjax('http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json', function(data){ console.log(data); });