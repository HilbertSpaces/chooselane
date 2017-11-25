from celery import Celery
from apiTraverse import traverse, app
from celery.schedules import crontab

app.conf.beat_schedule = {
    'traverse': {
        'task': 'apiTraverse.traverse',
        'schedule': 15.0,
        'args': (),
  }
}
