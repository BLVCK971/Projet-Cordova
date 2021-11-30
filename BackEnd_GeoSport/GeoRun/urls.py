from django.urls import path
from GeoRun import views
from django.urls import path,include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'list', views.RunnerViewSet)


urlpatterns = [
    path('runners/list', views.runner_list),
    path('runners/<int:pk>/', views.runner_detail),
    path('runners/', include(router.urls)),
]