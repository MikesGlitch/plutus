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
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

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
      appBar: AppBar(
        title: Text(widget.title),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () {
              ScaffoldMessenger.of(context)
                  .showSnackBar(const SnackBar(content: Text('Logout...')));
            },
          ),
        ],
      ),
      drawerEnableOpenDragGesture: false,
      endDrawerEnableOpenDragGesture: false,
      drawer: SideNav(),
      body: ListView(children: [
        Row(
          children: [
            ...monthlyBudgetColumns,
          ],
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
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        )
      ]),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
