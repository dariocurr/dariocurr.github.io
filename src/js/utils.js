function clean(string) {
    return $('<textarea/>').html(string).text().replace(/\s+/g, " ").replaceAll("<br> ", "\n").trim();
}

function createLink(link) {
    if (link.startsWith("assets/")) {
        return "https://dariocurr.github.io/" + link;
    }
    return link;
}