
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .models import *
from django.contrib.auth import get_user
from django.db.models import Count 

class UserRegister(APIView):
	#access by anyone 
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

#access by anyone 
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user) 
			print(serializer.data)
			token, created = Token.objects.get_or_create(user=user)
			return Response({'token': token.key, 'user_id': user.user_id}, status=status.HTTP_200_OK)



class UserLogout(APIView):
	
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Simply delete the token from the client-side
        request.auth.delete()
        return Response({'message': 'Successfully logged out'})

class UserView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        # You can customize the data you want to return here
        user_data = {
            'id': user.user_id,
            'username': user.username,
            'role': user.role,
            # Add more fields as needed
        }
        return Response(user_data)
class AddProjet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        print(data)
        nom = data.get('nom', '')
        code_projet = data.get('codeProjet', '')

        # Create a new Projet instance with the extracted data
        projet = Projet.objects.create(nom=nom, code=code_projet)
        # ...

# Extract the 'champsCodification' data
        champs_codification = data.get('champsCodification', [])

        # Loop through the 'champsCodification' data and create ChampCodification instances
        for champ_data in champs_codification:
            titre = champ_data.get('titre', '')
            nb_caracteres = champ_data.get('nbCaracteres', 0)
            type_champ = champ_data.get('typeChamp', '')

            # Create a new ChampCodification instance for each item
            ChampCodification.objects.create(
                projet=projet,
                nom_champ=titre,
                taille_champ=nb_caracteres,
                type_champ=type_champ
            )

        # You can return a success response or any other response you need
        return Response({"message": "Projet added successfully"}, status=status.HTTP_201_CREATED)
    
class projets(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        queryset = Projet.objects.all()
        serializer = ProjetSerializer(queryset, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Pass the serialized data to the Response object

class Users(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        queryset = AppUser.objects.filter(role="simpleuser")
        serializer = AppUserSerializer(queryset, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Pass the serialized data to the Response object
   
class Documents(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        queryset = Document.objects.all()
        serializer = DocumentSerializer(queryset, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Pass the serialized data to the Response object
    
class revision_doc(APIView,):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, doc_id):
        print(doc_id)
        queryset = Revision.objects.filter(doc_id=doc_id)
        user_id = queryset[0].user_id
        print(user_id)
        user = AppUser.objects.get(user_id=user_id)
        serializer = RevisionSerializer(queryset, many=True)  # Serialize the queryset

        # Serialize the user's username separately
        user_name = user.username

        # Iterate through the serialized data and add the 'user_name' attribute to each item
        for data in serializer.data:
            data['user_name'] = user_name  # Add the 'user_name' to each Revision instance

        print(serializer.data)

        return Response(serializer.data)


        return Response(response_data) 
class document_prjt(APIView,):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request,project_id):
        print(project_id)
        queryset = Document.objects.filter(projet=project_id)
        serializer = DocumentSerializer(queryset, many=True)  # Serialize the queryset
        print(serializer.data)
        return Response(serializer.data)  # Pass the serialized data to the Response object

class AddDocument(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        print(data)
        prjtid = data.get('prjtid', '')
        stepOneData = data.get('stepOneData', {})
        Code = stepOneData.get('Code', '')
        Titre = stepOneData.get('Titre', '')  # Make sure 'Titre' matches your model field name 'titre'
        Type = stepOneData.get('Type', '')
        Revis = stepOneData.get('Revision', '')
        Statut = stepOneData.get('Statut', '')

        projet = Projet.objects.get(id=prjtid)
        Doc = Document.objects.create(projet=projet, code=Code, titre=Titre, statut=Statut, revision_actuelle=Revis, type=Type)

        print(Doc)

        stepTwoData = data.get('stepTwoData', {})
        Commentateurs = stepTwoData.get('Commentateurs', [])

        stepThreeData = data.get('stepThreeData', {})
        FileName = stepThreeData.get('FileName', '')
        uploaded_file = request.FILES.get('FileName')  # Replace with the actual name of the file input field
        print(request.FILES)
        print(uploaded_file)
        user=request.user
        print(user)

        Rev = Revision.objects.create(doc=Doc, numero_revision=Revis, fichier=uploaded_file,user=user)# Make sure 'Revis' matches your model field name 'numero_revision'

        print(Rev)

        # You can now use Code, Titre, Type, Revision, Statut, Commentateurs, and FileName as needed in your view.

        return Response({"message": "Document added successfully"}, status=status.HTTP_201_CREATED)
    

class DocumentCountByProjectView(APIView):
    def get(self, request):
        projects = Projet.objects.all()
        project_data = []

        for project in projects:
            document_count = Document.objects.filter(projet=project).count()
            project_data.append({
                'name': project.nom,
                'Nombre_de_documents': document_count
            })

        return Response({'data': project_data})
    
class DocumentStatusCountView(APIView):
     def get(self, request, *args, **kwargs):
        # Use the annotate() method to count the number of documents per status
        status_counts = Document.objects.values('statut').annotate(count=Count('statut'))

        # Convert the result to a dictionary for JSON response
        transformed_data = [{'name': item['statut'], 'nombre_de_documents': item['count']} for item in status_counts]

        return Response(transformed_data)
     
class DocumentRevisionCountView(APIView):
     def get(self, request, *args, **kwargs):
        # Use the annotate() method to count the number of documents per status
        rev_counts = Document.objects.values('revision_actuelle').annotate(count=Count('revision_actuelle'))

        # Convert the result to a dictionary for JSON response
        rev_count_dict = [{'name': item['revision_actuelle'], 'nombre_de_documents': item['count']} for item in rev_counts]
        return Response(rev_count_dict)