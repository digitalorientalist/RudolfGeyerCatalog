// Generator of more information on item
function modalInfo(number, language) {

    var authorLan = Object.values(texts.authorCatalog)[language];
    var editorLan = Object.values(texts.editorCatalog)[language];
    var translatorLan = Object.values(texts.translatorCatalog)[language];
    var noAuthorLan = Object.values(texts.noAuthorCatalog)[language];
    var numberVolumesLan = Object.values(texts.numberVolumesCatalog)[language];
    var publisherLan = Object.values(texts.publisherCatalog)[language];
    var placeLan = Object.values(texts.placeCatalog)[language];
    var yearLan = Object.values(texts.yearCatalog)[language];
    var additionalLan = Object.values(texts.additionalCatalog)[language];
    var callNumberLan = Object.values(texts.callNumberCatalog)[language];
    var closeLan = Object.values(texts.closeCatalog)[language];

    modalText = "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\">" +
        "<div class=\"modal-dialog\">" +
        "<div class=\"modal-content\">" +
        "<div class=\"modal-header text-warning\">" +
        "<h3 class=\"headline\">" + searchData[number].title + "</h3>" +
        "</div>" +
        "<div class=\"modal-body\">";
    if (searchData[number].hasOwnProperty('shortTitle') == true) {
        modalText += "<i>" + searchData[number].shortTitle + "</i><br>";

    }
    if (searchData[number].hasOwnProperty('author') == true) {
        modalText += authorLan + searchData[number].author + "<br>";

    }
    if (searchData[number].hasOwnProperty('editor') == true) {
        modalText += editorLan + searchData[number].editor + "<br>";

    }
    if (searchData[number].hasOwnProperty('translator') == true) {
        modalText += translatorLan + searchData[number].translator + "<br>";
    }
    if (searchData[number].hasOwnProperty('numberofvolumes') == true) {
        modalText += numberVolumesLan + searchData[number].numberofvolumes + "<br>";
    }
    if (searchData[number].hasOwnProperty('publisher') == true) {
        modalText += publisherLan + searchData[number].publisher + "<br>";

    }
    if (searchData[number].hasOwnProperty('publisherplace') == true) {
        modalText += placeLan + searchData[number].publisherplace + "<br>";

    }
    if (searchData[number].hasOwnProperty('issued') == true) {
        modalText += yearLan + searchData[number].issued;

    }
    if (searchData[number].hasOwnProperty('abstract') == true) {
        modalText += "<hr><p class=\"text-success\"><b>" + additionalLan + "</b><br>" + searchData[number].abstract + "</p>";

    }
    if (searchData[number].hasOwnProperty('callnumber') == true) {
        modalText += "<hr>" + callNumberLan + searchData[number].callnumber + "<br>";

    }
    modalText += "</div>" +
        "<div class=\"modal-footer\">" +
        "<button type=\"button\" class=\"btn btn-blue\" data-dismiss=\"modal\">" + closeLan + "</button>" +
        "</div></div></div></div>";
    document.getElementById("modalDiv").innerHTML = modalText;
    $("#myModal").modal();
}

// Initial loading of the catalog
var reducedCatalog = {};
var searchData = ourData;


window.onload = function () {
    indexingTitleCatalog();
    reducingCatalog(ourData);
    switchLanguage("german");
}
// ------------

var languages, lanIndex, nextLanIndex

function switchLanguage(language) {


    toBeTranslated = Object.keys(texts);
    languages = Object.keys(texts[toBeTranslated[0]]);
    lanIndex = languages.indexOf(language);

    if (lanIndex == languages.length - 1) {
        nextLanIndex = 0;
    } else {
        nextLanIndex = lanIndex + 1;
    }
    nextLanguage = languages[nextLanIndex];

    for (key in toBeTranslated) {

        if (toBeTranslated[key].includes("Tip")) {
            document.getElementById(toBeTranslated[key]).title = Object.values(texts[toBeTranslated[key]])[lanIndex];
        } else if (toBeTranslated[key] == "searchBox") {
            document.getElementById("searchTip").placeholder = Object.values(texts[toBeTranslated[key]])[lanIndex];
        } else if (toBeTranslated[key].includes("Catalog")) {
            null;
        } else {
            document.getElementById(toBeTranslated[key]).innerHTML = Object.values(texts[toBeTranslated[key]])[lanIndex];
        }

        document.getElementById("flagTip").innerHTML = "<img src=\"" + nextLanguage + ".svg\" height=\"16\" width=\"32\" class=\"flags\" id=\"flagTip\" )\">";
        document.getElementById("flagTip").title = Object.values(texts.flagTip)[nextLanIndex];
    }
    if (document.getElementById("searchTip").value) {
        searchCatalog(document.getElementById("searchTip").value);
    } else {
        renderTableGeyer(ourData, "beginTitleCatalog", lanIndex);
    }
}


