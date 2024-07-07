"use server"

// make a function called makeRandomNumber that recives two numbers and returns a random number between them

export async function makeRandomNumber(min:number, max:number) {
  let error = "";

  if (min == undefined || max == undefined || min == null || max == null) {
    error = "Min and max values must be defined";
  } else if (min > max) {
    error = "Min must be lower than max";
  } else if (min == max) {
    error = "Min must not be equal to max";
  } 

  if (error == "") {
    return await (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  } else {
    console.log(error);
    return error;
  }
}