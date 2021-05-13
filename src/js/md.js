var loaded = false;

function md() {
    if (loaded) {
        createMD();
    } else {
        return $.getScript("src/js/utils.js", () => {
            loaded = true;
            createMD();
        });
    }
}

function extractLinkMD(element) {
    var md = "";
    var text = clean(element.innerHTML);
    element.querySelectorAll("a").forEach(a => {
        var index = text.indexOf("<");
        md += clean(text.substring(0, index)) + " ";
        md += createLinkMD(a);
        text = text.substring(index + clean(a.outerHTML).lastIndexOf(">") + 1);
        if (!(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g.test(text[0]))) {
            md += " ";
        }
    })
    md += clean(text);
    return md;
}

function createLinkMD(element) {
    return "[" + clean(element.innerHTML) + "](" + element.getAttribute("href") + ")";
}

function createMD() {

    var md = "";
    var sections = document.querySelectorAll("section");

    // About
    var about = sections[0];
    md += "# " + clean(about.querySelector("h1").innerHTML) + "\n<br>\n\n";
    var img = document.querySelector("img");
    md += "![" + img.getAttribute("alt") + "](" + img.getAttribute("src") + ")\n<br>\n\n";
    md += extractLinkMD(about.querySelector("span")) + "\n<br>\n<br>\n\n";
    md += clean(about.querySelector("p").innerHTML) + "\n<br>\n\n";
    md += "[Online Resume](https://dariocurr.github.io/)\n<br>\n\n";
    md += Array.from(about.querySelectorAll(".social-icon")).map(socialIcon => createLinkMD(socialIcon)).join(" ");
    md += "\n<br>\n<br>\n<br>\n\n";

    // Experience and Education
    for (var i= 1; i < 3; i++) {
        var section = sections[i]
        md += "## " + clean(section.querySelector("h2").innerHTML) + "\n<br>\n<br>\n\n";
        section.querySelectorAll("article").forEach(article => {
            var descriptionDiv = article.firstElementChild;
            var dateDiv = descriptionDiv.nextElementSibling;
            md += "### " + clean(descriptionDiv.querySelector("h3").innerHTML) + "\n";
            md += "#### " + clean(descriptionDiv.querySelector("span").innerHTML) + "\n";
            md += "##### " + clean(dateDiv.querySelector("span").innerHTML) + "\n";
            article.querySelectorAll("p").forEach(p => {
                var description;
                if (p.querySelector("a")) {
                    description = extractLinkMD(p);
                } else {
                    description = p.innerHTML;
                }
                md += clean(description) + "\n";
                })
            md += "<br>\n<br>\n\n";
        });
        md += "<br>\n\n";
    }

    // Skills
    var skills = sections[3];
    md += "## " + clean(skills.querySelector("h2").innerHTML) + "\n<br>\n<br>\n\n";
    skills.querySelectorAll("h3").forEach(h3 => {
        md += "### " + clean(h3.innerHTML) + "\n<br>\n\n";
        h3.nextElementSibling.querySelectorAll("li").forEach(li => {
            var span = li.querySelector("span");
            if (span) {
                md += span.outerHTML + " ";
                var a = li.querySelector("a");
                if (a) {
                    md += createLinkMD(a);
                } else {
                    md += clean(li.textContent);
                }
            } else {
                var svg = li.querySelector("svg");
                if (svg) {
                    md += svg.outerHTML;
                }
            }
            md += "\n";
        });
        md += "<br>\n<br>\n\n";
    });
    md += "<br>\n\n";

    // Interests
    var interests = sections[4];
    md += "## " + clean(interests.querySelector("h2").innerHTML) + "\n<br>\n<br>\n\n";
    md += clean(interests.querySelector("p").innerHTML);
    
    console.log(md);
}
