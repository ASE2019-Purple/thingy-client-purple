FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install

# Dev environment doesn't run this stage or beyond
FROM build-stage as build
COPY . .
RUN yarn build

FROM nginx:alpine as production-stage
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]