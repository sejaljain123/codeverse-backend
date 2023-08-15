import { exec } from "child_process";
import { writeFile, unlink } from "fs";

export const execPromise = (command, noBuffer = false) =>
  new Promise((resolve, reject) => {
    exec(
      command,
      noBuffer
        ? {}
        : {
          timeout: 2000,
          maxBuffer: 1024 * 1024 * 5,
        },
      function (error, stdout, stderr) {
        if (error)
          reject(JSON.stringify(error, Object.getOwnPropertyNames(error)));
        else {
          const isError = Boolean(stderr);
          resolve({ isError, output: stdout || stderr });
        }
      }
    );
  });

export const writeFilePromise = (location, data) =>
  new Promise((resolve, reject) => {
    console.log("writing file", location);
    writeFile(location, data, function (err) {
      console.log("file written", location, data);
      if (err) reject(err);
      else resolve();
    });
  });

export const deleteFilePromise = (location) =>
  new Promise((resolve, reject) => {
    unlink(location, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

