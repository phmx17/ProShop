import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Anya Talor-Joy',
    email: 'anya@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jojo Mayer',
    email: 'jojo@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users;