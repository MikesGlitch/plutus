import 'dart:io';

import 'package:flutter/material.dart';

import 'src/screens/budget_screen.dart';
import 'src/screens/reports_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // final filename = 'file.txt';
    // File(filename)
    //     .writeAsString('some content 2')
    //     .then((test) => {print('written')});
    // File('C://Users/PandaMan/Desktop/test.json')
    //     .readAsString()
    //     .then((String contents) {
    //   print(contents);
    // });

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
