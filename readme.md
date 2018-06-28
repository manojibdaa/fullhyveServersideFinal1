# Fullhyve server side
------------------------------------------------------------------------------

Commands
  * npm run start  -- to compile the typescript code and save the output in the dist folder
  * nodemon index.js -- in the dist folder to start the server
  * npm test -- to run the tests

Before running the test
  * Create a database by the name projecttrackertest in the local database server then initialize 
    and seed the database with the given seed data. To do that uncomment the last line on index.ts 
    found in src folder. After the seeding process is completed comment the line back.

  * Compile the code to see the changes made in the typescript code on the javascript file using
    'npm run start'

  * Start the server using 'nodemon index.js'

Route Test
  * TestData.ts contains the input data and expected output for every action/task.
  * TestRunner.ts contains the main methods that use the data in the TestData.ts and perform the tests.
  * CustomAssertion.ts(in src folder) contains methods used to assert the returned data conforms to the expected output.
  * SeedData.ts contains the data that will initiate the database so that its ready for route testing.
  * testDb.ts contains methods that will insert the seed data to the database.

Unit Test
  * servicesTest.ts contains the tests for the team services and project services.

Use npm test to run both unit and route test
