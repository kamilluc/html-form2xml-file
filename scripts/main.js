const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");
const inputs = document.querySelectorAll("[data-tag]");
var x = document.getElementById("myFile");

function json2xml(inputs) {
  let xml = `<?xml version="1.0" ?>`;
  xml += `\n<data>`;

  inputs.forEach(input => {
    xml += `\n\t<${input.dataset.tag}>${input.value}</${input.dataset.tag}>`;
  });

  xml += `\n</data>`;
  return xml;
}

function xml2object(xml) {
  let obj = `<?xml version="1.0" ?>`;

  return obj;
}

function fillForm(obj = {}) {}

function download(filename, text) {
  const pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

let xxx;

function addImportToDom(tag, content) {
  inputs.forEach(item => {
    //console.log(item.dataset.tag, tag);
    if (item.dataset.tag == tag) item.value = content;
    //if (item.dataset.tag == tag) console.log(item.value);
  });
}

function importHandler(e) {
  e.preventDefault();
  console.log("import");
  const fileToLoad = x.files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    //todo: fill from
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(textFromFileLoaded, "text/xml");
    // xxx = xmlDoc;
    // console.log("string", textFromFileLoaded);
    // console.log("xml", xmlDoc);
    const temparr = Array.from(Array(xmlDoc)[0].all);
    temparr.forEach(item => {
      //console.log(item.tagName, item.textContent);
      addImportToDom(item.tagName, item.textContent);
    });
    //todo: with that data fill form in html
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

function exportHandler(e) {
  e.preventDefault();
  //   console.log("export");
  let data = json2xml(inputs);
  download("data.xml", data);
}

importButton.addEventListener("click", importHandler);
exportButton.addEventListener("click", exportHandler);
