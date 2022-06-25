export function clean(string) {
    return string.replace(/\s+/g, " ").replaceAll("<br>", "\n").trim();
}

export function createLink(link) {
    return link.startsWith("assets/") ? "https://dariocurr.github.io/" + link : link
}