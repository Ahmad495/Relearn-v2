module.exports.index = (req, res) => {
    res.render('relearn/index');
}

module.exports.courses = (req, res) => {
    res.render('relearn/courses');
}
module.exports.about = (req, res) => {
    res.render('relearn/about');
}