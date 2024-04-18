# startup
## Specification deliverable
### Elevator pitch

Have you ever wanted to replace your car? Not just sell your car for cash and hunt separately for a new vehicle? This website will allow you to save money compared to a trade-in at the dealership, because you can connect with other car owners who want to trade their car for yours.

### Design

![First three HTML pages](images/specs_front.jpg)
![Last three HTML pages](images/specs_back.jpg)


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

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.
- HTML pages - seven HTML pages that represent the homepage and the ability to login, browse listings, create listings, chat with users, manage listings and chats, and contact the developer (me).
- Links - Five of the seven pages are accessible from the nav bar at the top of the screen. The Create Listing page is accessible from the Browse and Dashboard pages. And the Chat page is accessible from the Dashboard page.
- Text - Includes necessary text on all pages, such as (but not only) text representing the choices of which car(s) to search for on the Browse page.
- 3rd party service calls - Vehicle info in "Create Listings" will be auto-populated using the VIN API from the NHTSA.
- Images - There are two images on the homepage as well as several images in the Dashboard and Browse pages from sample listings.
- DB/Login - Input box and submit button for login. The listing information represents data pulled from the database, and a sample listing is in the HTML.
- WebSocket - The dashboard and browse statistics for saves and views represent real-time user data. The chat data also represents real-time data from other users.

## CSS Deliverable

For this deliverable I properly styled the application into its final appearance.

- Header, footer, and main content body - Well-proportioned. Used flex and grid to layout sections.
- Navigation elements - I dropped the underlines and changed the color for anchor elements. Links change color on hover. Nav bar is yellow.
- Responsive to window resizing - Responsive to window resizing. Looks good on iPad, desktop, and iPhone.
- Application elements - Used good contrast and whitespace, consistent colors, and buttons are using bootstrap.
- Application text content - Consistent font. Text is displayed using the Segoe UI/Helvetica/Noto font family.
- Application images - I added curved edges around my listing thumbnail photos on the browse page. I also made a carousel on the listing page.

## JavaScript deliverable

For this deliverable I implemented my JavaScript so that the application works for multiple users using the same computer and browser. I also added placeholders for future technology.

- Login - Users can create accounts and this allows them to create listings when they navigate to the Dashboard page.
- Database - Listing and account data is stored and retrieved from LocalStorage, and it will be replaced with the database data later.
- WebSocket - Users can favorite vehicles and this is shown on the listing page to everyone upon refresh. Later, a refresh will not be necessary because WebSocket messages will automatically update the "favorites" count of a vehicle.
- Application logic - Users can search for specific vehicles in the database by clicking checkboxes on the Browse page. They can also create listings and they will be automatically redirected to the Dashboard page once their listing is created. And listing details are displayed using JavaScript according to the vehicle ID passed into the URL.

## Service deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

- Node.js/Express HTTP service - implemented in index.js
- Static middleware for frontend - implemented in index.js
- Calls to third party endpoints - Vehicle data is populated with a fetch call to an API from the US Department of Transportation
- Backend service endpoints - The list of all vehicle objects is stored on the backend, with endpoints for the frontend to grab vehicle data as needed
- Frontend calls service endpoints - I did this using the fetch function. GET and POST requests to create, delete, and display listings

## DB/Login deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

- MongoDB Atlas database created - done!
- Stores data in MongoDB - done!
- User registration - Creates a new account in the database.
- Existing user authentication - You can sign in with an existing account.
- Use MongoDB to store credentials - Stores both user credentials and posted vehicles.
- Restricts functionality - You cannot view listings in the Browse page until you have logged in. This is restricted on the backend. Unauthorized users are shown the page as if there are no listings.

## WebSocket deliverable

For this deliverable I used webSocket to create a sense of community among veicle browsers by displayig user agents on the frontend in realtime.

- Backend listens for WebSocket connection - done!
- Frontend makes WebSocket connection - done!
- Data sent over WebSocket connection - done!
- WebSocket data displayed - User agents are displayed of fellow vehicle browsers who started browsing after you started browsing.

## React deliverable

For this deliverable I converted part of the application over to use React.

-  Bundled and transpiled - done!
-  Components - About and home are all components.
-  Router - Routing between home and about components.
-  Hooks - Didn't have time to complete!