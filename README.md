# plutus

Still figuring out how I want to write this.

The deciding factor might be to do with connection with Google Drive.  I'd like to be able to do this without a Server. I just want my UI to connect to Google Drive and do what it needs to from the data there. 

It can be connected to from either web/desktop/whatever.  I think MAUI is limited in that regard. Flutter - maybe not. My main concern is if I require a web UI no matter what, I may as well use a web technology and bundle it with Electron or whatever to facilitate on devices. 

I'm always going to run into the same issue with localdb - with JS it's not as bad (better connectors).

Why didn't I just write it in React?  Dunno yet, I might change it.

# New ideas (2022)
- Investments module: 
    - select which investments you have, based on data from morningstar, project estimated returns based on historic data (like timelineapp)
    - Monte carlo 

- We have the budget module all scoped out
- Take into account consistent salary? The app could also conver one of the most important aspects of money - career. Why stop at budgeting and investing, the most important part is making the money to begin with. We can setup a module that records pay rises, can scan the market for higher offers, maybe even highlight when you're underpaid and offer new job ideas?

# Refactoring idea
- What if I made it a website and gave it access to a users Google Drive. The Google Drive could work as a data store/backup and the website could act as the interface.  I think Draw.io do something similar

# Ideas
- Hook into Money Savings Expert somehow to tell people when they could save money on electricity?  Could implement flags for certain categories like utilities etc
Plutus(named after the Greek god of wealth) is a budget app built in Flutter.


# Reference links
- https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html

# Approach
**I think it's still the right approach to go with the Flutter Desktop app (at least for V1).  Mainly because of cost.**

## Desktop app 
### Benefits:
- Cheaper
- Data security isn't as much of an issue (it's on the users pcs)

### Drawbacks:
- Harder to update (but still possible)
- Harder to build - debatable if I use Electron instead of Flutter

## Web app 
### Benefits:
- Easier to build
- Easier to update
- Easier to get users to try it out

### Drawbacks:
- A lot more expensive
- More competition with other vendors (will take more features to compete)


## Watch me build the app (live stream)

### Playlist:
[![Watch me build the app](https://img.youtube.com/vi/QiZKAa5OWt0/0.jpg)](https://www.youtube.com/watch?v=QiZKAa5OWt0&list=PLtB5E_brMhWWYjRE2gYBVdgbBPS9u0-Fe)
