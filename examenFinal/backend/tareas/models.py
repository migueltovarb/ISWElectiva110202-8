from django.db import models

class Tarea(models.Model):
    titulo = models.CharField(max_length=255)
    completado = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo
