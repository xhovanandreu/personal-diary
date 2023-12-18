
Here are elements to consider before running someone else's Expo React Native app:
- 		React Native Version: 0.72.6
- 		Expo SDK Version:49
- 		Dependencies: package.json file,
- 		Expo CLI: (6.3.10) Install Expo CLI globally to manage and run Expo projects easily.
- 		Node.js: v18.16.0
- 		Expo Go App: install expo app on mobile (I have been using IOS)

To start the app: 
In the root directory write the command: npx expo start
Scan the QR code 


The app architecture
Root directory:
 - App.js
 - Assets
 - config files
 - app folder

App folder
- screens (list of the screens)
- Components ( functions and components)

The app description:
1. Home screen
- Search by keyword
- Calendar (click a date if there is a diary written on that date it will open the Diary details otherwise it will open the screen "Add Diary" to write a diary for that date)
- List of entries (each diary has the buttons to view, delete, edit)
    
2. Add Diary + Edit Diary
- Date selector, title, description, mood
- Input validation (required)

3. Diary details
   - read the entry info
   - buttons “Edit” and “Delete”

