from django.contrib import admin
from django.urls import path, include
from rest_framework import routers  
from rest_framework_nested import routers
from api import views


router = routers.DefaultRouter()
router.register(r'artistas', views.ArtistaViewSet)
router.register(r'albuns', views.AlbumViewSet)
router.register(r'musicas', views.MusicaViewSet)

artista_router = routers.NestedDefaultRouter(router, r'artistas', lookup='artista')
artista_router.register(r'albuns', views.AlbumViewSet, basename='artista-albuns')

album_router = routers.NestedDefaultRouter(artista_router, r'albuns', lookup='album')
album_router.register(r'musicas', views.MusicaViewSet, basename='album-musicas')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
] + artista_router.urls + album_router.urls

urlpatterns += router.urls