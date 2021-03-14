import 'package:flutter/material.dart';
import 'package:plutus/wigets/side_nav.dart';

class ReportsScreen extends StatelessWidget {
  ReportsScreen({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        // appBar: AppBar(title: Text(title)),
        // drawer: SideNav(),
        body: Row(children: [SideNav(), Text('Reports go here')]));
  }
}
