FROM        node:14.20.1-alpine as builder

COPY        package.json /srv/calm_software/
WORKDIR     /srv/calm_software/

RUN         yarn install --production

COPY        .babelrc /srv/calm_software/
COPY        .eslintrc.json /srv/calm_software/
COPY        app.js /srv/calm_software/
COPY        adapters /srv/calm_software/adapters/
COPY        application /srv/calm_software/application/
COPY        config /srv/calm_software/config/
COPY        frameworks /srv/calm_software/frameworks/
COPY        src /srv/calm_software/src/
COPY        tests /srv/calm_software/tests/
COPY        tests /srv/calm_software/untils/

RUN         yarn run build

FROM        node:14.20.1-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/calm_software/build /srv/api/build
COPY        --from=builder /srv/calm_software/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

CMD         ["npm", "start"]

USER        node
