from rflectevents.models import Event, Calendar
from base64 import urlsafe_b64encode
import os
import json
from django.conf import settings
import time
import random

JSON_XSS_PREPENDER = '])}>"'

def protectJSON(json):
  return JSON_XSS_PREPENDER + json

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
  return urlsafe_b64encode(os.urandom(30))


def serializeEvents(events):

  response = []
  for event in events:
    eventList = []
    eventList.append(event.id)
    eventList.append(event.start)
    eventList.append(event.end)
    eventList.append(event.name)
    eventList.append(event.description)
    eventList.append(event.allDay)
    eventList.append(event.calendar.id)

    response.append(eventList)

  responseJSON = protectJSON(json.dumps(response))
  return responseJSON


def serializeCalendars(calendars):

  response = []

  for cal in calendars:
    calendarList = []

    calendarList.append(cal.id)
    calendarList.append(cal.name)
    calendarList.append(cal.visible)
    calendarList.append(cal.colorCodeIndex)
    calendarList.append(cal.readOnly)
    #TODO(alexk): change this to actual 'own'
    calendarList.append(True)

    response.append(calendarList)

  responseJSON = json.dumps(response)
  return responseJSON

def serializeSettings():

  response = []

  responseJSON = json.dumps(response)
  return responseJSON

def delayResponse():
  time.sleep(random.randint(settings.DEBUG_RESPONSE_TIME_MIN,
      settings.DEBUG_RESPONSE_TIME_MAX))

