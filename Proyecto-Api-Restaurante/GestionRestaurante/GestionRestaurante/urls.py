from django.contrib import admin
from django.urls import path, include




urlpatterns = [  
   
    path("admin/", admin.site.urls),
    path("api/restaurante/", include("AppRestaurante.urls")),
    path("api/usuarios/", include("AppUsuarios.urls")),
]