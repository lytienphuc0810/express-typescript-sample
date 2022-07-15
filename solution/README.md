# SOLUTION DOCUMENT
## How to run

1. npm install
2. npm run build
3. npm start

``
you may need to restart the server to reset the database data for the test suite above.
``

## Source structure

| file        | description                                                                                                         |
|-------------|---------------------------------------------------------------------------------------------------------------------|
| index.ts    | application entry point                                                                                             |
| controllers | controller folder, grouping code related to routing, request params parsing, response serializer, error handling logic |
| models      | models folder, define models, constraints & relationships                                                           |
| services    | service folder, contains domain logic, database manipulation.                                        |
| dist        | folder contains built javascript files                                                                              |
| seed.ts     | seed file (currently not in use)                                                                                    |

## Technical decisions
1. I choose typescript as it seems to be the team's favorite. Also prefer a strong typing language for server side programming.
2. I choose expressjs as it is the lightweight node server for this assignment.
3. I choose sequelize & a relational database as the requirement involves in relationship between data and there is no assumption about the big data scenario.
4. I also use eslint for code formatting.
