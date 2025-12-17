import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../services/api_service.dart';
import '../models/product_model.dart';
import '../widgets/product_card.dart';
import '../utils/auth.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Product> products = [];
  bool loading = true;
  String? role;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  void loadData() async {
    await ApiService.loadToken();
    role = await Auth.getRole();
    try {
      final data = await ApiService.getProducts();
      setState(() {
        products = data.map((json) => Product.fromJson(json)).toList();
        loading = false;
      });
    } catch (e) {
      setState(() => loading = false);
    }
  }

  void buyProduct(Product product) async {
    // sellerId = agentId from product.agentId (you can add it later)
    try {
      await ApiService.buyProduct(product.id, 1, 1); // temporary sellerId
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Purchase successful!')));
      loadData();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Purchase failed')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Products'),
        backgroundColor: AppColors.primary,
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await ApiService.logout();
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => LoginScreen()));
            },
          ),
        ],
      ),
      body: loading
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: EdgeInsets.all(16),
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.75,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: products.length,
                itemBuilder: (context, index) {
                  return ProductCard(
                    product: products[index],
                    onBuy: () => buyProduct(products[index]),
                  );
                },
              ),
            ),
    );
  }
}