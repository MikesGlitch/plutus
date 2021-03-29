import 'package:flutter/material.dart';
import 'package:plutus/wigets/side_nav.dart';

class SettingsScreen extends StatelessWidget {
  SettingsScreen({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Row(children: [
      SideNav(),
      Expanded(
          child: Container(
              padding: EdgeInsets.all(20),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Settings'),
                    Row(
                      children: [
                        Text('File location'),
                        Container(
                          margin: EdgeInsets.all(10),
                          width: 400,
                          child: TextFormField(
                            initialValue:
                                'C://Users/PandaMan/Desktop/test.json',
                            decoration: InputDecoration(
                              // isDense: true,
                              border: OutlineInputBorder(),
                            ),
                          ),
                        )
                      ],
                    )
                  ])))
    ]));
  }
}
