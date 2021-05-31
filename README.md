# Front-End

Layout:
    BrowserRouter is called from index.js to allow use of useHistory. useHistory is called in App.js, and if BrowserRouter is called in the same component it returns undefined.

    App.js holds state, handler functions for the components, and it also handles the routes.

    Homepage.js displays welcome text, and routes to either Login/Signup or User Screen/Add Plants depending on whether or not a user is authenticated.

    AddPlants.js renders a basic form to add nickname and species name. It then renders more inputs for time based off of the plantForm state. Specifically, it renders inputs = plantForm.waterPerDay. Add Time/ Remove Time buttons increment the waterPerDay value +1 or -1 respectively.

    UserScreen renders a card for each plant with its nickname and the times it needs to be watered

Bugs:
    Certain times passed to timeForm do not get set correctly. This is because of how I am currently handling setting and saving date objects.

    Checkboxes in timeForm do not update until rerender of the page (add time/ remove time buttons can force this)

    Importing Styled-components and using them breaks code (witnessed by TA)