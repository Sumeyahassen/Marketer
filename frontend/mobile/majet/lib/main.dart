import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'constants/colors.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'utils/auth.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Marketer Mobile',
      theme: ThemeData(
        primaryColor: AppColors.primary,
        scaffoldBackgroundColor: AppColors.background,
      ),
      home: FutureBuilder<bool>(
        future: Auth.isLoggedIn(),
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data == true) {
            return HomeScreen();
          }
          return LoginScreen();
        },
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}