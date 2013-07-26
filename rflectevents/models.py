from django.db import models

class Calendar(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=100)
    visible = models.BooleanField()

    def __unicode__(self):
      return u'id:%s, name:%s, on:%s' % (self.id, self.name,
          self.visible)

class Event(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    calendar = models.ForeignKey(Calendar)
    start = models.IntegerField()
    end = models.IntegerField()
    allDay = models.BooleanField()

    def __unicode__(self):
      return u'id:%s, name:%s, cal:%s, start:%s, end:%s' % (self.id, self.name,
          self.calendar, self.start, self.end)


