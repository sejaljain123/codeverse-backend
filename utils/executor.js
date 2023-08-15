import {
  execPromise,
  writeFilePromise,
  deleteFilePromise,
} from './file-executor.js'
import path from 'path'

const __dirname = path.resolve();
export const execNode = async (data, input = "") => {
  const filename = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  const filePath = __dirname + `/utils/temp/${filename}.js`;
  const inputPath = __dirname + `/utils/temp/${filename}.input`;
  try {
    await writeFilePromise(filePath, data);
    await writeFilePromise(inputPath, input);
    const output = await execPromise(`node utils/temp/${filename}.js < utils/temp/${filename}.input`);
    console.log(output, "otput");
    await deleteFilePromise(filePath);
    await deleteFilePromise(inputPath);
    return output;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const execCpp = async (data, input = "") => {
  const filename = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  const filePath = __dirname + `/utils/temp/${filename}.cpp`;
  const inputPath = __dirname + `/utils/temp/${filename}.input`;
  try {
    await writeFilePromise(filePath, data);
    await writeFilePromise(inputPath, input);
    await execPromise(
      `g++ -o utils/temp/${filename} utils/temp/${filename}.cpp`,
      true
    );

    const output = await execPromise(`./utils/temp/${filename} < utils/temp/${filename}.input`);
    console.log(output);
    await deleteFilePromise(filePath);
    await deleteFilePromise(`./utils/temp/${filename}`);
    await deleteFilePromise(inputPath);
    console.log(output, "output");
    return output;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
export const execPython = async (data, input = "") => {
  const filename = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  const filePath = __dirname + `/utils/temp/${filename}.py`;
  const inputPath = __dirname + `/utils/temp/${filename}.input`;
  try {
    await writeFilePromise(filePath, data);
    await writeFilePromise(inputPath, input);
    const output = await execPromise(`python3 utils/temp/${filename}.py < utils/temp/${filename}.input`);
    // console.log(output);
    await deleteFilePromise(filePath);
    await deleteFilePromise(inputPath);
    return output;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
