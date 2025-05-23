from django.urls import path
from .views import TareaList, TareaDetail

urlpatterns = [
    path('tareas/', TareaList.as_view(), name='tarea-list'),
    path('tareas/<int:pk>/', TareaDetail.as_view(), name='tarea-detail'),
]
