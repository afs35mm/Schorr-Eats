function formatNameForDir(s) {
    return s.replace(/\s/g, '-').toLowerCase();
}

module.exports = {
    formatNameForDir,
};
