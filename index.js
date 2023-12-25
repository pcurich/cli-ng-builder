#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shelljs from "shelljs";

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Creador de archivos con CLI", {
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const doQuestions = () => {
  const questions = [
    {
      name: "file",
      type: "input",
      message: "¿Cómo se va a llamar tu fichero? (sin la extensión)",
    },
    {
      name: "extension",
      type: "list",
      message: "¿Qué extensión tiene tu fichero",
      choices: [".rb", ".js", ".kt", ".java", ".ts", ".php"],
      filter: function (val) {
        return val.split(".")[1];
      },
    },
  ];
  return inquirer.prompt(questions);
};

const buildFile = (fileName, extension) => {
  const pathFile = `${process.cwd()}/${fileName}.${extension}`;
  shelljs.touch(pathFile);
  return pathFile;
};

const fileOK = (filepath) => {
  console.log(
    chalk.white.bgGreen.bold(
      `¡Muy bien! Fichero correctamente creado en el directorio ${filepath}`
    )
  );
};

let exec = async () => {
  init();
  const { file, extension } = await doQuestions();

  console.log(file, extension);
  const pathFile = buildFile(file, extension);
  fileOK(pathFile);
};

exec();
