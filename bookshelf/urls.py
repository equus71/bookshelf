from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^api/v1/books$', views.books, name='books'),
    url(r'^api/v1/books/(?P<book_id>b[0-9]{1,12})$', views.book_by_id, name='book_by_id'),
    url(r'^api/v1/books/(?P<book_id>b[0-9]{1,12})/recommended$', views.recommended_for_book_by_id, name='recommended_for_book_by_id'),
    url(r'^.*$', views.IndexView.as_view(), name='index'),
]
