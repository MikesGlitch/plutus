import 'package:flutter/material.dart';

import 'src/screens/budget_screen.dart';
import 'src/screens/reports_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Budget app',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.system,
      initialRoute: '/',
      routes: {
        '/': (context) => BudgetScreen(title: 'Budget app home'),
        '/reports': (context) => ReportsScreen(title: 'Reports'),
      },
    );
  }
}
