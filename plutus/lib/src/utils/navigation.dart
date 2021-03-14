import 'package:flutter/material.dart';

Route navigateToScreenNoAnimation(Widget screen) => PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) => screen,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return child;
      },
    );
