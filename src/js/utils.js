export function clean(str) {
    return str.replaceAll(/\s+/g, " ").trim().replaceAll("<br>", "\n");
}

export function createLink(link) {
    return link.startsWith("assets/") ? "https://dariocurr.github.io/" + link : link
}