import 'package:flutter/material.dart';
import 'package:plutus/src/screens/budget_screen.dart';
import 'package:plutus/src/screens/reports_screen.dart';
import 'package:plutus/src/utils/navigation.dart';

class SideNav extends StatelessWidget {
  SideNav({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.purple,
            ),
            child: Text(
              'Plutos',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.message),
            title: Text('Budget'),
            onTap: () {
              // change app state...
              // Navigator.pushNamed(context, '/');
              Navigator.of(context)
                  .push(navigateToScreenNoAnimation(BudgetScreen()));
              // Navigator.pop(context); // close the drawer
            },
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Reports'),
            onTap: () {
              // change app state...
              // Navigator.pushNamed(context, '/reports');

              Navigator.of(context)
                  .push(navigateToScreenNoAnimation(ReportsScreen()));
              // Navigator.pop(context); // close the drawer
            },
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Investments'),
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Help'),
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
          ),
        ],
      ),
    );
  }
}

// // Nav goes here
// ElevatedButton(
//   child: Text('Launch screen'),
//   onPressed: () {
//     // Navigate to the second screen using a named route.
//     Navigator.pushNamed(context, '/reports');
//   },
// ),
