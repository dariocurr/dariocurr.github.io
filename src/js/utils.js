function clean(string) {
    return string.replace(/\s+/g, " ").replaceAll("<br> ", "\n").trim();
}