import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Auth {
  static final storage = FlutterSecureStorage();

  static Future<void> saveUser(Map<String, dynamic> user, String token) async {
    await storage.write(key: 'token', value: token);
    await storage.write(key: 'user', value: user['role']);
  }

  static Future<String?> getRole() async {
    return await storage.read(key: 'user');
  }

  static Future<bool> isLoggedIn() async {
    String? token = await storage.read(key: 'token');
    return token != null;
  }
}