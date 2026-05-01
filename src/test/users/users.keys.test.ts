import { describe, expect, it } from "vitest";

import { usersQueryKeys } from "@/lib/users";

describe("users query keys", () => {
  it("keeps stable current user keys", () => {
    expect(usersQueryKeys.all).toEqual(["users"]);
    expect(usersQueryKeys.currentUser()).toEqual(["users", "current-user"]);
    expect(usersQueryKeys.currentUserProfile()).toEqual([
      "users",
      "current-user-profile",
    ]);
  });
});
