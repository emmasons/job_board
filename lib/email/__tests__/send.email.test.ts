import { mail } from "../nodemailer";
import { env } from "@/lib/env";

// This will tell jest to wait 30 seconds maximum for each test to finish
jest.setTimeout(30000); // Setting timeount globally for all tests

describe("Test sending email", () => {
  let timeoutId;

  // Set a timeout
  beforeAll(() => {
    timeoutId = setTimeout(() => {}, 30000);
  });

  afterAll(() => {
    clearTimeout(timeoutId); // Clear the timer to let Jest shut down gracefully
  });

  it("should send email using real email server successfully", async () => {
    const emailProps = {
      to_email: env.TEST_RECIPIENT, // Replace with a valid recipient email for testing
      subject: "Integration Test Email",
      message: "This is an integration test message",
    };

    const result = await mail(emailProps);

    expect(result.status).toBe(200);
    expect(result.message).toContain("Email sent successfuly.");
  });
});
