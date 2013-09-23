from django.http import HttpResponse, Http404
from django.template.loader import get_template
from django.template import Context, RequestContext
from django.conf import settings
import json
from rflectevents.models import Event, Calendar
import util
from django.core import serializers
import time

def hello(aRequest):

  if settings.DEBUG:
     util.delayResponse()
  return HttpResponse("Hello world")

def loadEvents(aRequest):
  paramsVector = json.loads(aRequest.body)

  try:
    start = int(paramsVector[0])
    end = int(paramsVector[1])
  except ValueError:
    raise Http500()

  calendarsQs = Calendar.objects.filter(id__in=paramsVector[2:])
  events = Event.objects.filter(calendar__in=calendarsQs).filter(
      end__gt=start).filter(start__lt=end)

  responseJSON = util.serializeEvents(events)

  if settings.DEBUG:
    util.delayResponse()
  return HttpResponse(responseJSON, mimetype="application/json")

def saveEvent(aRequest):
  event = json.loads(aRequest.body)

  # If editing already present event.
  if event[0]:
    id = event[0]
    response = 0
  # If creating new event.
  else:
    id = util.generateEventId()
    response = id

  cal = Calendar(id = event[6])

  Event(id = id, start = event[1], end = event[2], allDay = event[3],
        name = event[4], description = event[5], calendar = cal).save()

  if settings.DEBUG:
    util.delayResponse()
  return HttpResponse(util.protectJSON(json.dumps(response)), mimetype="application/json")

def deleteEvent(aRequest, aEventId):
  response = 0

  Event.objects.get(id = aEventId).delete()

  if settings.DEBUG:
    util.delayResponse()
  return HttpResponse(util.protectJSON(json.dumps(response)), mimetype="application/json")

def mainRender(aRequest):
  #Note(alexk): it's important to use request context, because we're referring
  #to STATIC_URL in template.

  settingsJSON = util.serializeSettings()

  calendarsJSON = loadCalendars()

  context = RequestContext(aRequest, {
              'SITE_URL': settings.SITE_URL,
              'CALENDARS_LIST': calendarsJSON,
              'SETTINGS': settingsJSON
            })

  template = get_template('rflectcalendar.html')
  html = template.render(context)

  if settings.DEBUG:
    util.delayResponse()
  return HttpResponse(html)

def loadCalendars():
  #Create at least one default calendar.
  if Calendar.objects.all().count() == 0:
    Calendar(id = util.generateCalendarId(), name = '', visible = True,
          colorCodeIndex = 0, readOnly = False, owner = 'alexk').save()

  calendars = Calendar.objects.all()

  calendarsJSON = util.serializeCalendars(calendars)
  return calendarsJSON

def saveCalendar(aRequest):
  calendar = json.loads(aRequest.body)

  # If editing already present calendar.
  if calendar[0]:
    id = calendar[0]
    response = 0
  # If creating new calendar.
  else:
    id = util.generateCalendarId()
    response = id

  Calendar(id = id, name = calendar[1], visible = calendar[2],
      colorCodeIndex = calendar[3], readOnly = calendar[4],
      owner = 'alexk').save()

  if settings.DEBUG:
    util.delayResponse()

  return HttpResponse(util.protectJSON(json.dumps(response)),
      mimetype="application/json")

def deleteCalendar(aRequest, aCalendarId):
  response = 0

  if Calendar.objects.filter(id = aCalendarId).exists():
    calendar = Calendar.objects.get(id = aCalendarId)
    Event.objects.filter(calendar = calendar).delete()
    calendar.delete()


  if settings.DEBUG:
    util.delayResponse()
  return HttpResponse(util.protectJSON(json.dumps(response)), mimetype="application/json")

