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


def get_books(request):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        data = filter_books(request, data)

        return JsonResponse(data, safe=False)


def book_by_id(request, book_id):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        try:
            book = get_book_by_id(data, book_id)
        except StopIteration:
            return JsonResponse({}, status=404)

        return JsonResponse(book, safe=False)


def fill_up(recommendations, books, source_book):
    ids = [book.get('id') for book in recommendations]
    ids.append(source_book.get('id'))
    while len(recommendations) < 3:
        first_unique_book = next(book for book in books if book.get('id') not in ids)
        ids.append(first_unique_book.get('id'))
        recommendations.append(first_unique_book)

    return recommendations


def recommended_for_book_by_id(request, book_id):
    with open('bookshelf/books.json') as data_file:
        data = json.load(data_file)

        try:
            book = get_book_by_id(data, book_id)
        except StopIteration:
            return JsonResponse({}, status=404)

        recommendations = get_recommendation_for_book(data, book)
        recommendations = fill_up(recommendations, data, book)

        return JsonResponse(recommendations[:3], safe=False)


def get_book_by_id(books_data, book_id):
    return next(book for book in books_data if book.get('id') == book_id)


def get_recommendation_for_book(books_data, source_book):
    return [book for book in books_data if
            book.get('genre', {}).get('name') == source_book.get('genre', {}).get('name')
            and book.get('genre', {}).get('category') == source_book.get('genre', {}).get('category')
            and book.get('id') != source_book.get('id')]


def filter_books(request, books):
    filtered = books
    category = request.GET.get('category')
    genre = request.GET.get('genre')
    search = request.GET.get('search', '').lower()

    if category or genre or search:
        filtered = [book for book in books
                    if ((not category or book.get('genre', {}).get('category') == category)
                        and (not genre or book.get('genre', {}).get('name') == genre)
                        and (not search or book.get('author').get('name').lower().find(search) > -1
                             or book.get('name').lower().find(search) > -1))]

    return filtered