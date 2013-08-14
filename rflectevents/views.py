from django.http import HttpResponse, Http404
from django.template.loader import get_template
from django.template import Context, RequestContext
from django.conf import settings
import json
from rflectevents.models import Event, Calendar
import util
from django.core import serializers

def hello(aRequest):
  return HttpResponse("Hello world")

def loadEvents(aRequest, aStart, aEnd):
  try:
    start = int(aStart)
    end = int(aEnd)
  except ValueError:
    raise Http404()

  events = Event.objects.filter(end__gt=start).filter(start__lt=end)
  jsonSerializer = serializers.get_serializer("json")()

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
    
  responseJSON = json.dumps(response)
    
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

  return HttpResponse(json.dumps(response), mimetype="application/json")

def deleteEvent(aRequest, aEventId):
  response = 0

  Event.objects.get(id = aEventId).delete()

  return HttpResponse(json.dumps(response), mimetype="application/json")

def mainRender(aRequest):
  #Note(alexk): it's important to use request context, because we're referring
  #to STATIC_URL in template.

  context = RequestContext(aRequest, {
              'SITE_URL': settings.SITE_URL
            })

  cal0 = Calendar(id = 0, name = '', visible = True)
  cal0.save()
  cal1 = Calendar(id = 1, name = '', visible = True)
  cal1.save()
  cal2 = Calendar(id = 2, name = '', visible = True)
  cal2.save()

  template = get_template('rflectcalendar.html')
  html = template.render(context)
  return HttpResponse(html)


