import 'package:flutter/material.dart';
import 'package:plutus/wigets/side_nav.dart';

class HelpScreen extends StatelessWidget {
  HelpScreen({Key key, this.title}) : super(key: key);

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
          Text('Help goes here.'),
        ]))
      ]))
    ]));
  }
}
