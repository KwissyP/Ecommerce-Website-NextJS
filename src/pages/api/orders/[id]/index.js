import db from "@/utils/db";
import { getToken } from "next-auth/jwt";
import Order from "../../../../../models/Order";

const handler = async (req, res) => {
    const session = await getToken({ req });
    if(!session) {
        return res.status(401).send('SignIn required');
    }
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.disconnect();
    res.send(order);
}

export default handler;