# Stage 1: Build the Angular Application
FROM node:20.11.1 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the Angular Application with Nginx
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/pizza-time/browser /usr/share/nginx/html
EXPOSE 80