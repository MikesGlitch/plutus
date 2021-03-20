import 'package:flutter/material.dart';
import 'package:plutus/wigets/side_nav.dart';

class InvestmentsScreen extends StatelessWidget {
  InvestmentsScreen({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Row(children: [
      SideNav(),
      Expanded(
          child: Column(children: [
        Center(
            child: Column(children: [
          Text('Investments go here.'),
        ]))
      ]))
    ]));
  }
}
