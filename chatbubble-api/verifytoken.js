async function verifyToken(req, res, next) {

    const idToken = req.headers.authorization

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)

        if (decodedToken) {
            req.body.uid = decodedToken.uid

            return next()

        } else {
            return res.status(401).send('You are nor authorized ...')
        }
    } catch (e) {
        return res.status(401).send('You are authorized !')
    }
}