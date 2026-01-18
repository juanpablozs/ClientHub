FROM node:18
WORKDIR /usr/src/app

# install deps
COPY package.json package-lock.json* ./
RUN npm install

# copy source
COPY . .

# generate prisma client
RUN npx prisma generate

# build
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
