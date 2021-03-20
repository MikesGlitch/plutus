import 'package:flutter/material.dart';
import 'package:plutus/wigets/month_overview.dart';
import 'package:plutus/wigets/side_nav.dart';

class BudgetScreen2 extends StatefulWidget {
  BudgetScreen2({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _BudgetScreen2State createState() => _BudgetScreen2State();
}

class BudgetCategoryGroup {
  BudgetCategoryGroup({this.name, this.categories});

  final String name;

  final List<String> categories;
}

class _BudgetScreen2State extends State<BudgetScreen2> {
  @override
  Widget build(BuildContext context) {
    var months = ['January', 'February', 'March', 'April'];
    var monthlyBudgetColumns = [];

    double headerMonthHeight = 50;
    double headerBudgetTitleHeight = 30;
    double headerHeight = headerMonthHeight + headerBudgetTitleHeight;
    double rowHeight = 40;
    var numberOfBudgetMonths = 3 * months.length;
    var datatableColumns = [];
    datatableColumns.add(DataColumn(
      label: Text('Category'),
    ));

    for (var month in months) {
      datatableColumns.add(DataColumn(
        label: Text('Budget'),
      ));
      datatableColumns.add(DataColumn(
        label: Text('Outflows'),
      ));
      datatableColumns.add(DataColumn(
        label: Text('Balance'),
      ));
    }

    List<BudgetCategoryGroup> budgetCategoryGroups = [
      new BudgetCategoryGroup(
          name: "Bills", categories: ['Utility', 'Internet', 'Council tax']),
      new BudgetCategoryGroup(
          name: "Expenses", categories: ['Food shopping', 'Spending money']),
    ];

    List<DataCell> monthDataCells = [
      DataCell(TextFormField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          isDense: true,
        ),
      )),
      DataCell(TextFormField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          isDense: true,
        ),
      )),
      DataCell(TextFormField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          isDense: true,
        ),
      )),
    ];

    List<DataCell> budgetDataCells = [];
    for (var month in months) {
      budgetDataCells.addAll(monthDataCells);
    }

    var categoryRows = [];
    for (var budgetCategoryGroup in budgetCategoryGroups) {
      categoryRows.add(DataRow(cells: [
        DataCell(Text(budgetCategoryGroup.name)),
        ...budgetDataCells
      ]));

      for (var category in budgetCategoryGroup.categories) {
        categoryRows.add(
            DataRow(cells: [DataCell(Text(category)), ...budgetDataCells]));
      }
    }

    List<DataRow> datatableRows = [...categoryRows];

    for (var month in months) {
      var budgetCategorySpendingRows = [];
      for (var budgetCategoryGroup in budgetCategoryGroups) {
        // It's weird setting 45 as the height.  May need to somehow set it everywehere else using sizedbox or something
        budgetCategorySpendingRows
            .add(Row(children: [SizedBox(height: rowHeight)]));

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
              margin: const EdgeInsets.all(6),
              child: Column(
                children: [
                  MonthOverview(
                    height: headerMonthHeight,
                    monthText: month,
                  ),
                  Container(
                      height: headerBudgetTitleHeight,
                      child: Row(children: [
                        Expanded(child: Text("Budget")),
                        Expanded(child: Text("Outflow")),
                        Expanded(child: Text("Balance"))
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
            child: Column(
          children: [
            Container(
              height: 100,
              alignment: Alignment.center,
              color: Theme.of(context).colorScheme.error,
              child: Text(
                  "My issue with this approach is that I don't have the control outside of the datatable.  I can't arrange the months etc above the data and keep the responsiveness"),
            ),
            SizedBox(
                width: double.infinity,
                child: DataTable(
                    columns: <DataColumn>[...datatableColumns],
                    rows: datatableRows
                    // rows: List<DataRow>.generate(
                    //   10,
                    //   (int index) => DataRow(
                    //     color: MaterialStateProperty.resolveWith<Color>(
                    //         (Set<MaterialState> states) {
                    //       // All rows will have the same selected color.
                    //       if (states.contains(MaterialState.selected))
                    //         return Theme.of(context)
                    //             .colorScheme
                    //             .primary
                    //             .withOpacity(0.08);
                    //       // Even rows will have a grey color.
                    //       if (index.isEven) {
                    //         return Colors.grey.withOpacity(0.3);
                    //       }
                    //       return null; // Use default value for other states and odd rows.
                    //     }),
                    //     cells: <DataCell>[
                    //       DataCell(Text('Row $index')),
                    //       DataCell(Text('Row $index'))
                    //     ],
                    //   ),
                    ))
          ],
        )),
      ],
    ));
  }
}
