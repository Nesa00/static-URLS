const savedUrlsData = { // Assuming you have this data
    "savedUrls": {
      "Tips & tricks": {
        "Other" : [
          {"title": "Windows shell tips", "url": "https://wintip.cz/3800-kompletni-seznam-shell-prikazu-pro-windows-10"},
          {"title": "Proxmox cheat sheet", "url": "https://tteck.github.io/Proxmox/"},
        ],
        "Tutorial" : [
          {"title": "Linux tutorial", "url": "https://www.tutorialspoint.com/unix/index.htm"},
          {"title": "Python tutorial", "url": "https://www.w3schools.com/python/default.asp"},
          {"title": "Tutorial point", "url": "https://www.tutorialspoint.com/"},
          {"title": "Git tutorial", "url": "https://www.atlassian.com/git/tutorials/what-is-version-control"},
        ],
        "Learning" : [
          {"title": "Markdown tutorial", "url": "https://www.markdowntutorial.com/"},
          {"title": "Linux Journey", "url": "https://linuxjourney.com/"},
          {"title": "Learn Git", "url": "https://learngitbranching.js.org/"},
          {"title": "Learn Regex", "url": "https://regexone.com/"},
          {"title": "Learn Markdown", "url": "https://commonmark.org/help/tutorial/"},
          {"title": "ryanstutorials", "url": "https://ryanstutorials.net/"},
        ],
      },
      "Tools": {
        "Text": [
          { "title": "Patrojk", "hover": "Patrojk - Ascii art and random stuff" , "url": "https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20" },
          { "title": "Lorem ipsum", "url": "https://www.lipsum.com/" },
          { "title": "Hipster ipsum", "url": "https://hipsum.co/" },
          { "title": "Markdown editor", "url": "https://pandao.github.io/editor.md/en.html" },

              ],
              "Picture": [
                { "title": "Convertio", "hover": "Picture format converter" , "url": "https://convertio.co/png-ico/" },
                { "title": "Random photo", "url": "https://picsum.photos/" },
                { "title": "Remove BG", "url": "https://www.remove.bg/" },
                { "title": "Picture analysis", "url": "https://exifdata.com/index.php" },
                { "title": "Image Editor", "url": "https://www.iloveimg.com/" },
                { "title": "Color inverter", "url": "https://pinetools.com/invert-image-colors" },
              ],
              "Color": [
                { "title": "HTML Color codes","url": "https://htmlcolorcodes.com/" },
                { "title": "Color picker","url": "https://imagecolorpicker.com/" },
                { "title": "Color contrast test","url": "https://coolors.co/contrast-checker/cbcbcb-000000" },
              ],
              "Multi": [
                { "title": "Multi editor", "url": "https://photo333.com/" },
                { "title": "Image to excel", "url": "https://www.table-reader.com/image-to-excel" },
                { "title": "Pinetools", "url": "https://pinetools.com" },
                { "title": "Patorjk", "url": "https://patorjk.com" },
                { "title": "AI rewriter", "url": "https://undetectable.ai/?via=36ovg&fp_sid=aicheck" },
                { "title": "Useles Web", "url": "https://theuselessweb.com/" },
              ],
              "3D": [
                { "title": "3D model viewer", "url": "https://3dviewer.net/" },
                { "title": "3D model converter", "url": "https://anyconv.com/stl-to-obj-converter/" },
                { "title": "Tinkercad", "hover": "Tinkercad - 3D model editor", "url": "https://www.tinkercad.com/" },
                { "title": "Onshape", "url": "https://www.onshape.com/" },
                { "title": "Thingiverse","hover":"3D model market" , "url": "https://www.thingiverse.com/" },
                { "title": "Printables","hover":"3D model market" , "url": "https://www.printables.com/" },
                { "title": "cults3d","hover":"3D model market" , "url": "https://cults3d.com/" },
              ],
              "Diagram": [
                { "title": "Draw.io", "url": "https://app.diagrams.net/" },
                { "title": "Lucidchart", "url": "https://www.lucidchart.com/pages/" },
                { "title": "Mindmeister", "url": "https://www.mindmeister.com/" },
                { "title": "Mindomo", "url": "https://www.mindomo.com/" },
                { "title": "Mind42", "url": "https://mind42.com/" },
                { "title": "Coggle", "url": "https://coggle.it/" },
                { "title": "Mermaid", "url": "https://mermaid.live/" },
              ],
              "AI": [
                { "title": "Chat GPT", "url": "https://chat.openai.com/" },
                { "title": "Gemini", "url": "https://gemini.google.com/app/ec07d62290e9dd58" },
                { "title": "MS copilot", "url": "https://copilot.microsoft.com/" },
          { "title": "Mistral", "url": "https://chat.mistral.ai/chat" },
          { "title": "Wistron Chat", "hover":"Columbus", "url": "https://columbus.wistron.com/" },

        ],
      },
    }
  };
  
const main = document.getElementById('saved-urls');

function createUrlList(category, subcategories) {
  const box = document.createElement('div')
  box.className = "box"
  
  main.appendChild(box)
  const categoryHeader = document.createElement('h2');
  categoryHeader.textContent = category;
  box.appendChild(categoryHeader);

  
  const sticky = document.createElement('div')
  sticky.id = category;
  sticky.style.display = 'none';

  box.addEventListener('click', () => {

    if (sticky.style.display === 'none') {
        sticky.style.display = 'block'; 
    } else {
        sticky.style.display = 'none'; 
    }
  });
  box.addEventListener('mouseover', () => {
      box.style.backgroundColor = "#d9fce1"; // Light green on hover
  });

  box.addEventListener('mouseout', () => {
      box.style.backgroundColor = "#88d399"; // Original color when not hovered
  });
  
  box.appendChild(sticky)

  Object.entries(subcategories).forEach(([subCategory, urls]) => {
    const urlList = document.createElement('li');
    urlList.classList.add('list-group-item');

    const subCategoryHeader = document.createElement('h4');
    subCategoryHeader.textContent = subCategory;
    urlList.appendChild(subCategoryHeader);

    const urlItems = document.createElement('ul');

    urlList.appendChild(urlItems);
    sticky.appendChild(urlList);
    urlItems.classList.add('list-group');

    urls.forEach(url => {
      const urlButton = document.createElement('button');
      urlButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'px-3');
      urlButton.textContent = url.title || url.url;
      // urlButton.title = url.title || url.url; // Set full title for hover text
      urlButton.title = url.hover || url.title || url.url;
      urlButton.addEventListener('click', () => {
        // open in new tab 
        window.open(url.url, '_blank'); 

      });
      urlButton.addEventListener('mouseover', () => {
        // const c1 = document.getElementById('copy-context')
        // c1.textContent = url.title;
        // urlButton.style.color = "white";
        urlButton.style.backgroundColor = "#28a745";
        });
      urlButton.addEventListener('mouseout', () => {
        urlButton.style.backgroundColor = "";
      });

      urlItems.appendChild(urlButton);
    });

  });
}

Object.entries(savedUrlsData.savedUrls).forEach(([category, subcategories]) => {
  createUrlList(category, subcategories);
});
  