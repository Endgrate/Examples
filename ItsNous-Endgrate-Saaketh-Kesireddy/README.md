# What is Nous?
For now, [Nous](https://its-nous-v2.web.app/account) is a note-taking app that I ([Saaketh Kesireddy](https://github.com/saakethk/its-nous-v2/blob/main/Current%20Resume.pdf)) am developing. Eventually, I want to expand the app to have additional functionality such as a stock page, and A.I. inspiration generator.

## How to use Nous:
### Create A Note:
Create a note by clicking the '+' symbol in the bottom right corner. This will create a default note with a titel called untitled and empty content. The notes are stored accoridng to your account in a Firebase Firestore database.
### Search Notes:
Search your notes via the searchbar on top of the notes. Currently, our search searches the content and title of all the notes. Hence, you cannot search by date. More functionality will be added.
### Start your Note:
The note UI is made explicity to be as simple as possible. You can edit the titel by clicking the top left corner input box. All changes are also saved instantly so there is no need to click save.
### Integrations:
In order to make Nous more useful, I ([Saaketh Kesireddy](https://github.com/saakethk/its-nous-v2/blob/main/Current%20Resume.pdf)) have integrated Endgrate's API into the app to create a Google Docs ntegration that allows seamless export of a note to a google doc. Just authenticate with google and copy a Google Doc ID to export the note successfully.

## Resources Used:
- Endgrate (For Integrations)
- Firebase (For Database, Hosting, and Analytics)
- Capacitor (For general codebase compatibility)
- React (Framework)
- Typescript (Dominant Language)
- Flask (Backend)
