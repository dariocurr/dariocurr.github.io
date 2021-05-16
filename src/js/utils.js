function clean(string) {
    return string.replace(/\s+/g, " ").replaceAll("<br> ", "\n").trim();
}

function createLink(link) {
    if (link.startsWith("assets/")) {
        return "https://dariocurr.github.io/" + link;
    }
    return link;
}