const PrivacyTips = require('../../models/adminModel/adminPrivacyTipsModel');

exports.viewAll = (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    else {
        const fetchData =  () => {
            return new Promise((resolve, reject) => {
                resolve((PrivacyTips.getAllData()));
            });
        };
        fetchData().then((result)=>{
            res.status(200).render('privacy_tips', { result: result });
        }).catch((err) => {
            if (err) {
                res.status(404).json({ serverError: true, error: 'Database Connection Faliure!' });
            }
        });
    }
}