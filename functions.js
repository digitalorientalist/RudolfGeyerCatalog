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
    var urlLan = Object.values(texts.urlCatalog)[language];
    var closeLan = Object.values(texts.closeCatalog)[language];

    modalText = "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\">" +
        "<div class=\"modal-dialog\">" +
        "<div class=\"modal-content\">" +
        "<div class=\"modal-header text-warning\">" +
        "<h3 class=\"headline\">" + searchData[number].title + "</h3>" +
        "</div>" +
        "<div class=\"modal-body\">";
    if (searchData[number].hasOwnProperty('shortTitle')) {
        modalText += "<i>" + searchData[number].shortTitle + "</i><br>";

    }
    if (searchData[number].hasOwnProperty('author')) {
        modalText += authorLan + printNames(searchData[number].author) + "<br>";

    }
    if (searchData[number].hasOwnProperty('editor')) {
        modalText += editorLan + printNames(searchData[number].editor) + "<br>";

    }
    if (searchData[number].hasOwnProperty('translator')) {
        modalText += translatorLan + printNames(searchData[number].translator) + "<br>";
    }
    if (searchData[number].hasOwnProperty('number-of-volumes')) {
        modalText += numberVolumesLan + searchData[number]["number-of-volumes"] + "<br>";
    }
    if (searchData[number].hasOwnProperty('publisher')) {
        modalText += publisherLan + searchData[number].publisher + "<br>";

    }
    if (searchData[number].hasOwnProperty('publisher-place')) {
        modalText += placeLan + searchData[number]["publisher-place"] + "<br>";

    }
    if (searchData[number].hasOwnProperty('issued')) {
        modalText += yearLan + searchData[number].issued["date-parts"][0][0];

    }
    if (searchData[number].hasOwnProperty('abstract')) {
        modalText += "<hr><p class=\"text-success\"><b>" + additionalLan + "</b><br>" + searchData[number].abstract + "</p>";

    }
    if (searchData[number].hasOwnProperty('language')) {
        modalText += "<hr>" + callNumberLan + searchData[number].language + "<br>";

    }
    if (searchData[number].hasOwnProperty('URL')) {
        modalText += '<a href="' + searchData[number].URL + '" target="_blank">' + urlLan + '</a><br>';

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
    // indexingTitleCatalog();
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

// This function takes all the names for a given category and prints them in the format 'first' - 'preposition' - 'last'.
function printNames(entry) {
    if (!entry) {
        return;
    }
    namesString = ""

    for (var name = 0; name < entry.length; name++) {
        if (entry[name]["given"] != "") {
            namesString += entry[name]["given"];
        }
        if (entry[name].hasOwnProperty("non-dropping-particle")) {
            namesString += " " + entry[name]["non-dropping-particle"];
        }
        namesString += " " + entry[name]["family"];
        if (name == entry.length - 1) {
            namesString += ". ";
        } else {
            namesString += ", ";
        }
    }

    return namesString;
}




function renderTableEntry(data, i, language) {

    var authorLan = Object.values(texts.authorCatalog)[language];
    var editorLan = Object.values(texts.editorCatalog)[language];
    var translatorLan = Object.values(texts.translatorCatalog)[language];
    var noAuthorLan = Object.values(texts.noAuthorCatalog)[language];

    tableHTML += "<tr><td><div class=\"entry text text-left\"><p class=\"text font-weight-bold\"><svg onclick=\"modalInfo(" + i + ", " + language + ")\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" width=\"15px\" height=\"15px\"><path class=\"icon\" d=\"M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z\"/></svg> " +
        data[i].title +
        "</p><p class=\"text-muted text font-weight-light\">"

    if (data[i].hasOwnProperty('author')) {
        tableHTML += authorLan + printNames(data[i].author);
    } else {
        tableHTML += "<i>" + noAuthorLan + "</i>";
    }
    if (data[i].hasOwnProperty('editor') == true) {
        tableHTML += editorLan + printNames(data[i].editor);
    }
    if (data[i].hasOwnProperty('translator') == true) {
        tableHTML += editorLan + printNames(data[i].translator);
    }


    tableHTML += "</p></div></td><div class=\"entry text text-right\"><td><p class=\"text blue\">"
    if (data[i].issued) {
        tableHTML += data[i].issued["date-parts"];
    }
    tableHTML += "<br>"
    if (data[i]["publisher-place"]) {
        tableHTML += data[i]["publisher-place"];
    }
    tableHTML += "</p></div></td></tr>";
}

function renderTableGeyer(data, heading, language, numberEntries) {
    document.getElementById("catalogGeyer").innerHTML = "";
    tableHTML = "<table id=\"tableCatalog\" class=\"table table-striped\"><tbody>";

    for (i = 0; i < data.length; i++) {
        renderTableEntry(data, i, language);
    }

    tableHTML += '</tbody></table>';

    document.getElementById("catalogGeyer").innerHTML = tableHTML;
    if (typeof numberEntries !== "undefined") {
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
    normalizedInput = accent_fold(input);

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


document.getElementById("sortTitleCaption").addEventListener("click", function () {
    indexingTitleCatalog();
    if (document.getElementById("searchTip").value != "") {
        searchCatalog(document.getElementById("searchTip").value);
    } else {
        renderTableGeyer(ourData, "beginTitleCatalog", lanIndex);
    }
})
document.getElementById("sortAuthorCaption").addEventListener("click", function () {
    indexingAuthorCatalog();
    if (document.getElementById("searchTip").value != "") {
        searchCatalog(document.getElementById("searchTip").value);
    } else {
        renderTableGeyer(ourData, "beginTitleCatalog", lanIndex);
    }
})
document.getElementById("sortYearCaption").addEventListener("click", function () {
    indexingYearCatalog();
    if (document.getElementById("searchTip").value != "") {
        searchCatalog(document.getElementById("searchTip").value);
    } else {
        renderTableGeyer(ourData, "beginTitleCatalog", lanIndex);
    }
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
    'ʿ': '\'', 'ʾ': '\'',
    '.': ' ', ',': ' ', ':': ' ', ';': ' ', '?': ' ', '!': ' '
};
function accent_fold(s) {
    if (!s) {
        return '';
    }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += accentMap[s.charAt(i)] || s.charAt(i);
    }
    returnedNoSpaces = ret.replace(/\s{2,}/g, ' ');
    return returnedNoSpaces.toLowerCase();
};

// ----------

function reducingCatalog(catalog) {
    for (var y = 0; y < catalog.length; y++) {

        entryY = "";
        entryY += " " + catalog[y].title;
        entryY += " " + catalog[y].shortTitle;
        entryY += " " + catalog[y].publisher;
        entryY += " " + catalog[y]["publisher-place"];
        entryY += " " + printNames(catalog[y].author);
        entryY += " " + printNames(catalog[y].editor);
        entryY += " " + printNames(catalog[y].translator);
        entryY += " " + catalog[y].abstract;
        entryY += " " + catalog[y].language;

        var definedY = entryY.replace(/undefined/g, "");
        reducedCatalog[y] = accent_fold(definedY);
    }
}


// still need to compare if no title
function indexingTitleCatalog() {
    ourData.sort(function (a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    reducingCatalog(ourData);
}

//still need to figure out how to compare if only editor name is available
function indexingAuthorCatalog() {
    ourData.sort(function (a, b) {
        return a.author[0]["family"].toLowerCase().localeCompare(b.author[0]["family"].toLowerCase());
    });
    reducingCatalog(ourData);
}

// still need to compare if no year
function indexingYearCatalog() {
    ourData.sort(function (a, b) {
        return parseInt(a.issued["date-parts"][0][0]) - parseInt(b.issued["date-parts"][0][0]);
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