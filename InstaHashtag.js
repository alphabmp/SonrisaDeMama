
var totCat = 5;
var tags = new Object();
tags["bebes"] = ["#mibebefeliz","#bebes","#mamáybebé","#miamorchiquito💕","#mibebecrece","#mibebeyyo","#reciennacidos","#mamaybebe"];
tags["bebes estimulacion"] = ["#juegosensorial","#estimulacionbebes","#estimulacioninfantil","#motricidad","#estimulacion","#estimulacióntemprana"];
tags["crianza"] = ["#crianzapositiva","#crianzaresponsable","#crianzaconsciente","#desarrolloinfantil","#crianzarespetuosa","#crianza"];
tags["disciplina"] = ["#disciplinapositiva"];
tags["educacion"] = ["#educacioninfantil","#educacionemocional","#juegosdidacticos","#cognitivo","#juegoseducativos","#estimulacioncognitiva","#jugandoaprendo","#educacióninicial","#juegosdidácticos"];
tags["embarazo"] = ["#embarazosemanaasemana","#embarazadaprimeriza","#embarazos","#embarazosaludable","#miembarazo","#embarazoconsciente","#bebeencamino","#embarazadafeliz","#embarazosano","#embarazadas"];
tags["familia"] = ["#familiaamada","#familiaesfamilia","#instafamilia"];
tags["hijos"] = ["#hijosbellos","#hijosamados","#hijosfelices"];
tags["humor"] = ["#memesdemama"];
tags["juguetes"] = ["#juguetesdidácticos","#jugueteseducativos","#juguetesdidacticos"];
tags["mama frases"] = ["#frasesdemama"];
tags["mama general"] = ["#mamaehijos","#mamábloguera","#aprendiendoasermama","#soymamá","#maternidadfeliz","#maternidadpositiva","#mamasfelices","#sermama","#madreehijos","#sermamá","#instamamis","#mamafeliz😍","#vidademamá","#mamimolona","#mamasmolonas","#supermamá","#maternidadconsciente","#mamáprimeriza","#madresolohayuna","#mamabloguera","#mamáfeliz","#mamalatina","#amordemamá","#mamaenamorada","#soymama","#supermama"];
tags["niños"] = ["#niñoscreativos","#niñosencasa","#niñosfelices👫","#niñospequeños","#niñosyniñas"];
tags["niños actividades"] = ["#niñosjugando","#actividadesparaniños","#actividadesconniños"];
tags["niños arte"] = ["#manualidadesniños","#manualidadesparaniños","#niñosartistas"];
tags["niños comida"] = ["#cocinaparaniños","#recetasparaniños","#niñossaludables"];
tags["papa"] = ["#serpapa","#amoserpapa","#padresehijos","#papisprimerizos","#paternidad","#amordepadre","#papasprimerizos","#amordepadres","#papás"];
tags["ropa bebes"] = ["#bebeestiloso"];
tags["ropa embarazada"] = ["#ropaembarazo","#ropaembarazada","#ropadeembarazo"];
tags["ropa niños"] = ["#niñosfashion","#niñosconestilo","#ropaparaniños"];
//remove duplicates and order tags on each category
for (key in tags){
  originalTags = tags[key].sort();
  if (originalTags.length >1){
    newTags = originalTags;
    var EOA1 = false; //End of Array first loop
    i = 0;
    while (!EOA1){
      i++;
      var totTags = newTags.length;
      if (totTags <= i+1) {EOA1 = true;}
      var EOA2 = false; //End of array second loop
      j = i;
      while (!EOA2){
        j++;
        var totTags = newTags.length;
        if (totTags <= j) {EOA2 = true;}
        if (newTags[i-1] == newTags[j-1]){
          newTags.splice(j-1,1);
        }
      }
    }
    tags[key]=newTags;
  }
}

