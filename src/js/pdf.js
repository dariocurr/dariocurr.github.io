var loaded = false;

function pdf(shrinked) {
    if (loaded) {
        if (shrinked) {
            pdfMake.createPdf(getResume()).download("Dario Curreri's Resume.pdf");
        } else {
            pdfMake.createPdf(getCurriculumVitae()).download("Dario Curreri's Curriculum Vitae.pdf");
        }
        console.log("PDF file generated!");
    } else {
        $.when(
            $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.70/pdfmake.min.js"),
            $.getScript("src/js/utils.js"),
            $.getScript("src/js/assets.js"),
            $.Deferred(deferred => $(deferred.resolve))
        ).done(() => {
            loaded = true;
            pdfMake.fonts = {
                Roboto: {
                    normal: 'Muli-Regular.ttf',
                    bold: 'SairaExtraCondensed-SemiBold.ttf',
                    italics: 'Muli-Italic.ttf',
                }
            };
            pdf(shrinked);
        })
    }
}


function extractTextPDF(tag) {
    if (tag.querySelector("a")) {
        return extractLinkPDF(tag);
    } else {
        return clean(tag.innerHTML);
    }
}


function extractLinkPDF(element) {
    var dicts = [];
    var text = clean(element.innerHTML);
    element.querySelectorAll("a").forEach(a => {
        var index = text.indexOf("<");
        dicts.push({text: clean(text.substring(0, index)) + " "});
        dicts.push({
            text: clean(a.innerHTML),
            link: createLink(a.getAttribute("href")),
            style: ["link"]
        })
        text = text.substring(index + clean(a.outerHTML).lastIndexOf(">") + 1);
        if (!(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g.test(text[0]))) {
            dicts.push(" ");
        }
    })
    if (text.length > 0) {
        dicts.push({text: clean(text)});
    }
    return dicts;
}

function createSkillsListPDF(ul, width, height) {
    var lis = [];
    ul.querySelectorAll("li").forEach(li => {
        var span = li.querySelector("span");
        if (span) {
            var a = li.querySelector("a");
            var text = {}
            if (a) {
                text = {
                    text: clean(a.innerHTML),
                    link: createLink(a.getAttribute("href")),
                    style: ["link"]
                };
            } else {
                text = {
                    text: clean(li.textContent),
                };
            }
            text["margin"] = [0, - ((0.875 * height) - 4.75)];
            var dots = []
            li.querySelectorAll("svg.fa-circle").forEach(svg => {
                svg.setAttribute("style", "fill: #444444");
                dots.push({
                    svg: svg.outerHTML,
                    width: height - 1,
                    height: height - 1
                });
            });
            var columns = [{
                svg: span.querySelector("svg").outerHTML,
                width: width,
                height: height
            }, text]
            if (dots.length > 0) {
                columns.push({
                    columns: dots,
                    columnGap: 2,
                    margin: [0, 1],
                    width: (1.4 * width + 65) + "%"
                })
            }
            lis.push({
                columns: columns,
                columnGap: 7
            });
        }
        lis.push({text: "\n", style: "listDivisor"});
    });
    return lis.slice(0, lis.length - 1);
}

function createSimpleListPDF(tag) {
    var list = []
    tag.querySelectorAll("li").forEach(li => {
        list.push({
            text: extractTextPDF(li),
            style: "description"
        });
    })
    return list;
}


