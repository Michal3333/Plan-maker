import * as Validators from './validators'
import {describe, expect, test, it} from '@jest/globals'
import { validationResult } from './validators';

describe("email validator", () => {
   const validator = Validators.validateEmail;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Email"
   }
   it('valid email com', () => {
      expect(validator("test@gmail.com")).toStrictEqual(valid)
   })
   it('no @', () => {
      expect(validator("testgmail.com")).toStrictEqual(inValid)
   })
   it('invalid end', () => {
      expect(validator("test@gmail.c")).toStrictEqual(inValid)
   })
   
   it('no end', () => {
      expect(validator("test@gmail")).toStrictEqual(inValid)
   })
   
   it('no front', () => {
      expect(validator("@gmail.com")).toStrictEqual(inValid)
   })
   
   it('valid email pl', () => {
      expect(validator("test@gtest.pl")).toStrictEqual(valid)
   })
})

test("password validator", () => {
   const validator = Validators.validatePassword;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Password"
   }
   expect(validator("111111")).toStrictEqual(valid)
   expect(validator("111111111111111")).toStrictEqual(valid)
   expect(validator("1111")).toStrictEqual(inValid)
})

test("project name validator", () => {
   const validator = Validators.validateProjectName;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Project Name"
   }
   expect(validator("test")).toStrictEqual(valid)
   expect(validator("")).toStrictEqual(inValid)
   expect(validator("t")).toStrictEqual(valid)
})

test("weekly limit validator", () => {
   const validator = Validators.validateWeeklyLimit;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Weekly Limit"
   }
   expect(validator("test")).toStrictEqual(inValid)
   expect(validator("0")).toStrictEqual(inValid)
   expect(validator("-1")).toStrictEqual(inValid)
   expect(validator("1")).toStrictEqual(valid)
})

test("time to add validator", () => {
   const validator = Validators.validateTimeToAdd;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Time"
   }
   expect(validator("test")).toStrictEqual(inValid)
   expect(validator("0")).toStrictEqual(inValid)
   expect(validator("-1")).toStrictEqual(inValid)
   expect(validator("1")).toStrictEqual(valid)
})

test("task name validator", () => {
   const validator = Validators.validateTaskName;
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Invalid Task Name"
   }
   expect(validator("test")).toStrictEqual(valid)
   expect(validator("")).toStrictEqual(inValid)
   expect(validator("t")).toStrictEqual(valid)
})

test("confrim password creator validator", () => {
   const validator = Validators.createConfirmPasswordValidator("test");
   const valid : validationResult = {
      state : true,
      error : ""
   }
   const inValid : validationResult = {
      state : false,
      error: "Passwords are different"
   }
   expect(validator("test")).toStrictEqual(valid)
   expect(validator("test1")).toStrictEqual(inValid)
})