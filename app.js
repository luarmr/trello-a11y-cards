#!/usr/bin/env node

'use strict'

const program = require('commander');
let conf = {};

program
    .version('0.0.1')
    .arguments('<user-token> <app-key> <column-id>')
    .action(function (userToken, appKey, columId) {
        conf = {
            appKey,
            userToken,
            columId
        };
    })
    .option('-A, --level-A', 'Level A')
    .option('-AA, --level-AA', 'Level AA')
    .option('-AAA, --level-AAA', 'Level AAA')
    .parse(process.argv);

if (!(conf.appKey && conf.userToken && conf.columId)) {
    program.outputHelp();
    process.exit(1);
}

const levels = [];
if (program.levelA) levels.push('A');
if (program.levelAA) levels.push('AA');
if (program.levelAAA) levels.push('AAA');

const trello = new(require("trello"))(conf.userToken, conf.appKey),
    Mark = require("markup-js"),
    fs = require("fs");

const wcag = require('./data/wcag.json');

const templateTitle = fs.readFileSync("templates/title.txt", "utf8"),
    templateContent = fs.readFileSync("templates/content.txt", "utf8");

wcag.principles.forEach(function (principle) {
    principle.guidelines.forEach(function (guideline) {
        guideline.successcriteria.forEach(function (successcriteria) {
            if (!levels.length || levels.indexOf(successcriteria.level) !== -1) {
                successcriteria.urlId = successcriteria.id.substr(6);
                const title = Mark.up(templateTitle, successcriteria);
                const content = Mark.up(templateContent, successcriteria);
                trello.addCard(title, content, conf.columId,
                    function (error, trelloCard) {
                        if (error) {
                            console.log('Could not add card:', error);
                        }
                        else {
                            console.log('Added card:', trelloCard);
                        }
                    });
            }
        });
    });
});
