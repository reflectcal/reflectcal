from django.conf.urls.defaults import *
from rflectevents.views import *

handler500 = 'djangotoolbox.errorviews.server_error'

urlpatterns = patterns('',
    ('^_ah/warmup$', 'djangoappengine.views.warmup'),
    ('^$', 'django.views.generic.simple.direct_to_template',
        {'template': 'home.html'}),

    (r'^events/load/(\d+)-(\d+)/$', loadEvents),
    (r'^events/save/$', saveEvent),
    (r'^events/delete/(\w*)/$', deleteEvent),
    (r'^render/$', mainRender),

)
