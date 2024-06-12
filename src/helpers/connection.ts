import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

globalForPrisma.prisma = prisma;
