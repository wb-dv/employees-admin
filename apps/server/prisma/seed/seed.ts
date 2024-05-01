import { $Enums, Account, PrismaClient, Worker } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

import { jobTitles, departaments, jobsTitlesByDepartament } from './data';

type NewWorker = Omit<
  Worker,
  | 'id'
  | 'role'
  | 'jobTitleId'
  | 'dateOfEmployed'
  | 'departamentId'
  | 'accountId'
  | 'dateOfBirth'
  | 'dateOfLayoffs'
>;

type WorkerInfo = {
  worker: NewWorker;
  jobTitleId: number;
  departamentId: number;
};

type NewAccount = Omit<Account, 'id'>;

const prisma = new PrismaClient();

const createWorker = (): WorkerInfo => {
  const randomDepartamentId = faker.helpers.rangeToNumber({
    min: 1,
    max: departaments.length,
  });

  const [jobTitleRandomRangeBottom, jobTitleRandomRangeTop] =
    jobsTitlesByDepartament[randomDepartamentId - 1];

  const randomJobTitleId =
    faker.helpers.rangeToNumber({
      min:
        randomDepartamentId === 1
          ? jobTitleRandomRangeBottom + 1
          : jobTitleRandomRangeBottom,
      max: jobTitleRandomRangeTop,
    }) + 1;

  return {
    worker: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      patronymic: faker.person.middleName(),
      phone: faker.phone.number(),
      image: faker.internet.avatar(),
    },
    jobTitleId: randomJobTitleId,
    departamentId: randomDepartamentId,
  };
};

const createDirector = (): WorkerInfo & { account: NewAccount } => {
  return {
    worker: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      patronymic: faker.person.middleName(),
      phone: faker.phone.number(),
      image: faker.internet.avatar(),
    },
    jobTitleId: 1,
    departamentId: 1,
    account: {
      email: 'admin@admin.ru',
      password: 'admin123',
      salt: 'randomAdminSalt',
      role: $Enums.Role.ADMIN,
    },
  };
};

async function main() {
  const allWorkers: WorkerInfo[] = [];

  for (let i = 0; i < 100; i++) {
    const workerInfo = createWorker();
    const { worker: newWorker, jobTitle } = workerInfo;

    allWorkers.push(workerInfo);

    const workerWithRelations = {
      ...newWorker,
      jobTitle: {
        connectOrCreate: {
          where: { value: jobTitle.value },
          create: jobTitle,
        },
      },
      groups: {
        connectOrCreate: groupsByJobTitle[jobTitle.value].map((g) => ({
          where: { value: g },
          create: groups.find((group) => group.value === g),
        })),
      },
    };

    await prisma.worker.upsert({
      where: { email: newWorker.email },
      create: workerWithRelations,
      update: workerWithRelations,
    });
  }

  for (const group of groups) {
    const groupWithRelations = {
      ...group,
      workers: {
        connect: allWorkers
          .filter(({ jobTitle }) => {
            return groupsByJobTitle[jobTitle.value].includes(group.value);
          })
          .map(({ worker }) => worker),
      },
      jobTitles: {
        connectOrCreate: jobsTitlesByGroup[group.value].map((jt) => ({
          where: { value: jt.value },
          create: jt,
        })),
      },
    };

    await prisma.group.upsert({
      where: { value: group.value },
      create: groupWithRelations,
      update: groupWithRelations,
    });
  }

  for (const jobTitle of Object.values(jobTitles)) {
    const jobTitleWithRelations = {
      ...jobTitle,
      groups: {
        connect: groupsByJobTitle[jobTitle.value].map((g) => ({
          value: g,
        })),
      },
      workers: {
        connect: allWorkers
          .filter(({ jobTitle: JT }) => JT.value === jobTitle.value)
          .map(({ worker }) => worker),
      },
    };

    await prisma.jobTitle.upsert({
      where: { value: jobTitle.value },
      create: jobTitleWithRelations,
      update: jobTitleWithRelations,
    });
  }

  console.log('seeding success!!!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
