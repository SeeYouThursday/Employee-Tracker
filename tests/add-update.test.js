const AddThis = require("../add-update");
describe("Add", () => {
  test("constructor should set the correct values", () => {
    const input = 5;
    const name = "new-department";
    const message = "Hello";
    const whenThis = true;

    const add = new AddThis(input, name, message, whenThis);
    const result = {
      input: 5,
      name: "new-department",
      message: "Hello",
      when: true,
    };
    expect(add).toEqual(result);
  });
});
