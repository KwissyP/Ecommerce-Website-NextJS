import { getToken } from 'next-auth/jwt'

const handler = async (req, res) => {
    const session = await getToken({ req });
    if (!session) {
        return res.status(401).send('SignIn required');
    }
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
}

export default handler;