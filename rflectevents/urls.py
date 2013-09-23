from django.conf.urls.defaults import *
from rflectevents.views import *

urlpatterns = patterns('',
    ('^$', 'django.views.generic.simple.direct_to_template',
        {'template': 'home.html'}),

    (r'^events/load/$', loadEvents),
    (r'^events/save/$', saveEvent),
    (r'^events/delete/(.+)/$', deleteEvent),

    (r'^calendars/save/$', saveCalendar),
    (r'^calendars/delete/(.+)/$', deleteCalendar),

    (r'^view/$', mainRender),

)
