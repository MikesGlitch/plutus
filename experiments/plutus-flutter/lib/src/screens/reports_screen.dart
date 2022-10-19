import 'package:flutter/material.dart';
import 'package:plutus/wigets/side_nav.dart';
import 'package:url_launcher/url_launcher.dart';

class ReportsScreen extends StatelessWidget {
  ReportsScreen({Key key, this.title}) : super(key: key);

  final String title;

  void launchURL(BuildContext context, url) async => {
        await canLaunch(url)
            ? await launch(url)
            : ScaffoldMessenger.of(context)
                .showSnackBar(SnackBar(content: Text('Could not launch $url')))
      };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Row(children: [
      SideNav(),
      Expanded(
          child: Column(children: [
        Center(
            child: Column(children: [
          Text('Reports go here.  Ideas here:'),
          ElevatedButton(
            child: new Text('charts'),
            onPressed: () => launchURL(context,
                'https://google.github.io/charts/flutter/gallery.html'),
          )
        ]))
      ]))
    ]));
  }
}
