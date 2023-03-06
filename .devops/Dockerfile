FROM node:18

WORKDIR /usr/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY *.json ./
COPY src/* ./src/
COPY .eslintrc.js ./
COPY .prettierrc ./

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]