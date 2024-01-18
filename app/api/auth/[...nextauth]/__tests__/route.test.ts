import { GET, POST } from "../route";

jest.mock("../route", () => ({
  GET: jest.fn(),
  POST: jest.fn(),
}));

describe("route module", () => {
  describe("GET", () => {
    it("should call GET function", () => {
      GET();
      expect(GET).toHaveBeenCalled();
    });
  });

  describe("POST", () => {
    it("should call POST function", () => {
      POST();
      expect(POST).toHaveBeenCalled();
    });
  });
});
