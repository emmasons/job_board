import { getCurrentSessionUser } from "../auth";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

describe("getCurrentSessionUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user if session exists", async () => {
    const session = { user: { name: "John Doe" } };
    getServerSession.mockResolvedValueOnce(session);

    const user = await getCurrentSessionUser();

    expect(getServerSession).toHaveBeenCalledTimes(1);
    expect(user).toEqual(session.user);
  });

  it("should return undefined if session does not exist", async () => {
    getServerSession.mockResolvedValueOnce(null);

    const user = await getCurrentSessionUser();

    expect(getServerSession).toHaveBeenCalledTimes(1);
    expect(user).toBeUndefined();
  });

  it("should handle sessions with incomplete user objects", async () => {
    const session = { user: { name: "John Doe" } };
    getServerSession.mockResolvedValueOnce({
      user: { name: "John Doe", email: undefined },
    });

    const user = await getCurrentSessionUser();

    expect(getServerSession).toHaveBeenCalledTimes(1);
    expect(user).toEqual({ name: "John Doe", email: undefined });
  });

  it("should throw an error when there is an issue retrieving the session", async () => {
    const errorMessage = "Failed to retrieve session";
    getServerSession.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getCurrentSessionUser()).rejects.toThrow(errorMessage);
    expect(getServerSession).toHaveBeenCalledTimes(1);
  });

  it("should return null when the session exists but the user object does not exist", async () => {
    const session = { user: null };
    getServerSession.mockResolvedValueOnce(session);

    const user = await getCurrentSessionUser();

    expect(getServerSession).toHaveBeenCalledTimes(1);
    expect(user).toBeNull();
  });
});
