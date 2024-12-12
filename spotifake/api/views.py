from django.shortcuts import render
from rest_framework import viewsets
from .models import Artista, Album, Musica
from .serializers import ArtistaSerializer, AlbumSerializer, MusicaSerializer


class ArtistaViewSet(viewsets.ModelViewSet):
    queryset = Artista.objects.all()
    serializer_class = ArtistaSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_queryset(self):
        artista_pk = self.kwargs.get('artista_pk')
        if artista_pk is not None:
            return Album.objects.filter(artista=artista_pk)
        return super().get_queryset()


class MusicaViewSet(viewsets.ModelViewSet):
    queryset = Musica.objects.all()
    serializer_class = MusicaSerializer

    def get_queryset(self):
        album_pk = self.kwargs.get('album_pk')
        if album_pk is not None:
            return Musica.objects.filter(album=self.kwargs['album_pk'])
        return super().get_queryset()

