FROM node:latest as vite-builder

WORKDIR /usr/src/pixel-crypt

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=vite-builder /usr/src/pixel-crypt/dist .

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]