from rflectevents.models import Event
from base64 import urlsafe_b64encode
import os

def generateEventId():
  id = __generateUniqueIdImpl()

  while Event.objects.filter(id = id).count() != 0:
    id = __generateUniqueIdImpl()

  return id

def generateCalendarId():
  id = __generateUniqueIdImpl()

  while Calendar.objects.filter(id = id).count() != 0:
    id = __generateUniqueIdImpl()

  return id

def __generateUniqueIdImpl():
  #TODO(alexk): change this to 30
  return urlsafe_b64encode(os.urandom(30))