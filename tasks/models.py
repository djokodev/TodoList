from django.db import models

class Collection(models.Model):
    name = models.CharField(max_length=60)
    slug = models.SlugField()

    def __str__(self):
        return self.name


class Tasks(models.Model):
    description = models.CharField(max_length=300)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)

    def __str__(self):
        return self.description
