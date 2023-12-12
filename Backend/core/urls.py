from django.urls import path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('addprojet',views.AddProjet.as_view(),name='addprojet'),
    path('addDocument',views.AddDocument.as_view(),name='adddocument'),
    path('projet',views.projets.as_view(),name='projet'),
    path('document',views.Documents.as_view(),name='document'),
    path('Users',views.Users.as_view(),name='Users'),
    path('revision/<int:doc_id>',views.revision_doc.as_view(),name='document'),
    path('documents/<int:project_id>/',views.document_prjt.as_view(),name='documents'),
    path('docPerProject',views.DocumentCountByProjectView.as_view(),name='docPerProject'),
    path('docPerStatus',views.DocumentStatusCountView.as_view(),name='docPerStatus'),
    path('docPerRevision',views.DocumentRevisionCountView.as_view(),name='docPerRev'),
]
