import { ERROR_MESSAGES, ObservableStorage } from "./observable-storage";

describe("Observable Storage Tests", () => {
  it("should throw an error if no adpater is provided", () => {
    // @ts-ignore
    const adapterNotFound = () => new ObservableStorage();
    expect(adapterNotFound).toThrow(ERROR_MESSAGES.adapterNotFound);
  });

  it("should return a valid instance when providing a valid adapter", () => {
    expect(new ObservableStorage(localStorage)).instanceOf(ObservableStorage);
  });

  it("should setItem and getItem successfully", () => {
    const ss = new ObservableStorage(sessionStorage);

    ss.setItem("test-1", "test-1");

    expect(ss.getItem("test-1")).toBe("test-1");
  });

  it("should removeItem successfully", () => {
    const ss = new ObservableStorage(sessionStorage);

    ss.setItem("vitest", "vitest");

    expect(ss.getItem("vitest")).toBe("vitest");

    ss.removeItem("vitest");

    expect(ss.getItem("vitest")).toBe(null);
  });

  it("should clear storage successfully", () => {
    const ss = new ObservableStorage(sessionStorage);

    ss.setItem("vitest", "vitest");
    ss.setItem("jest", "jest");

    ss.clear();

    expect(ss.getItem("vitest")).toBe(null);
    expect(ss.getItem("jest")).toBe(null);
  });

  it("should return value using storage key index", () => {
    const ss = new ObservableStorage(sessionStorage);

    ss.setItem("vitest", "vitest");
    ss.setItem("jest", "jest");

    expect(ss.key(0)).toBe("vitest");
    expect(ss.key(1)).toBe("jest");
    expect(ss.key(2)).toBe(null);
  });

  it("should call callback after susbscribe to storage change", () => {
    const ss = new ObservableStorage(sessionStorage);

    const mock = vi.fn();

    ss.subscribe("vitest", mock);

    ss.setItem("vitest", "vitest");
    ss.setItem("vitest", "vitest-2");
    ss.setItem("vitest", "vitest-3");

    expect(mock).toHaveBeenCalledTimes(3);
  });

  it("should not call callback after unsubscribe to storage", () => {
    const ss = new ObservableStorage(sessionStorage);

    const mock = vi.fn();

    ss.subscribe("vitest", mock);

    ss.setItem("vitest", "vitest");

    expect(mock).toHaveBeenCalled();

    ss.unsubscribe("vitest");

    ss.setItem("vitest", "vitest-2");
    ss.setItem("vitest", "vitest-3");

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
