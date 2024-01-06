import { JobTitle, PrismaClient, Worker } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

import { groups, groupsByJobTitle, jobTitles, jobsTitlesByGroup } from './data';

type NewWorker = Omit<Worker, 'id' | 'role' | 'jobTitleId'>;

type WorkerInfo = { worker: NewWorker; jobTitle: JobTitle };

const prisma = new PrismaClient();

const createWorker = (): WorkerInfo => {
  const randomGroup = faker.helpers.arrayElement(groups);

  const jobTitle = {
    ...faker.helpers.arrayElement(jobsTitlesByGroup[randomGroup.value]),
  };

  return {
    worker: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      image: faker.internet.avatar(),
    },
    jobTitle,
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
