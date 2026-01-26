FROM node:18
WORKDIR /usr/src/app

# copy package and install from repo root context
COPY apps/api/package.json apps/api/package-lock.json* ./
COPY package.json ./root-package.json
RUN npm install

# copy tsconfig base and api source
COPY tsconfig.base.json /usr/tsconfig.base.json
COPY apps/api .

# ensure prisma client generation
RUN npx prisma generate

# build
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
