export default {
  invalidBrandId: ["643b117fbf61a969820eb7c2", "643fc976bf61a969820eb7boo"],
  unavailableBrandId: ["643b117fbf61a969820eb7cc"],
};

export const generateBrandData = () => ({
  name: "Test Brand" + Math.floor(Math.random() * 100000),
  description: "Test Brand Description",
});

export const emptyBrandData = [
  {
    name: "",
    description: "Test Brand Description",
  },
];

export const minimumCharacterBrandData = [
  {
    name: "a",
    description: "Test Brand Description",
  },
];

export const longStringBrandData = [
  {
    name: "This is a string that is definitely over thirty characters long.",
  },
];

export const invalidBrandData = [
  {
    name: "invalid brand",
  },
];
