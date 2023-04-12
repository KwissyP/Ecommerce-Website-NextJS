import db from "@/utils/db";
import { getToken } from "next-auth/jwt";
import Order from "../../../../models/Order";

const handler = async (req, res) => {
    const user = await getToken({ req });
    if(!user) {
        return res.status(401).send('SignIn required');
    }
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
}

export default handler;