from GeoRun.models import Runner, Defi
from GeoRun.serializers import RunnerSerializer, DefiSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import generics
from rest_framework.views import APIView



class RunnerView(generics.ListCreateAPIView):
    serializer_class = RunnerSerializer

    @csrf_exempt
    def get_queryset(self):
        queryset = Runner.objects.all()
        mail = self.request.query_params.get('mail')
        pseudo = self.request.query_params.get('pseudo')
        if mail is not None:
            queryset = queryset.filter(mail=mail)
        if pseudo is not None:
            queryset = queryset.filter(pseudo=pseudo)
        return queryset
    
    @csrf_exempt   
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = RunnerSerializer(data=data)
        if serializer.is_valid():
            quest = serializer.save()
            serializer = RunnerSerializer(quest)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class RunnerDetailView(APIView):
    model = RunnerSerializer
    serializer_class = RunnerSerializer
    queryset = Runner.objects.all()

    def get_object(self, pk):
        try:
            return Runner.objects.get(pk=pk)
        except Runner.DoesNotExist:
            return HttpResponse(status=404)

    @csrf_exempt
    def get(self, request, pk, format=None):
        runner = self.get_object(pk)
        serializer = RunnerSerializer(runner)
        return JsonResponse(serializer.data)

    @csrf_exempt
    def put(self, request, pk, format=None):
        runner = self.get_object(pk)
        data = JSONParser().parse(request)
        serializer = RunnerSerializer(runner, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    @csrf_exempt
    def delete(self, request, pk=None):
        runner =self.get_object(pk)
        runner.delete()
        return HttpResponse(status=204)

class DefiView(generics.ListCreateAPIView):
    serializer_class = DefiSerializer

    @csrf_exempt
    def get_queryset(self):
        queryset = Defi.objects.all()
        nom = self.request.query_params.get('nom')
        date_creation = self.request.query_params.get('date_creation')
        if nom is not None:
            queryset = queryset.filter(nom=nom)
        if date_creation is not None:
            queryset = queryset.filter(date_creation=date_creation)
        return queryset
    
    @csrf_exempt   
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = DefiSerializer(data=data)
        if serializer.is_valid():
            quest = serializer.save()
            serializer = DefiSerializer(quest)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class DefiDetailView(APIView):
    model = DefiSerializer
    serializer_class = DefiSerializer
    queryset = Defi.objects.all()

    def get_object(self, pk):
        try:
            return Defi.objects.get(pk=pk)
        except Defi.DoesNotExist:
            return HttpResponse(status=404)

    @csrf_exempt
    def get(self, request, pk, format=None):
        defi = self.get_object(pk)
        serializer = DefiSerializer(defi)
        return JsonResponse(serializer.data)

    @csrf_exempt
    def put(self, request, pk, format=None):
        defi = self.get_object(pk)
        data = JSONParser().parse(request)
        serializer = DefiSerializer(defi, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    @csrf_exempt
    def delete(self, request, pk=None):
        defi =self.get_object(pk)
        defi.delete()
        return HttpResponse(status=204)