//------------------------------------------------------------------------------
//FUNCTIONS
function getSelectedCats(totSelectors){
  //totSelectos: number of available dropdowns
  var totCats=0;
  var cats = new Array();
  for (var i=1; i<=totSelectors; i++){
    var sel = document.getElementById(`cat${i}`);
    if (sel.value != "none"){
      totCats++;
      cats[totCats-1] = sel.value;
    }
  }
  return cats;
}
function orderCatsByLength(cats){
  selTagsCount = new Array();
  totCats = cats.length;
  var newCats = cats;
  for (var index=0; index< totCats; index++){
    tagCount = tags[cats[index]].length;
    selTagsCount[index] = tagCount;
  }
  //order
  for (var i=0; i<totCats-1 ; i++){
    for (var j=i+1; j<totCats; j++){
      if (selTagsCount[j] < selTagsCount[i]) {
        tempCount = selTagsCount[j];
        tempCat = newCats[j];
        selTagsCount[j] = selTagsCount[i];
        newCats[j] = newCats[i];
        selTagsCount[i] = tempCount;
        newCats[i] = tempCat;
      }
    }
  }
  return newCats;
}
function generate(){
  var minCatTags = 1; //The final product must at least have 1 tag from each category
  var maxTags = document.getElementById('maxTags').value;
  var cats = getSelectedCats(totCat);
  var selectedCatsCount = cats.length;
  var maxCatTags = Math.floor(maxTags / selectedCatsCount) //Max number of tags from each category unless completion is needed
  var orderedCats = orderCatsByLength(cats); //cats ordered by number of hashtags (low to high)
  var myTags = new Array();
  var catCount=0;
  var i, j;
  for (category of orderedCats){
    catCount++;
    var allCatTags = tags[category];

    // removes from the tags in the category those that are already part of the final collection of tagsLeft
    for (currentTag in myTags){
      var EOA = false;
      i = 0;
      if (allCatTags.length <= i) {EOA=true;}
      while (!EOA){
        i++;
        if (allCatTags.length <= i) {EOA=true;}
        if (currentTag == allCatTags[i-1]){
          allCatTags.splice(i-1,1);
        }
      }
    }
    //from the category tags, select randomly  tags equal to the total tags of the category or the maxCatTags whichever is less.
    var catSelectedTags = new Array();
    var tagsToGet;
    if (allCatTags.length < maxCatTags){
      //if category doesnt have enough tags just use all the tags
      catSelectedTags = allCatTags;
    }
    else {
      if (catCount >= orderedCats.length){
        //this is the last category try to use enough tags to reach the goal if needed
        var tagsLeft = maxTags - myTags.length;
        tagsToGet = tagsLeft;
        if (allCatTags.length < tagsLeft){tagsToGet = allCatTags.length};
      } else {
        //Normal conditions you are not in the last category and the category has more than enough
        //tags to cover the maxTagCats
        tagsToGet = maxCatTags;
      }
      var tagsChosenDic = new Object();
      for (i=1;i<=tagsToGet;i++){
        var repeated=true;
        do {
          var randomTagIndex = Math.floor(Math.random() * allCatTags.length)
          repeated = randomTagIndex in tagsChosenDic;
        }
        while (repeated);
        tagsChosenDic[randomTagIndex] = randomTagIndex;
        catSelectedTags.push(allCatTags[randomTagIndex]);
      }
    }
    myTags = myTags.concat(catSelectedTags);
  }
  var texto = document.getElementById('finalTags');
  var hashCount = document.getElementById('hashCount');
  var myTagsText = myTags.toString().replace(/,/g,' ');
  texto.value = myTagsText;
  hashCount.innerText = myTagsText.length - myTagsText.replace(/ /g,'').length + 1;
}
//------------------------------------------------------------------------------
//INITIALIZATION
for (var i=1; i<=5; i++){
  var sel = document.getElementById(`cat${i}`);
  var options = '<option value="none"></option>';
  for (key in tags){
    options += '<option value="' + key + '">' + key + '</option>';
  }
  sel.innerHTML = options;
}
var texto = document.getElementById('finalTags');
//-----------------------------------------------------------------------------
