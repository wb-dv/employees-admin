FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /project

FROM base AS creater
WORKDIR /project
RUN pnpm i -g turbo
COPY . .
RUN turbo prune server --docker

FROM base AS build
WORKDIR /project
ENV SHELL=bash
COPY --from=creater /project/out/json/ .
COPY --from=creater /project/out/pnpm-lock.yaml pnpm-lock.yaml
COPY --from=creater /project/out/pnpm-workspace.yaml pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

COPY --from=creater /project/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=server

CMD node ./apps/server/dist/main