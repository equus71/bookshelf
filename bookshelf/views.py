from django.http import JsonResponse
from django.views.generic import TemplateView
from bookshelf import settings


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        context['is_production'] = settings.PRODUCTION
        return context


def books(request):

    # do something with the your data
    data = {}

    # just return a JsonResponse
    return JsonResponse(data)


def book_by_id(request):

    # do something with the your data
    data = {}

    # just return a JsonResponse
    return JsonResponse(data)


def recommended_for_book_by_id(request):

    # do something with the your data
    data = {}

    # just return a JsonResponse
    return JsonResponse(data)