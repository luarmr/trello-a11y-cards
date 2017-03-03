Trello accessibility cards generator
=========

Nothing fancy, just a card generator for every point in WCAG2 guidelines.


Usage:
------
    ./app.js
    
      Usage: app [options] <user-token> <app-key> <column-id>
    
      Options:
    
        -h, --help         output usage information
        -V, --version      output the version number
        -A, --level-A      Level A
        -AA, --level-AA    Level AA
        -AAA, --level-AAA  Level AAA
        
      

How to get the user token and app key:
-------------------------------------- 

(https://developers.trello.com/get-started/start-building)


How to get the column id:
-------------------------
Column is a list inside a board. You can play here:
(https://developers.trello.com/sandbox)


Thanks to:
----------
This tool uses a JSON format containing all the texts of WCAG principles, guidelines and criteria. This JSON document was generated using the Wcag2Json project. https://github.com/WilcoFiers/wcag2json/
