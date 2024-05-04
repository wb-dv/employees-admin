import { $Enums, Account, PrismaClient, Worker } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
import { hashSync } from 'bcrypt';

import { jobTitles, departaments, jobsTitlesByDepartament } from './data';

type NewWorker = Omit<
  Worker,
  | 'id'
  | 'role'
  | 'jobTitleId'
  | 'dateOfEmployed'
  | 'departamentId'
  | 'accountId'
  | 'dateOfLayoffs'
>;

type NewAccount = Partial<Omit<Account, 'id'>> & { email: string };

type NewWorkerInfo = {
  worker: NewWorker;
  jobTitleId: number;
  departamentId: number;
  account: NewAccount;
};

const prisma = new PrismaClient();

const createWorker = (): NewWorkerInfo => {
  const randomDepartamentId = faker.helpers.rangeToNumber({
    min: 2,
    max: departaments.length,
  });

  const [jobTitleRandomRangeBottom, jobTitleRandomRangeTop] =
    jobsTitlesByDepartament[randomDepartamentId - 1];

  const randomJobTitleId =
    faker.helpers.rangeToNumber({
      min: jobTitleRandomRangeBottom,
      max: jobTitleRandomRangeTop,
    }) + 1;

  return {
    worker: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      patronymic: faker.person.middleName(),
      phone: faker.phone.number(),
      image: faker.internet.avatar(),
      dateOfBirth: faker.date.birthdate({ min: 20, max: 40, mode: 'age' }),
    },
    jobTitleId: randomJobTitleId,
    departamentId: randomDepartamentId,
    account: {
      email: faker.internet.email(),
    },
  };
};

const createDirector = (jobTitleId: number): NewWorkerInfo => {
  const defaultNewWorker = createWorker();

  return {
    worker: defaultNewWorker.worker,
    jobTitleId: jobTitleId,
    departamentId: 1,
    account:
      jobTitleId === 1
        ? {
            email: 'admin@admin.ru',
            password: hashSync(
              'admin123',
              Number(process.env.HASHING_ROUNDS) || 10,
            ),
            role: $Enums.Role.ADMIN,
          }
        : defaultNewWorker.account,
  };
};

async function seedJobTittles() {
  for (let i = 0; i < jobTitles.length; i++) {
    const jobTitle = jobTitles[i];

    await prisma.jobTitle.upsert({
      where: { id: i + 1 },
      create: { name: jobTitle },
      update: { name: jobTitle },
    });
  }
}

async function seedDepartaments() {
  for (let i = 0; i < departaments.length; i++) {
    const departament = departaments[i];

    const [startJobTitleIndex, endJobTitleIndex] = jobsTitlesByDepartament[i];

    const jobTitles = Array.from({
      length: endJobTitleIndex - startJobTitleIndex + 1,
    }).map((_, i) => ({ id: startJobTitleIndex + i + 1 }));

    await prisma.departament.upsert({
      where: { id: i + 1 },
      create: { name: departament, jobTitles: { connect: jobTitles } },
      update: { name: departament, jobTitles: { connect: jobTitles } },
    });
  }
}

async function seedWorkers() {
  for (let i = 0; i < 100; i++) {
    const newWorkerInfo = createWorker();

    await prisma.worker.create({
      data: {
        ...newWorkerInfo.worker,
        account: { create: newWorkerInfo.account },
        jobTitle: { connect: { id: newWorkerInfo.jobTitleId } },
        departament: { connect: { id: newWorkerInfo.departamentId } },
      },
    });
  }
}

async function seedDirectors() {
  const [startDirectorJobTitleId, endDirectorJobTitleId] =
    jobsTitlesByDepartament[0];

  for (let i = startDirectorJobTitleId; i <= endDirectorJobTitleId; i++) {
    const newDirectorInfo = createDirector(i + 1);

    await prisma.worker.create({
      data: {
        ...newDirectorInfo.worker,
        account: { create: newDirectorInfo.account },
        jobTitle: { connect: { id: newDirectorInfo.jobTitleId } },
        departament: { connect: { id: newDirectorInfo.departamentId } },
      },
    });
  }
}

async function seedAllWorkers() {
  await prisma.worker.deleteMany({});
  await prisma.account.deleteMany({});

  await seedDirectors();

  await seedWorkers();
}

async function seed() {
  await seedJobTittles();

  await seedDepartaments();

  await seedAllWorkers();

  console.log('seeding success!!!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
