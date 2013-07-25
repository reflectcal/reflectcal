from django.http import HttpResponse, Http404
from django.template.loader import get_template
from django.template import Context, RequestContext
from django.conf import settings
import json

def hello(aRequest):
  return HttpResponse("Hello world")

def loadEvents(aRequest, aStart, aEnd):
  print 'start: ' + aStart
  print 'end: ' + aEnd
  try:
    start = int(aStart)
    end = int(aEnd)
  except ValueError:
    raise Http404()

  response = []

  return HttpResponse(json.dumps(response), mimetype="application/json")

def saveEvent(aRequest):
  response = {'longId': ''}

  return HttpResponse(json.dumps(response), mimetype="application/json")

def deleteEvent(aRequest, aEventId):
  response = 0

  return HttpResponse(json.dumps(response), mimetype="application/json")

def mainRender(aRequest):
  #Note(alexk): it's important to use request context, because we're referring
  #to STATIC_URL in template.

  context = RequestContext(aRequest, {
              'SITE_URL': settings.SITE_URL
            })

  template = get_template('rflectcalendar.html')
  html = template.render(context)
  return HttpResponse(html)
