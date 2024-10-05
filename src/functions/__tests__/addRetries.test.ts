import { addRetries } from "../addRetries"; 

describe("Add retries", () => {
  test("should not retry if first attempt is successful", async () => {
    const mockCallback = jest.fn().mockResolvedValue("success");
    const wrappedFunction = addRetries(mockCallback);
  
    const result = await wrappedFunction();
  
    expect(result).toBe("success");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  
  test("should retry a total of three times if first two fails", async () => {
    const mockCallback = jest.fn()
      .mockRejectedValueOnce(new Error("first failure"))
      .mockRejectedValueOnce(new Error("second failure"))
      .mockResolvedValue("success on third");
    const wrappedFunction = addRetries(mockCallback);
  
    const result = await wrappedFunction();
  
    expect(result).toBe("success on third");
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  test("should throw an error after failing three times", async () => {
    const error = new Error("failed after three retries");
    const mockCallback = jest.fn().mockRejectedValue(error);
    const wrappedFunction = addRetries(mockCallback);

    await expect(wrappedFunction()).rejects.toThrow("failed after three retries");
    expect(mockCallback).toHaveBeenCalledTimes(3); 
  });

  test("should call the callback with arguments and resolve the result", async () => {
    const sumCallback = (a: number, b: number) => Promise.resolve(a + b);
    const wrappedFunction = addRetries(sumCallback);

    const result = await wrappedFunction(1, 2);

    expect(result).toBe(3);
  });
})