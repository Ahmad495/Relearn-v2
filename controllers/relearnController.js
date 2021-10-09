module.exports.index = (req, res) => {
    res.render('relearn/index');
}
module.exports.courses = (req, res) => {
    res.render('relearn/courses');
}
module.exports.about = (req, res) => {
    res.render('relearn/about');
}
module.exports.contact = (req, res) => {
    res.render('relearn/contact');
}
module.exports.signUp = (req, res) => {
    res.render('relearn/signUp');
}
module.exports.signIn = (req, res) => {
    res.render('relearn/signIn');
}