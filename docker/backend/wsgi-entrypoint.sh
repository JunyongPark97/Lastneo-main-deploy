#!/bin/sh

until cd /app/backend/
do
    echo "Waiting for server volume..."
done

until ./manage.py makemigrations --settings lastneo.settings.prod
do
    echo "Waiting for db to be ready..."
    sleep 2
done

until ./manage.py migrate --fake --settings lastneo.settings.prod
do
    echo "Waiting for db to be migrate..."
    sleep 2
done

#./manage.py collectstatic --noinput --settings dod.settings.production

gunicorn lastneo.wsgi --bind 0.0.0.0:8000 --env DJANGO_SETTINGS_MODULE=lastneo.settings.prod --workers 4 --threads 4

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000