// -----------

// Building up a table from catalog entries
var tableHTML

function renderTableEntry(data, i, language) {

    var authorLan = Object.values(texts.authorCatalog)[language];
    var editorLan = Object.values(texts.editorCatalog)[language];
    var translatorLan = Object.values(texts.translatorCatalog)[language];
    var noAuthorLan = Object.values(texts.noAuthorCatalog)[language];

    tableHTML += "<tr><td><div class=\"entry text text-left\"><p class=\"text font-weight-bold\"><svg onclick=\"modalInfo(" + i + ", " + language + ")\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" width=\"15px\" height=\"15px\"><path class=\"icon\" d=\"M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z\"/></svg> " +
        data[i].title +
        "</p><p class=\"text-muted text font-weight-light\">"

    if (data[i].hasOwnProperty('editor') == true && data[i].hasOwnProperty('author') == false && data[i].hasOwnProperty('translator') == false) {
        tableHTML += editorLan + data[i].editor;

    } else if (data[i].hasOwnProperty('editor') == false && data[i].hasOwnProperty('author') == true && data[i].hasOwnProperty('translator') == false) {
        tableHTML += authorLan + data[i].author;

    } else if (data[i].hasOwnProperty('editor') == false && data[i].hasOwnProperty('author') == false && data[i].hasOwnProperty('translator') == false) {
        tableHTML += "<i>" + noAuthorLan + "</i>";

    } else if (data[i].hasOwnProperty('editor') == true && data[i].hasOwnProperty('author') == true && data[i].hasOwnProperty('translator') == false) {
        tableHTML += authorLan + data[i].author + ". " + editorLan + data[i].editor;

    } else if (data[i].hasOwnProperty('editor') == false && data[i].hasOwnProperty('author') == true && data[i].hasOwnProperty('translator') == true) {
        tableHTML += authorLan + data[i].author + ". " + translatorLan + data[i].translator;
    } else if (data[i].hasOwnProperty('editor') == true && data[i].hasOwnProperty('author') == false && data[i].hasOwnProperty('translator') == true) {
        tableHTML += editorLan + data[i].editor + ". " + translatorLan + data[i].translator;
    } else if (data[i].hasOwnProperty('editor') == true && data[i].hasOwnProperty('author') == true && data[i].hasOwnProperty('translator') == true) {
        tableHTML += authorLan + data[i].author + ". " + editorLan + data[i].editor + ". " + translatorLan + data[i].translator;
    } else if (data[i].hasOwnProperty('editor') == false && data[i].hasOwnProperty('author') == false && data[i].hasOwnProperty('translator') == true) {
        tableHTML += translatorLan + data[i].translator;
    }
    tableHTML += "</p></div></td><div class=\"entry text text-right\"><td><p class=\"text blue\">"
    if (data[i].issued) {
        tableHTML += data[i].issued;
    }
    tableHTML += "<br>"
    if (data[i].publisherplace) {
        tableHTML += data[i].publisherplace;
    }
    tableHTML += "</p></div></td></tr>";
}

function renderTableGeyer(data, heading, language, numberEntries) {
    tableHTML = "<table id=\"tableCatalog\" class=\"table table-striped\"><tbody>";

    for (i = 0; i < data.length; i++) {
        renderTableEntry(data, i, language);
    }

    tableHTML += '</tbody></table>';

    catalogGeyer.innerHTML = tableHTML;
    if (typeof numberEntries !== "undefined"){
        document.getElementById("titleSearch").innerHTML = Object.values(texts[heading])[language] + " " + numberEntries;
    } else {
        document.getElementById("titleSearch").innerHTML = Object.values(texts[heading])[language];
    }
}

// ------------
// Searching keyword and showing results

