import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('password'),
            idAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('password'),
            idAdmin: false,
        },
    ],
    products: [],
}

export default data;