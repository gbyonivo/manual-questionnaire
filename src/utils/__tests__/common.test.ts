import { createQueryString } from "../common";

describe("createQueryString", () => {
  test("should create a query string", () => {
    const queryString = createQueryString({
      name: "test",
      value: "test",
      searchParams: new URLSearchParams(),
    });
    expect(queryString).toBe("test=test");
  });
});
