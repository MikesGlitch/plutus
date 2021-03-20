import 'package:flutter/material.dart';

class MonthOverview extends StatelessWidget {
  MonthOverview({Key key, this.monthText, this.height}) : super(key: key);

  final String monthText;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      child: Center(
          child: Text(
        monthText,
        style: TextStyle(fontWeight: FontWeight.bold),
      )),
    );
  }
}
