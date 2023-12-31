from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils.html import escape

from tasks.models import Collection
def index(request):
    context = {}
    context['collections'] = Collection.objects.order_by("name")
    return render(request, "tasks/index.html", context=context)


def add_collection(request):
    collection_name = escape(request.POST.get("collection-name"))
    collection, created = Collection.objects.get_or_create(name=collection_name)
    if not created:
        return HttpResponse("Cette collection existe deja!")
    return redirect('home')


def add_task(request):
    pass