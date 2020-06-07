const PrivacyTips = require('../../models/adminModel/adminPrivacyTipsModel');

exports.viewAll = (req, res, next) => {
    
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

    //updated

    exports.viewAddForm = (req, res, next) => {
        res.render('privacy_tips.add.ejs');
    }
    
    exports.insert = (req, res, next) => {
        const title = req.body.title;
        const description = req.body.description;
        // const link = req.body.link;
        const admin_id = req.session.admin_id;
    
        if((title !== "") && (description !== "")){
            PrivacyTips.insert(req.body, admin_id).then((result)=>{
                if (result == 'success') {
                    res.status(200).redirect('/privacy_tips');
                }
                else {
                    res.status(404).render('privacy_tips.add.ejs', {serverError: false, error: 'Unable to save data!'});
                }
            }).catch(()=>{
                res.status(404).json({ serverError: true, error: 'Database Connection Faliure!' })
            })
        }else{
            res.status(404).render('privacy_tips.add.ejs', { serverError: false, error: 'Input fields cannot be empty.' });
        }
    }
    
    exports.viewEditForm = (req, res, next) => {
        const id = req.query.id;
    
        if((id != "") && (id != null)){
            PrivacyTips.fetch(id).then((result)=>{
                if (result.length > 0) {
                    res.status(200).render('privacy_tips.edit.ejs', { result: result });
                }
                else {
                    res.status(404).redirect('/privacy_tips');
                }
            }).catch(()=>{
                res.status(404).redirect('/privacy_tips');
            });
        }
        else{
            res.status(404).redirect('/privacy_tips');
        }
    }
    
    exports.update = (req, res, next) => {
        const title = req.body.link;
        const description = req.body.description;
        // const link = req.body.link;
    
        if((title !== "") && (description !== "") ){
            PrivacyTips.update(req.body).then((result)=>{
                if (result != null) {
                    res.status(200).redirect('/privacy_tips');
                }
                else {
                    res.status(404).render('privacy_tips.edit.ejs', { serverError: false, error: 'Unable to update data!' });
                }
            }).catch(()=>{
                res.status(404).render('privacy_tips.edit.ejs', { serverError: true, error: 'Database Connection Faliure!' })
            });
        }
        else{
            res.status(404).render('privacy_tips.edit.ejs', { serverError: false, error: 'Input fields cannot be empty.' });
        }
    }
    
    exports.delete = (req, res, next) => {
        const id = req.query.id;
    
        if((id != "") && (id != null)){
            PrivacyTips.delete(id).then((result)=>{
                if (result != null) {
                    res.status(404).redirect('/privacy_tips');
                }
                else {
                    res.status(404).redirect('/privacy_tips');
                }
            }).catch(()=>{
                res.status(404).redirect('/privacy_tips');
            });
        }
        else{
            res.status(404).redirect('/privacy_tips');
        }
    }