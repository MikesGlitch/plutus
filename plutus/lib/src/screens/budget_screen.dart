import 'package:flutter/material.dart';
import 'package:plutus/wigets/month_overview.dart';
import 'package:plutus/wigets/side_nav.dart';

class BudgetScreen extends StatefulWidget {
  BudgetScreen({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _BudgetScreenState createState() => _BudgetScreenState();
}

class _BudgetScreenState extends State<BudgetScreen> {
  @override
  Widget build(BuildContext context) {
    var months = ['January', 'February', 'March', 'April'];
    var monthlyBudgetColumns = [];
    for (var month in months) {
      monthlyBudgetColumns.add(Column(
        children: [
          MonthOverview(
            monthText: month,
          ),
        ],
      ));
    }

    return Scaffold(
      body: Row(
        children: [
          SideNav(),
          Expanded(
              child: Container(
                  child: Column(
            children: [
              Row(
                children: [...monthlyBudgetColumns],
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Dart packages are here: https://pub.dev/',
                  ),
                  Text(
                    'You have pushed the button this many times:',
                  ),
                ],
              ),
            ],
          )))
        ],
      ),
    );
  }
}
