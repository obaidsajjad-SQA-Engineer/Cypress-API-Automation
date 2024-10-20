/// <reference types="Cypress" />

const dataJson = require("../../fixtures/createuser.json");

const accessToken = "b9d3fde85a794d61ac62c0ef48606dd0b93d142f4ae103fb2df045d91ff668c0";
const webURL = "https://gorest.co.in/public/v2/users";

// Function to generate a random email
const generateRandomEmail = () => {
  const randomStr = Math.random().toString(36).substring(7);
  return `obaidsajjad.sqa${randomStr}@gmail.com`;
};

// Function to create a user
const createUser = (email) => {
  return cy.request({
    method: "POST",
    url: webURL,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: {
      name: dataJson.name,
      gender: dataJson.gender,
      status: dataJson.status,
      email: email,
    },
  });
};

// Function to fetch user details by ID
const fetchUserDetails = (userId) => {
  return cy.request({
    method: "GET",
    url: `${webURL}/${userId}`,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

// Function to verify user details
const verifyUserDetails = (response, email) => {
  expect(response.status).to.eq(201);
  expect(response.body).to.include({
    name: dataJson.name,
    gender: dataJson.gender,
    status: dataJson.status,
    email: email,
  });
  return response.body.id; // return userId
};

// Function to verify fetched user details
const verifyFetchedUserDetails = (response, userId, email) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.include({
    id: userId,
    name: dataJson.name,
    gender: dataJson.gender,
    status: dataJson.status,
    email: email,
  });
};

describe("Post & Fetch User Using API Request", () => {
  it("POST & Verify User All Details (Name, Gender, Email, Status)", () => {
    const randomEmail = generateRandomEmail();

    // Create user
    createUser(randomEmail).then((res) => {
      const userId = verifyUserDetails(res, randomEmail);
      cy.log("User ID: " + userId);

      // Fetch user details
      fetchUserDetails(userId).then((res) => {
        verifyFetchedUserDetails(res, userId, randomEmail);
      });
    });
  });
});
