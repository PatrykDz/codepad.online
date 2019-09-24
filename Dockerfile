# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage
WORKDIR /codepad
COPY package*.json /codepad/
RUN npm install
COPY ./ /codepad/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build-stage /codepad/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /codepad/nginx.conf /etc/nginx/conf.d/default.conf