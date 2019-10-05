const express = require('express')
const admin = require('../firebase-admin/admin')
const router = express.Router()
const db = admin.database()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


//Post message
router.post('/messages', (req, res) => {
    let message = req.body
    let messageKey = [message.from, message.to].sort().join('')

    //Create unique id
    let refId = db.ref().child('messages').push().key

    let path = db.ref(`messages/${messageKey}/${refId}`)
    let setMessage = path.set({
        'from'    : message.from,
        'to' : message.to,
        'message'     : message.message,
        'date' : message.date,
    })
    res.status(200).json({
        messageInfos: message,
        statue: 'Great work',
        success: true
    })
})

//Get Messages
router.get('/messages/:idUsers', (req, res) => {
    let users = req.params.idUsers
    // let messageKey = [users.from, users.to].sort().join('')
    let path = db.ref(`messages/${users}`)
    let getMessage = path.once('value').then(v => res.status(200).json({
        messages: v.val(),
        statue: 'Great work',
        success: true
    })
    )

})

//Delete message
router.delete('/messages/:messageId', (req, res) => {
    let users = req.body
    let messageId = req.params.messageId
    let messageKey = [users.from, users.to].sort().join('')
    let path = db.ref(`messages/${messageKey}/${messageId}`)
    let deleteMessage = path.remove()
    res.status(200).json({
        response: 'le message est bien supprimé',
        statue: 'Great work',
        success: true
    })
})


module.exports = router
