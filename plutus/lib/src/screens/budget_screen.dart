import 'package:flutter/material.dart';
import 'package:plutus/wigets/month_overview.dart';
import 'package:plutus/wigets/side_nav.dart';

class BudgetScreen extends StatefulWidget {
  BudgetScreen({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _BudgetScreenState createState() => _BudgetScreenState();
}

class BudgetCategoryGroup {
  BudgetCategoryGroup({this.name, this.categories});

  final String name;

  final List<String> categories;
}

class _BudgetScreenState extends State<BudgetScreen> {
  @override
  Widget build(BuildContext context) {
    var months = ['January', 'February', 'March', 'April'];
    var monthlyBudgetColumns = [];

    double headerMonthHeight = 50;
    double headerBudgetTitleHeight = 30;
    double headerHeight = headerMonthHeight + headerBudgetTitleHeight;
    double rowHeight = 40;

    List<BudgetCategoryGroup> budgetCategoryGroups = [
      new BudgetCategoryGroup(
          name: "Bills", categories: ['Utility', 'Internet', 'Council tax']),
      new BudgetCategoryGroup(
          name: "Expenses", categories: ['Food shopping', 'Spending money']),
    ];

    var budgetCategoryFields = [];
    for (var budgetCategoryGroup in budgetCategoryGroups) {
      budgetCategoryFields.add(SizedBox(
          height: rowHeight,
          child: TextFormField(
            readOnly: true,
            initialValue: budgetCategoryGroup.name,
            decoration: InputDecoration(
              isDense: true,
              border: OutlineInputBorder(),
            ),
          )));

      for (var category in budgetCategoryGroup.categories) {
        budgetCategoryFields.add(SizedBox(
            height: rowHeight,
            child: TextFormField(
              readOnly: true,
              initialValue: category,
              decoration: InputDecoration(
                isDense: true,
                border: OutlineInputBorder(),
              ),
            )));
      }
    }

    for (var month in months) {
      var budgetCategorySpendingRows = [];
      for (var budgetCategoryGroup in budgetCategoryGroups) {
        budgetCategorySpendingRows.add(Row(children: [
          Expanded(
            child: Container(
                height: rowHeight,
                decoration: BoxDecoration(
                    border: Border(top: BorderSide(), bottom: BorderSide()))),
          )
        ]));

        for (var category in budgetCategoryGroup.categories) {
          budgetCategorySpendingRows.add(SizedBox(
              height: rowHeight,
              child: Row(
                children: [
                  Expanded(
                      child: TextFormField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      isDense: true,
                    ),
                  )),
                  Expanded(
                      child: TextFormField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      isDense: true,
                    ),
                  )),
                  Expanded(
                      child: TextFormField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      isDense: true,
                    ),
                  )),
                ],
              )));
        }
      }

      monthlyBudgetColumns.add(Expanded(
          child: Container(
              padding: const EdgeInsets.all(6),
              child: Column(
                children: [
                  MonthOverview(
                    height: headerMonthHeight,
                    monthText: month,
                  ),
                  Container(
                      height: headerBudgetTitleHeight,
                      child: Row(children: [
                        Expanded(
                            child: Text(
                          "Budget",
                          textAlign: TextAlign.center,
                        )),
                        Expanded(
                            child:
                                Text("Outflow", textAlign: TextAlign.center)),
                        Expanded(
                            child: Text(
                          "Balance",
                          textAlign: TextAlign.center,
                        ))
                      ])),
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
                    Container(height: headerHeight),
                    ...budgetCategoryFields
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
