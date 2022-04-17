
# Platos Assignment

Name: Beeta Samad

Email: beetasamad21@yahoo.com (or) beetasamad21@gmail.com

Phone Number: +91 7303077410

#### Deployed Link of the Assignment: https://platos-test-36f87.web.app/

## About the Tech-Stack
The entire project has been made using React.js for the front-end, and firestore for the database.

### `ReactJS:`
The frontend was made using ReactJS and also MUI for the custom-built/pre-made components for easy UI creation. 

### `Firestore:`
The collection in the Firestore Database have the following collections with the following document-structures:

Collection #1: `movies`
Document-Structure: 
- movie_name (string)
- year (string)
- genre (array)
- rating (string)

(Although rating and year should've been integers(or numbers) as their data-type, I kept every property's data-type as string for simplicity as I assumed that this assignment was testing on the basic knowledge and understanding of the working behind each system.
                      
Collection #2: `video_games`
Document-Structure: 
- game_name (string)
- year (string)
- developer (string)

## Advantages and Disadvantages of NodeJS in the Company
In my opinion the only main downside about NodeJS is the huge development time using it for any kind of project. Everything needs to be coded from scratch and each and every system might need its own framework/module/server to back it up. Most of the times we use third-party modules to help complete our tasks, which can sometimes be a hassle and dangerous choice as there can be version-mismatches, deprecation issues, security issues etc. that comes alone making use of third-party packages.
The upside to using a NodeJS is that we're free to implement any logic or any system at our will and are not bounded by any restrictions. We can integrate almost any kind of database (SQL or NoSQL), implement any complex backend logic, integrate SMS-sending features etc. using NodeJS.

When it comes to the Platos Admin and Caterer web apps, firebase should be able to take care of all the basic features as there might not be a need of complex systems required (atleast as of yet). If all the basic components of firebase are able to satisfy the requirements as of now, then firebase is the best option to go along as it eases up the development by a huge fold.
Even if later in the future advanced systems are required, there is no need to worry as we can have other systems  (like NodeJS) coupled along with firebase for the apps.
