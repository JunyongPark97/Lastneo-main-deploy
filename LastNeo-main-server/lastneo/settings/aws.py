import os

ENV_SETTINGS_MODE = os.getenv('SETTINGS_MODE', '')
print(ENV_SETTINGS_MODE)

if ENV_SETTINGS_MODE == 'prod':
    print('0-----')
    from lastneo.settings.prod import *
elif ENV_SETTINGS_MODE == 'dev':
    from lastneo.settings.dev import *
