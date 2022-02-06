# docker/backend/Dockerfile

FROM python:3.8.10

WORKDIR /app

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

RUN pip install --upgrade pip
RUN pip install gunicorn

ADD ./LastNeo-main-server/requirements.txt /app/backend/
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./LastNeo-main-server /app/backend

RUN chmod +x ./docker/backend/wsgi-entrypoint.sh
RUN chmod +x ./docker/backend/wsgi-entrypoint-dev.sh