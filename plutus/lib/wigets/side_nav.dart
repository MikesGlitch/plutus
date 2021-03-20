import 'package:flutter/material.dart';
import 'package:plutus/src/screens/budget_screen.dart';
import 'package:plutus/src/screens/help_screen.dart';
import 'package:plutus/src/screens/investments_screen.dart';
import 'package:plutus/src/screens/reports_screen.dart';
import 'package:plutus/src/screens/settings_screen.dart';
import 'package:plutus/src/utils/navigation.dart';

class SideNav extends StatelessWidget {
  SideNav({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          Expanded(
              child: ListView(children: <Widget>[
            SizedBox(
                height: 80.0,
                child: DrawerHeader(
                  child: Text(
                    'Plutos',
                    style: TextStyle(
                      fontSize: 24,
                    ),
                  ),
                )),
            ListTile(
              leading: Icon(Icons.grade),
              title: Text('Budget'),
              onTap: () {
                Navigator.of(context)
                    .push(navigateToScreenNoAnimation(BudgetScreen()));
                // Navigator.pop(context); // close the drawer
              },
            ),
            ListTile(
              leading: Icon(Icons.analytics),
              title: Text('Reports'),
              onTap: () {
                Navigator.of(context)
                    .push(navigateToScreenNoAnimation(ReportsScreen()));
                // Navigator.pop(context); // close the drawer
              },
            ),
            ListTile(
                leading: Icon(Icons.stacked_line_chart),
                title: Text('Investments'),
                onTap: () {
                  Navigator.of(context)
                      .push(navigateToScreenNoAnimation(InvestmentsScreen()));
                }),
          ])),
          // This container holds the align
          Container(
              // This align moves the children to the bottom
              child: Align(
                  alignment: FractionalOffset.bottomCenter,
                  // This container holds all the children that will be aligned
                  // on the bottom and should not scroll with the above ListView
                  child: Container(
                      child: Column(
                    children: <Widget>[
                      Divider(),
                      ListTile(
                          leading: Icon(Icons.settings),
                          title: Text('Settings'),
                          onTap: () {
                            Navigator.of(context).push(
                                navigateToScreenNoAnimation(SettingsScreen()));
                          }),
                      ListTile(
                          leading: Icon(Icons.help),
                          title: Text('Help and Feedback'),
                          onTap: () {
                            Navigator.of(context).push(
                                navigateToScreenNoAnimation(HelpScreen()));
                          }),
                    ],
                  ))))
        ],
      ),
    );
  }
}
