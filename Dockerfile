FROM node:9.5
RUN npm install -g yarn
RUN npm install -g @angular/cli --unsafe
CMD npm start
