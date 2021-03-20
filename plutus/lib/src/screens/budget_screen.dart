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
    var months = ['January' /*, 'February', 'March', 'April'*/];
    var monthlyBudgetColumns = [];
    for (var month in months) {
      var budgetCategories = [
        'Food shopping',
        'Spending money',
        'Council tax',
        'Utility bills',
        'Internet bills'
      ];

      var budgetCategorySpendingRows = [];
      for (var budgetCategory in budgetCategories) {
        budgetCategorySpendingRows.add(Row(
          children: [
            Expanded(
                child: TextFormField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
              ),
            )),
            Expanded(
                child: TextFormField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
              ),
            )),
            Expanded(
                child: TextFormField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
              ),
            )),
          ],
        ));
      }

      monthlyBudgetColumns.add(Expanded(
          child: Container(
              margin: const EdgeInsets.all(6),
              child: Column(
                children: [
                  MonthOverview(
                    monthText: month,
                  ),
                  Row(children: [
                    Expanded(child: Text("Budget")),
                    Expanded(child: Text("Outflow")),
                    Expanded(child: Text("Balance"))
                  ]),
                  ...budgetCategorySpendingRows
                ],
              ))));
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
                children: [
                  Expanded(
                      child: Column(children: [
                    TextFormField(
                      initialValue: 'Category 1',
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                    TextFormField(
                      initialValue: 'Category 2',
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                    TextFormField(
                      initialValue: 'Category 3',
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                    TextFormField(
                      initialValue: 'Category 3',
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                    TextFormField(
                      initialValue: 'Category 3',
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ])),
                  ...monthlyBudgetColumns
                ],
              ),
            ],
          )))
        ],
      ),
    );
  }
}
