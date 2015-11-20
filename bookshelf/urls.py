from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^api/v1/books/$', views.books, name='books'),
    url(r'^.*$', views.IndexView.as_view(), name='index'),
]
