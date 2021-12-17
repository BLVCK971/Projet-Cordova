from GeoRun.models import Runner
from GeoRun.serializers import RunnerSerializer
#from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, permissions, renderers
from rest_framework.response import Response
from rest_framework.decorators import action, api_view




class RunnerViewSet(viewsets.ModelViewSet):
    queryset = Runner.objects.all()
    serializer_class = RunnerSerializer

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@csrf_exempt
#@api_view(['GET', 'POST'])
def runner_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        runners = Runner.objects.all()
        serializer = RunnerSerializer(runners, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RunnerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)




@csrf_exempt
#@api_view(['GET', 'PUT', 'DELETE'])
def runner_detail(request, pk):
    """
    Retrieve, update or delete a code runner.
    """
    try:
        runner = Runner.objects.get(pk=pk)
    except Runner.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RunnerSerializer(Runner)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RunnerSerializer(runner, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        runner.delete()
        return HttpResponse(status=204)