function getCurriculumVitae() {

    var content = [];
    var sections = document.querySelectorAll("section");

    // About
    var about = sections[0];
    content.push({
        text: clean(about.querySelector("h1").innerHTML).toUpperCase() + "\n\n",
        style: "h1"
    });
    var dicts = extractLinkPDF(about.querySelector("span"));
    dicts[0]["text"] = dicts[0]["text"].replaceAll(" · ", "  ·  ").toUpperCase();
    dicts[0]["style"] = "subheading";
    dicts[1]["style"].push("subheading");
    var icons = []
    Array.from(about.querySelectorAll(".social-icon"))
        .forEach(socialIcon => {
            var svg = socialIcon.querySelector("svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            var a = document.createElement("a");
            a.setAttribute("xlink:href", socialIcon.getAttribute("href"));
            a.setAttribute("target", "_blank");
            a.appendChild(svg.firstElementChild);
            svg.appendChild(a);
            svg.setAttribute("style", "fill: #222222");
            icons.push({
                svg: svg.outerHTML,
                width: 25,
                height: 25
            });
        }
    );
    content.push({
        columns: [{
                image: "profile",
                width: 150,
                height: 150,
                link: "https://dariocurr.github.io/"
            }, {
                text: "",
                width: "12%"
            }, {
                stack: [{
                    text: dicts,
                    margin: [0, 11]
                }, {
                    columns: icons,
                    columnGap: (262 - icons.length * 25) / (icons.length - 1),
                    margin: [0, 15]
                }, {
                    text: "dariocurr.github.io",
                    link: "dariocurr.github.io",
                    style: ["link", "subheading"],
                    margin: [0, 12]
                }]
            }
        ]
    }, "\n\n");
    content.push({
        text: clean(about.querySelector("p").innerHTML),
        style: "description"
    });
    content.push("\n\n\n");

    // Experience and Education
    for (var i= 1; i < 3; i++) {
        var section = sections[i]
        content.push({
            text: clean(section.querySelector("h2").innerHTML).toUpperCase() + "\n\n",
            style: "h2"
        });
        section.querySelectorAll("article").forEach(article => {
            var descriptionDiv = article.firstElementChild;
            var date = descriptionDiv.nextElementSibling.querySelector("span").innerHTML;
            content.push({
                columns: [{
                    text: clean(descriptionDiv.querySelector("h3").innerHTML).toUpperCase(),
                    style: "h3"
                }, {
                    text: clean(date),
                    alignment: "right",
                    width: date.length * 1.20 + "%",
                    margin: [0, 7.5],
                    style: "date"
                }]
            });
            content.push({
                text: clean(descriptionDiv.querySelector("span").innerHTML).toUpperCase(),
                style: "subheading"
            });
            article.querySelectorAll("p").forEach(p => {
                content.push({
                    text: extractTextPDF(p),
                    style: "description"
                });
                content.push({
                    text: "\n",
                    style: "listDivisor"
                });
            });
            content.pop();
            var ul = article.querySelector("ul");
            if (ul) {
                content.push([{
                    ul: createSimpleListPDF(ul),
                    margin: [10, 0]
                }]);
            }
            content.push("\n\n");
        });
        content.push("\n\n");
    }

    /* Publications 
    var publications = sections[4];
    content.push({
        text: clean(publications.querySelector("h2").innerHTML).toUpperCase() + "\n\n",
        style: "h2"
    });
    content.push([{
        ol: createSimpleListPDF(publications.querySelector("ol")),
        margin: [10, 0]
    }]);
    content.push("\n\n\n\n");
    */

    // Skills
    var skills = sections[3];
    content.push({
        text: clean(skills.querySelector("h2").innerHTML).toUpperCase() + "\n\n",
        style: "h2",
    });
    h3s = skills.querySelectorAll("h3");
    content.push({
        text: clean(h3s[0].textContent).toUpperCase() + "\n\n",
        style: "h3"
    });
    content.push(createSkillsListPDF(h3s[0].nextElementSibling, 15, 10));
    content.push("\n\n");
    content.push({
        text: clean(h3s[1].textContent).toUpperCase() + "\n\n",
        style: ["h3", "divisor"]
    });
    var svgs = []
    h3s[1].nextElementSibling.querySelectorAll("li").forEach(li => {
        var svg = li.querySelector("svg");
        svg.setAttribute("style", "fill: #222222");
        if (svg) {
            svgs.push({
                svg: svg.outerHTML,
                width: 25,
                height: 25
            });
        }
    });
    var rows = Math.floor(svgs.length / 11);
    var step = svgs.length / (rows + 1);
    for (var i = 0; i < rows; i++) {
        content.push({
            columns: svgs.slice(step * i, step * (i + 1)),
            columnGap: 25
        }, "\n");
    }
    content.push({
        columns: svgs.slice(step * rows),
        columnGap: 25
    });
    content.push("\n\n");
    content.push({
        text: clean(h3s[2].textContent).toUpperCase() + "\n\n",
        style: "h3"
    });
    content.push(createSkillsListPDF(h3s[2].nextElementSibling, 15, 10));
    //content.push("\n\n\n\n")

    /* Interests
    var interests = sections[5];
    content.push({
        text: clean(interests.querySelector("h2").innerHTML).toUpperCase() + "\n\n",
        style: "h2"
    });
    content.push(clean(interests.querySelector("p").innerHTML));
    */

    // PDF
    var docDefinition = {
        content: content,
        info: {
            title: "Dario Curreri's Curriculum Vitae",
            author: "Dario Curreri",
            creator: "Dario Curreri",
            producer: "Dario Curreri"
        },
        defaultStyle: {
            fontSize: 11,
            color: "#444444",
        },
        styles: {
            h1: {
                fontSize: 36,
                bold: true,
                color: "#222222",
                lineHeight: 0.6
            },
            h2: {
                fontSize: 28,
                bold: true,
                color: "#222222",
                lineHeight: 0.8
            },
            h3: {
                fontSize: 20,
                bold: true,
                color: "#222222",
                lineHeight: 0.7
            },
            date: {
                fontSize: 10,
                color: "#f59d62",
                lineHeight: 0.7
            },
            subheading: {
                fontSize: 18,
                bold: true,
            },
            link: {
                color: "#f59d62"
            },
            listDivisor: {
                lineHeight: 0.6
            },
            divisor: {
                lineHeight: 0.75
            },
            description: {
                alignment: 'justify'
            }
        },
        images: {
            profile: profile
        },
        compress: true,
        pageMargins: [40, 40, 40, 35],
        pageBreakBefore: function(currentNode) {
            return ("columns" in currentNode && currentNode["startPosition"]["verticalRatio"] > 0.85) || 
                    (currentNode["style"] == "h2" && currentNode["startPosition"]["verticalRatio"] > 0.69);
        }
    };

    return docDefinition;

}


function getResume() {

    var content = [];
    var sections = document.querySelectorAll("section");

    // About
    var about = sections[0];
    content.push({
        text: clean(about.querySelector("h1").innerHTML).toUpperCase(),
        style: ["h1", "titleDivisor"]
    });
    var dicts = extractLinkPDF(about.querySelector("span"));
    dicts[0]["text"] = dicts[0]["text"].replaceAll(" · ", "  ·  ").toUpperCase();
    dicts[0]["style"] = "subtitle";
    dicts[1]["style"].unshift("subtitle");
    dicts[2] = {
        text: "  ·  ",
        style: "subtitle"
    };
    dicts[3] = {
        text: "dariocurr.github.io",
        link: "dariocurr.github.io",
        style: ["subtitle", "link"],
    }
    dicts.unshift({
        text: "GRADUATED COMPUTER SCIENTIST  ·  ",
        style: "subtitle"
    });
    var icons = []
    Array.from(about.querySelectorAll(".social-icon"))
        .forEach(socialIcon => {
            var svg = socialIcon.querySelector("svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            var a = document.createElement("a");
            a.setAttribute("xlink:href", socialIcon.getAttribute("href"));
            a.setAttribute("target", "_blank");
            a.appendChild(svg.firstElementChild);
            svg.appendChild(a);
            svg.setAttribute("style", "fill: #222222");
            icons.push({
                svg: svg.outerHTML,
                width: 13,
                height: 13
            });
        }
    );
    content.push({
        columns: [{
            text: dicts,
            width: "80%"
        }, {
            columns: icons,
            columnGap: 16.75,
            width: "20%",
            margin: [0, 2.9]
        }],
    });
    content.push({
        text: "\n",
        style: "mainDivisor"
    });
    var p = clean(about.querySelector("p").innerHTML);
    content.push({
        text: p.substring(p.indexOf("\n") + 1)
    });
    content.push({
        text: "\n",
        style: "sectionDivisor"
    });


    // Experience and Education
    columns = [[], []]
    for (var i= 1; i < 3; i++) {
        var section = sections[i]
        columns[i - 1].push({
            text: clean(section.querySelector("h2").innerHTML).toUpperCase(),
            style: "h2"
        });
        section.querySelectorAll("article").forEach(article => {
            var descriptionDiv = article.firstElementChild;
            var dates = descriptionDiv.nextElementSibling.querySelector("span").innerHTML.split(" - ").map(date => clean(date));
            var maxLength = Math.max.apply(Math, dates.map(date => date.length));
            columns[i - 1].push({
                columns: [{
                    stack: [{
                        text: clean(descriptionDiv.querySelector("h3").innerHTML).toUpperCase().replaceAll("/", "\n"),
                        style: "h3"
                    }, {
                        text: "\n",
                        style: "headingDivisor"
                    }, {
                        text: clean(descriptionDiv.querySelector("span").innerHTML).toUpperCase().replaceAll("/", "\n"),
                        style: "subheading"
                    }
                ]}, {
                    stack: dates,
                    alignment: "right",
                    width: maxLength * 1.85 + "%",
                    style: "date",
                    margin: [0, 3.5]
                }],
                columnGap: 15
            });
            columns[i - 1].push({
                text: "\n",
                style: "divisor"
            });
        });
    }

    /* Publications 
    var publications = sections[4];
    columns[0].push({
        text: "\n",
        style: "sectionDivisor"
    })
    columns[0].push({
        text: clean(publications.querySelector("h2").innerHTML).toUpperCase(),
        style: "h2"
    });
    columns[0].push([{
        ol: createSimpleListPDF(publications.querySelector("ol")),
        margin: [10, 0]
    }]);
    */

    content.push({
        columns: columns,
        columnGap: 45
    });
    content.push({
        text: "\n",
        style: "sectionDivisor"
    });


    // Skills
    var skills = sections[3];
    content.push({
        text: clean(skills.querySelector("h2").innerHTML).toUpperCase(),
        style: "h2",
    });
    columns = [[], []]
    h3s = skills.querySelectorAll("h3");

    columns[0].push({
        text: clean(h3s[2].textContent).toUpperCase(),
        style: "h3"
    });
    columns[0].push({
        text: "\n",
        style: "titleDivisor"
    });
    columns[0].push(createSkillsListPDF(h3s[2].nextElementSibling, 10, 8));

    columns[1].push({
        text: clean(h3s[0].textContent).toUpperCase(),
        style: "h3"
    });
    columns[1].push({
        text: "\n",
        style: "titleDivisor"
    });
    columns[1].push(createSkillsListPDF(h3s[0].nextElementSibling, 10, 8));
    columns[1].push({
        text: "\n",
        style: "sectionDivisor"
    });
    columns[1].push({
        text: clean(h3s[1].textContent).toUpperCase(),
        style: "h3"
    });
    columns[1].push("\n");
    var svgs = []
    h3s[1].nextElementSibling.querySelectorAll("li").forEach(li => {
        var svg = li.querySelector("svg");
        svg.setAttribute("style", "fill: #222222");
        if (svg) {
            svgs.push({
                svg: svg.outerHTML,
                width: 13,
                height: 13
            });
        }
    });
    var rows = Math.floor(svgs.length / 8);
    var step = svgs.length / (rows + 1);
    for (var i = 0; i < rows; i++) {
        columns[1].push({
            columns: svgs.slice(step * i, step * (i + 1)),
            columnGap: 20
        }, "\n");
    }
    columns[1].push({
        columns: svgs.slice(step * rows),
        columnGap: 20
    });

    content.push({
        columns: columns,
        columnGap: 45
    });


    // PDF
    var docDefinition = {
        content: content,
        info: {
            title: "Dario Curreri's Resume",
            author: "Dario Curreri",
            creator: "Dario Curreri",
            producer: "Dario Curreri"
        },
        defaultStyle: {
            fontSize: 7.5228,
            color: "#555555",
        },
        styles: {
            h1: {
                fontSize: 22,
                bold: true,
                color: "#222222"
            },
            h2: {
                fontSize: 16,
                bold: true,
                color: "#222222",
                lineHeight: 1.15
            },
            h3: {
                fontSize: 11.8,
                bold: true,
                color: "#222222",
                lineHeight: 0.7
            },
            subtitle: {
                fontSize: 11.8,
                bold: true,
                color: "#666666",
            },
            subheading: {
                fontSize: 10,
                bold: true,
                color: "#666666",
                lineHeight: 0.7,
            },
            date: {
                fontSize: 6.5,
                color: "#f59d62",
                lineHeight: 0.85
            },
            link: {
                color: "#f59d62"
            },
            listDivisor: {
                lineHeight: 0.6
            },
            sectionDivisor: {
                lineHeight: 2
            },
            headingDivisor: {
                lineHeight: 0.25
            }, 
            titleDivisor: {
                lineHeight: 0.9
            },
            mainDivisor: {
                lineHeight: 0.4
            }
        },
        pageMargins: [40, 40, 40, 40],
        compress: true
    };

    return docDefinition;

}