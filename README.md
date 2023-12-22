# plutus



## TODO

- Change name to something UK based - maybe there's a UK name that means money? 

- monte carlo js - https://www.orthogonal.info/2022/12/03/monte-carlo-simulation-in-javascript/
- monte carlo .net - https://www.codeproject.com/articles/32654/monte-carlo-simulation

- Example - https://projectionlab.com

Do a really basic version of the monte carlo without any need for login etc. It should just let you enter your values and be done with it. Nice charts tho


22/12/2023
----------
Experimenting with GoLang and templ for running a server only solution for an App. It's promising, but the Serverless delay of API calls causes the website to be slow unlike an offline capable app. It's the price you pay for having state only available on the backend. Could be workable especially if it's a local-first app, where the server is on the computer that's using it e.g. Desktop app. For hosted apps It's totally fine, it just means you're going to have to wait for the server - the upshot is you don't have to think about sync errors with offline sync.

10/10/2022
----------
Plan: Go with IndexedDB, and try to sync it with Google Drive.  Put a basic UI in place for monthly budgets - like a spreadsheet


-----------
29/09/2022
New thoughts - tried google drive integration.  Would be flaky and difficult.  Would require me to load in a sqlite dependency which would be WASM and make the bundle huge.  Also to do all the work locally and update google drive would be madness.

Looked into indexedDB, haven't done a prototype with it yet but it would have issues syncing across devices.  If you wanted to use it across two compys you'd need to write a sync for it.  Might be possible, worth checking. It's not relational though, which may pose a problem. 

I could write a simple database backed by the FileSystem API, and periodically lock the database and back up that file. This would be pretty cool because I don't know of anyone who has implemented a simple FileSystem API backed database, but I could see it being useful for other purposes.



Other thought is if you want to support multiple devices you would be easier with a server and the data stored somewhere.  If I had a server it would be fine to put the DB on the users Google Drive but there's a cost involved in the server. I feel the cost issue was why ActualBudget failed and took their stuff offline. 

-----------

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
