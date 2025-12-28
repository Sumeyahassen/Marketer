const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createSuperAdmin() {
  const email = 'admin@majet.com'; // Change to your email
  const password = 'admin123'; // Change to a strong password
  const name = 'Super Admin';

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const superAdmin = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email,
        name,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'approved',
      },
    });

    console.log('Super Admin created successfully!');
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);
    console.log('Status:', superAdmin.status);
  } catch (error) {
    console.error('Error creating Super Admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();