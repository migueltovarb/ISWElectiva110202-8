from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tarea
from .serializers import TareaSerializer
from django.http import Http404

class TareaList(APIView):
    def get(self, request):
        tareas = Tarea.objects.all()
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TareaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TareaDetail(APIView):
    def get_object(self, pk):
        try:
            return Tarea.objects.get(pk=pk)
        except Tarea.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        tarea = self.get_object(pk)
        serializer = TareaSerializer(tarea)
        return Response(serializer.data)

    def put(self, request, pk):
        tarea = self.get_object(pk)
        serializer = TareaSerializer(tarea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        tarea = self.get_object(pk)
        serializer = TareaSerializer(tarea, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tarea = self.get_object(pk)
        tarea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
