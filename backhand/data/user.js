import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'AryanKd',
    email: 'admin@example.com',
    uid: 'Admin1',
    password: bcrypt.hashSync('12345', 10),
    image: '/images/admin.png',
    field: 'ADMIN',
  },
  {
    name: 'Aryan Kodinya',
    email: 'aryan@example.com',
    uid: '20BCS7122',
    password: bcrypt.hashSync('12345', 10),
    field: 'CSE',
  },
  {
    name: 'Sagar',
    email: 'sagar@example.com',
    uid: '20BCS7116',
    password: bcrypt.hashSync('12345', 10),
    field: 'CSE',
  },
  {
    name: 'Harshit Verma',
    email: 'harshit@example.com',
    uid: '20BCA7166',
    password: bcrypt.hashSync('12345', 10),
    field: 'BCA',
  },
];

export default users;
