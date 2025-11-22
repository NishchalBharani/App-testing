[4:36 pm, 22/11/2025] Viii: ----
[4:46 pm, 22/11/2025] Nischal Xelp: Bugfix: Apartment Sort
View all
v
READMEmd 8
+ →
1
MERN
HE PROJECT FILES INSTRUCTIONS.nd
Travel
Task Description:
The Travel application, built with a React frontend and a Node.js backend, allows users to explore and book apartments for travel and short-term stays. A key part of this experience is the apartment listing page, where users should be able to sort apartment based on their preferences, such as price, rating, or title. The sorting options are intended to be accessible via a "Sort" buttonin the navigation bar, which opens a modal containing available sort fields and order options (e.g., ascending or descending).
However, the current implementation is either incomplete or non-functional. The sorting logic is broken, the modal Ul may not render or function as expected, and selected sort preferences do not persist when users navigate between pages. This frontend task involves fixing the sorting functionality.
Note: The code repository may intentionally contain other issues that are unrelated to this specific task. Please focus only on the described task requirements and address bugs or errors directly associated with them.
Issue: The apartment list cannot be sorted as expected, and sorting state does not persist across page correctly
Steps to Reproduce
* Log in as User 1:
Email: user1@mail.com
Password: user123
* On the home page, locate the "Sort" button in the nakbar (It should be visible only on the homepage).
* Click the "Sort" button to open the modal.

Task: 112
* Click the "Sort" button to open the modal.
* In the modal:
* Select one of the sorting options:
* Sort by Price
* Sort by Average Rating
* Sort by Title
•Toggle the sorting direction (ascending or descending)
using the Up Arrow or Down Arrow icons.
* Click "Apply Sort" to apply the selected sorting.
* Navigate away from the homepage (e.g., go to apartment details), then return.
Expected Behavior
* The "Sort" button should appear only on the home page.
* Clicking the "Sort" button should open a modal with the following functionality:
* List of sorting criteria (Price, Rating, Title).
* Toggleable direction indicators (Up Arrow: Ascending,
Down Arrow: Descending).
* Only one sorting option can be active at any time.
* Clicking "Apply Sort" should:
* Immediately update the apartment listing based on the selected sort criteria and order.
* Reflect changes accurately in the Ul.
* When the user navigates to another page and returns to the home page:
* The previously selected sorting option and order should be preserved.
Demo of expected functionality:
View all
READMEnd 8 X PROJECT PROJECT_FLES_NSTR.CTIONS.#d
HERN Travel App
explore, book, and manage accomodations, and etters hosts to tist ant wenge reta prates.
A futt-stack travel booking appLication built with the NERd stack (Bopal, Spres. Rec, Me 30. 2. ete un
# • Key Features
# 1 User Registration & Legin
- Enail-based authentication for travelers and hosts
12
M & Bronse Listings
- Users can vien accommodations with search and fitter ty tecutter
# I Vien Listing Detaits
- Detailed vier of each property with photos, ementties, es eettetty
# # Booking Systen
- Users can select dates and nate secure poyments to over tities
# Booking Ranagement
- Traveters can track current and past bookings de the wer dessere
# a Host Dashboard
- Hosts can List properties, sanage tistlegs, end vien de cesst sette remete
Problems
Cutput
Dedug Console
no audit fix --force
Run "non audit" for detalls.
Inserted unque locationg
Users Inserted successfuty
Coupons seeded successfully
Apartments seeded succefully
Bookings seeded successfully
Addded 100 colns to all users apa notice