import { describe, it, expect } from "vitest";
import { User } from "./index";

describe("types", () => {
  it("defines User", () => {
    const u: User = { id: "1", email: "a@b.c" };
    expect(u.email).toBe("a@b.c");
  });
});
