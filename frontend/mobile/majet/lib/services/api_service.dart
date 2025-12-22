import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static final Dio _dio = Dio();
  static const String baseUrl = 'https://marketer-up1r.onrender.com'; 
  // For real phone, change to your PC IP: 'http://192.168.1.XXX:5000'

  static final storage = FlutterSecureStorage();

  static Future<void> setToken(String token) async {
    _dio.options.headers['Authorization'] = 'Bearer $token';
    await storage.write(key: 'token', value: token);
  }

  static Future<void> loadToken() async {
    String? token = await storage.read(key: 'token');
    if (token != null) {
      _dio.options.headers['Authorization'] = 'Bearer $token';
    }
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post('$baseUrl/auth/login', data: {
      'email': email,
      'password': password,
    });
    return response.data;
  }

  static Future<Map<String, dynamic>> register(String email, String password, String role) async {
    final response = await _dio.post('$baseUrl/auth/register', data: {
      'email': email,
      'password': password,
      'role': role, // MARKETER or CLIENT
    });
    return response.data;
  }

  static Future<List<dynamic>> getProducts() async {
    final response = await _dio.get('$baseUrl/products');
    return response.data;
  }

  static Future<void> buyProduct(int productId, int quantity, int sellerId) async {
    await _dio.post('$baseUrl/transactions/buy', data: {
      'productId': productId,
      'quantity': quantity,
      'sellerId': sellerId,
    });
  }

  static Future<void> logout() async {
    await storage.delete(key: 'token');
    await storage.delete(key: 'user');
    _dio.options.headers.remove('Authorization');
  }
}