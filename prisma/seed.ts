import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUserRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER'
    },
  });

  const plans = [
    {
      name: 'BASIC',
      permissions: [
        { name: 'viewAllProfiles', value: false },
        { name: 'sendMessage', value: false },
        { name: 'customizationTodo', value: false },
        { name: 'addPhoto', value: false },
      ],
    },
    {
      name: 'PREMIUM',
      permissions: [
        { name: 'viewAllProfiles', value: true },
        { name: 'sendMessage', value: false },
        { name: 'customizationTodo', value: false },
        { name: 'addPhoto', value: true },
      ],
    },
    {
      name: 'ULTIMATE',
      permissions: [
        { name: 'viewAllProfiles', value: true },
        { name: 'sendMessage', value: true },
        { name: 'customizationTodo', value: true },
        { name: 'addPhoto', value: true },
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: {
        name: plan.name,
        permissions: {
          create: plan.permissions,
        },
      },
    });
  }

  console.log('Default plans created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
