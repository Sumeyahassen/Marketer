# majet

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

marketer_mobile/                    ← main folder (open this in VS Code)
├── android/                        ← Android files (don’t touch)
├── ios/                            ← iOS files (don’t touch)
├── lib/                            ← all your code goes here
│   ├── main.dart                   ← starting file (we change it)
│   ├── screens/                    ← create this
│   │   ├── login_screen.dart
│   │   ├── register_screen.dart
│   │   ├── home_screen.dart        ← product list
│   │   ├── product_detail_screen.dart
│   │   ├── cart_screen.dart
│   │   ├── profile_screen.dart
│   │   └── splash_screen.dart
│   ├── models/                     ← create this
│   │   └── product_model.dart
│   ├── services/                   ← create this
│   │   └── api_service.dart        ← connect to backend
│   ├── utils/                      ← create this
│   │   └── auth.dart               ← save token + role
│   ├── widgets/                    ← create this
│   │   ├── product_card.dart
│   │   └── bottom_nav_bar.dart
│   └── constants/                  ← create this
│       └── colors.dart
├── pubspec.yaml                    ← add packages here
├── .gitignore
└── README.md