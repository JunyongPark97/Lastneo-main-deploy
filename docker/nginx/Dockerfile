# The first stage
# Build React static files
FROM node:13.12.0 as build

WORKDIR /app/frontend
COPY ./Lastneo-react-app/package.json ./
COPY ./Lastneo-react-app/package-lock.json ./
RUN npm ci --silent
COPY ./Lastneo-react-app ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable
COPY --from=build /app/frontend/build /usr/share/nginx/html

#RUN sudo iptables -I INPUT 1 -p tcp --dport 80-j ACCEPT
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]