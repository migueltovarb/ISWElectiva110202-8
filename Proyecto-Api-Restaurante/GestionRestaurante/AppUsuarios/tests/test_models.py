from django.test import TestCase
from django.contrib.auth.models import User
from AppUsuarios.serializers import UserSerializer


class UserModelTest(TestCase):
    def setUp(self):
        """Establecer un usuario para las pruebas"""
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpassword123"
        )
    
    def test_user_creation(self):
        """Prueba que un usuario se crea correctamente"""
        self.assertEqual(self.user.username, "testuser")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertTrue(self.user.check_password("testpassword123"))
        self.assertTrue(self.user.is_active)  
        self.assertFalse(self.user.is_staff)  
    
    def test_user_string_representation(self):
        """Prueba la representación de string del usuario"""
        self.assertEqual(str(self.user), "testuser")  

    def test_user_email_unique(self):
        """Prueba que no se pueda crear un usuario con un correo electrónico duplicado"""
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                username="anotheruser",
                email="test@example.com",  
                password="anotherpassword123"
            )


class UserSerializerTest(TestCase):
    def setUp(self):
        """Establecer los datos del usuario para las pruebas del serializador"""
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
        self.serializer = UserSerializer(data=self.user_data)
    
    def test_serializer_validation(self):
        """Prueba que el serializador valida correctamente los datos"""
        self.assertTrue(self.serializer.is_valid())
    
    def test_serializer_save(self):
        """Prueba que el serializador guarda correctamente un usuario"""
        if self.serializer.is_valid():
            user = self.serializer.save()
            self.assertEqual(user.username, "testuser")
            self.assertEqual(user.email, "test@example.com")
            self.assertTrue(user.check_password("testpassword123"))
    
    def test_serializer_with_invalid_data(self):
        """Prueba el serializador con datos inválidos"""
        # Caso 1: Email inválido
        invalid_email_data = {
            "username": "testuser",
            "email": "invalid-email",
            "password": "testpassword123"
        }
        serializer = UserSerializer(data=invalid_email_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)
        
        # Caso 2: Sin username
        missing_username_data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        serializer = UserSerializer(data=missing_username_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)
        
        # Caso 3: Contraseña demasiado corta
        short_password_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "123"
        }
        serializer = UserSerializer(data=short_password_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("password", serializer.errors)
    
    def test_serializer_read_only_password(self):
        """Prueba que el password es write_only"""
        user = User.objects.create_user(**self.user_data)
        serializer = UserSerializer(user)
        self.assertNotIn("password", serializer.data)
    
    def test_serializer_password_encryption(self):
        """Prueba que la contraseña se guarda encriptada"""
        user = User.objects.create_user(**self.user_data)
        self.assertTrue(user.password.startswith('pbkdf2_sha256$'))  
