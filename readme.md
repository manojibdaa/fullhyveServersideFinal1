# Fullhyve server side
------------------------------------------------------------------------------

Commands -> npm run start  -- to compile the typescript code and save the output in the dist folder
         -> nodemon index.js -- in the dist folder to start the server
         -> npm test -- to run the tests

Before running the test
    - Database is already uploaded on gearhost free hosting site but if local database setup 
      is required create a database and import the projecttrackerfinal.sql file in the root folder 
      and also change the database name and credentials in the db.ts file to the desired value.

    - Seed the database with the given seed data. To do that uncomment the last line on index.ts 
      found in src folder. After the seeding process is completed comment the line back.

    - Compile the code to see the changes made in the typescript code on the javascript file using
      'npm run start'

    - Start the server using 'nodemon index.js'

    - Run the test using 'npm test'