function searchCatalog(input) {
    searchData = [];
    // Declare variables 
    var filter, fields, number, y;
    inputLower = input.toLowerCase();
    normalizedInput = accent_fold(inputLower);

    for (i = 0; i < ourData.length; i++) {
        if (reducedCatalog[i].includes(normalizedInput)) {
            searchData.push(ourData[i]);
        }
    }

    if (searchData.length == 0) {
        renderTableGeyer(ourData, "noResultsTitleCatalog", lanIndex);
    } else {
        renderTableGeyer(searchData, "foundItemsCatalog", lanIndex, searchData.length);
    }
    console.log(ourData[2]);
    console.log(reducedCatalog[2]);
}

// Search should initiate too by hitting 'Enter' key

document.getElementById("searchTip")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13 && document.getElementById("searchTip").value != "") {
            searchCatalog(document.getElementById("searchTip").value);
        } else if (document.getElementById("searchTip").value == "") {
            renderTableGeyer(ourData, "againTitleCatalog", lanIndex);
        }
    });


document.getElementById("searchButton").onclick = function () {
    if (document.getElementById("searchTip").value != "") {
        searchCatalog(document.getElementById("searchTip").value);
    }
}
// -----------

document.getElementById("flagTip").onclick = function () {
    switchLanguage(nextLanguage);
}



// document.getElementById("sortYear").onclick = handler();

// function handler() {
//     alert('clicked');
// }

// function handler(){
//     indexingTitleCatalog();
//     document.getElementById("searchButton").click();
// }
// document.getElementById("sortYear").onclick = handlerYear;

// function handlerYear(){
//     indexingYearCatalog();
//     document.getElementById("searchButton").click();
// }

// // document.getElementById("sortTitle").click( function(){
// //     console.log("yes");
    
// // });
// // document.getElementById("sortYear").addEventListener("select", function(){
// //     indexingYearCatalog();
// //     document.getElementById("searchButton").click();
// // });

document.getElementById("sortTitle").addEventListener("click", function(){
    indexingTitleCatalog();
    searchCatalog(document.getElementById("searchTip").value);
})
document.getElementById("sortYear").addEventListener("click", function(){
    indexingYearCatalog();
    searchCatalog(document.getElementById("searchTip").value);
})


// Search should be agnostic to capital/small letters, accents and different transliterations.

var accentMap = {
    'á': 'a', 'à': 'a', 'ā': 'a', 'â': 'a', 'ä': 'ae', 'æ': 'ae',
    'é': 'e', 'è': 'e', 'ē': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'ī': 'i', 'î': 'i', 'y': 'i',
    'ó': 'o', 'ò': 'o', 'ō': 'o', 'ô': 'o', 'ö': 'oe',
    'ú': 'u', 'ù': 'u', 'ū': 'u', 'û': 'u', 'ü': 'ue',
    'ṭ': 't', 'ṣ': 's', 'ḍ': 'd', 'ḥ': 'h', 'ẓ': 'z',
    'ġ': 'gh', 'š': 'sh', 'ğ': 'j', 'ḳ': 'q', 'č': 'ch',
    'ʿ': '\'', 'ʾ': '\''
};
function accent_fold(s) {
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += accentMap[s.charAt(i)] || s.charAt(i);
    }
    return ret.toLowerCase();
};

// ----------

function reducingCatalog(catalog) {
    for (var y = 0; y < catalog.length; y++) {
        yValue = Object.values(catalog[y]);
        relevantYValue = yValue.slice(2);
        realYValue = relevantYValue.join(" ");
        lowerCaseYValue = realYValue.toLowerCase();
        reducedYValue = accent_fold(lowerCaseYValue);
        index = y.toString();
        reducedCatalog[y] = reducedYValue;
    }
}



function indexingTitleCatalog() {
    ourData.sort(function (a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    reducingCatalog(ourData);
}
function indexingYearCatalog() {
    ourData.sort(function (a, b) {
        return parseInt(a.issued) - parseInt(b.issued);
    });
    reducingCatalog(ourData);
}



if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) == false) {
    tippy('.btn', {
        animation: 'perspective',
        dynamicTitle: true
    });
    tippy('.form-control', {
        animation: 'perspective',
        dynamicTitle: true
    });
    tippy('.flags', {
        animation: 'perspective',
        dynamicTitle: true
    });
}

