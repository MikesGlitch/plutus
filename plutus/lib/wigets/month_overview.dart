import 'package:flutter/material.dart';

class MonthOverview extends StatelessWidget {
  MonthOverview({Key key, this.monthText}) : super(key: key);

  final String monthText;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
          child: Text(
        monthText,
        style: TextStyle(fontWeight: FontWeight.bold),
      )),
    );
  }
}
