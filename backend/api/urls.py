from django.urls import path, include
from api.views import NoteListCreate, NoteDelete

urlpatterns = [
    path('notes/', NoteListCreate.as_view(), name="note-list"),
    path('notes/delete/<int:pk>', NoteDelete.as_view(), name="delete-note")
]