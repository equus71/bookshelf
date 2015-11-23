import json
from django.http import JsonResponse, HttpResponse
from django.views.generic import TemplateView
from bookshelf import settings


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        context['is_production'] = settings.PRODUCTION
        return context


def books(request):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        return JsonResponse(data, safe=False)


def book_by_id(request, book_id):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        try:
            book = get_book_by_id(data, book_id)
        except StopIteration:
            return JsonResponse({}, status=404)

        return JsonResponse(book, safe=False)


def recommended_for_book_by_id(request, book_id):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        try:
            book = get_book_by_id(data, book_id)
        except StopIteration:
            return JsonResponse({}, status=404)

        recommendations = get_recommendation_for_book(data, book)

        return JsonResponse(recommendations, safe=False)


def get_book_by_id(books_data, book_id):
    return next(book for book in books_data if book.get('id') == book_id)


def get_recommendation_for_book(books_data, source_book):
    return [book for book in books_data if
            book.get('genre', {}).get('name') == source_book.get('genre', {}).get('name')
            and book.get('genre', {}).get('category') == source_book.get('genre', {}).get('category')
            and book.get('id') != source_book.get('id')]
