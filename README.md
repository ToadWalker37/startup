# startup
## Description deliverable
### Elevator pitch

Have you ever wanted to replace your car? Not just sell your car for cash and hunt separately for a new vehicle? This website will allow you to save money compared to a trade-in at the dealership, because you can connect with other car owners who want to trade their car for yours.

### Design

![First three HTML pages](IMG_20240117_202959931.jpg)
![Last three HTML pages](IMG_20240117_203016085.jpg)


### Key features

- Secure login over HTTPS
- Ability to post and edit vehicle listings
- Ability to sort through, browse, and save vehicle listings
- Ability to chat with listing owners
- Vehicle listings, analytics, and chat history are persistently stored
- Vehicle listing analytics available to listing owner

### Technologies

I am going to use the required technologies in the following ways.

- HTML - To make correct structure for my application. I will have the following HTML pages: home/login page, personal dashboard, create listing, browse listings, chat window, and about/contact.
- CSS - To make application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- JavaScript - To provide login, chat functionality, listing display (browsing, editing, and posting), backend endpoint calls.
- Service - Backend service with endpoints for:
  - login and creating accounts
  - retrieving and submitting listing, chat, and analytics data
- DB/Login - Store users, chat data, and listings (+analytics) in database. Register and login users. Credentials securely stored in database.
- WebSocket - As users browse listings, analytics are updated to owner. As owners post, listings are updated to users. Chat messages are instantly relayed to the other person.
- React - Application ported to use the React web framework.
