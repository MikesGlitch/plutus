import 'package:flutter/material.dart';

class MonthOverview extends StatelessWidget {
  MonthOverview({Key key, this.monthText}) : super(key: key);

  final String monthText;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      width: 300,
      child: Center(
          child: Text(
        monthText,
        style: TextStyle(fontWeight: FontWeight.bold),
      )),
    );
  }
}
