exports.isStaticResource = req => {
    return /\/my.css$/.test(req.url)
}