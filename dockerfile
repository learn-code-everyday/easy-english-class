FROM node:20-alpine AS base
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM base AS build

ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI

COPY . .
RUN yarn build


FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]