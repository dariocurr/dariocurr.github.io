import { clean, createLink } from "./utils.js";

window.md = function () {

    var md = "";
    var sections = document.querySelectorAll("section");

    // About
    var about = sections[0];
    md += "# " + clean(about.querySelector("h1").textContent) + "\n<br>\n\n";
    var img = document.querySelector("img");
    md += "![" + img.getAttribute("alt") + "](" + createLink(img.getAttribute("src")) + ")\n<br>\n\n";
    md += extractTextMD(about.querySelector("span")) + " · [Online Curriculum Vitae](https://dariocurr.github.io/)" + "\n<br>\n\n";
    md += clean(about.querySelector("p").innerHTML) + "\n<br>\n\n";
    md += Array.from(about.querySelectorAll(".social-icon")).map(socialIcon => createLinkMD(socialIcon)).join(" ");
    md += "\n<br>\n<br>\n<br>\n\n";

    // Experience and Education
    for (var i = 1; i < 4; i += 2) {
        var section = sections[i]
        md += "## " + clean(section.querySelector("h2").textContent) + "\n<br>\n\n";
        section.querySelectorAll("article").forEach(article => {
            var descriptionDiv = article.firstElementChild;
            var dateDiv = descriptionDiv.nextElementSibling;
            md += "### " + clean(descriptionDiv.querySelector("h3").textContent) + "\n";
            md += "#### " + clean(descriptionDiv.querySelector("span").textContent) + "\n";
            md += "##### " + clean(dateDiv.querySelector("span").textContent) + "\n";
            article.querySelectorAll("p").forEach(p => md += extractTextMD(p) + "\n\n")
            md = md.substring(0, md.length - 1);
            article.querySelectorAll("li").forEach(li => md += "- " + extractTextMD(li) + "\n")
            md += "<br>\n<br>\n\n";
        });
        md = md.substring(0, md.length - 1);
        md += "<br>\n\n";
    }

    // Publications
    var publications = sections[2];
    md += "## " + clean(publications.querySelector("h2").textContent) + "\n<br>\n\n";
    var lis = publications.querySelectorAll("li");
    for (var i = 0; i < lis.length; i++) {
        md += (i + 1) + ". " + extractTextMD(lis[i]);
    }
    md += "\n<br>\n<br>\n<br>\n\n";

    // Skills
    var skills = sections[4];
    md += "## " + clean(skills.querySelector("h2").textContent) + "\n<br>\n\n";
    skills.querySelectorAll("h3").forEach(h3 => {
        md += "### " + clean(h3.textContent) + "\n<br>\n\n";
        h3.nextElementSibling.querySelectorAll("li").forEach(li => {
            var span = li.querySelector("span");
            if (span) {
                md += span.outerHTML + " ";
                var description = span.nextElementSibling;
                if (description.tagName == "A") {
                    md += createLinkMD(description) + " ";
                } else {
                    md += clean(description.textContent);
                }
                var svgs = li.querySelectorAll("svg");
                for (var i = 1; i < svgs.length; i++) {
                    md += svgs[i].outerHTML + " "
                }
            } else {
                var svg = li.querySelector("svg");
                if (svg) {
                    md += svg.outerHTML;
                }
            }
            md += "\n\n";
        });
        md = md.substring(0, md.length - 1);
        md += "<br>\n<br>\n\n";
    });
    md = md.substring(0, md.length - 1);
    md += "<br>\n\n";

    // Interests
    var interests = sections[5];
    md += "## " + clean(interests.querySelector("h2").textContent) + "\n<br>\n\n";
    md += clean(interests.querySelector("p").textContent);

    console.log(md);
}


function extractTextMD(element) {
    if (element.querySelector("a")) {
        return extractLinkMD(element);
    } else {
        return clean(element.textContent);
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
    return "[" + clean(element.innerHTML) + "](" + createLink(element.getAttribute("href")) + ")";
}