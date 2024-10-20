/// <reference types="Cypress" /> 

const dataJson = require("../../fixtures/createuser.json");

const accessToken = "197422cb95ad3d6d2735999d4c0e01c52d9eedcb18cceb83da0902354cbb0508";
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

// Function to update user details
const updateUser = (userId, updatedName) => {
  return cy.request({
    method: "PUT",
    url: `${webURL}/${userId}`,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: {
      name: updatedName,
    },
  });
};

// Function to verify user details after creation
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

// Function to verify updated user details
const verifyUpdatedUserDetails = (response, userId, updatedName) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.include({
    id: userId,
    name: updatedName,
  });
};

describe("Post & Fetch User Using API Request", () => {
  it("POST, Update & Verify User All Details (Name, Gender, Email, Status)", () => {
    const randomEmail = generateRandomEmail();

    // Create user
    createUser(randomEmail).then((res) => {
      const userId = verifyUserDetails(res, randomEmail);
      cy.log("User ID: " + userId);

      // Fetch user details
      fetchUserDetails(userId).then((res) => {
        verifyFetchedUserDetails(res, userId, randomEmail);

        // Step to update user
        const updatedName = "OBAID SAJJAD"; // The new name to be set
        updateUser(userId, updatedName).then((updateRes) => {
          expect(updateRes.status).to.eq(200); // Verify update was successful

          // Fetch updated user details
          fetchUserDetails(userId).then((fetchUpdatedRes) => {
            verifyUpdatedUserDetails(fetchUpdatedRes, userId, updatedName);
          });
        });
      });
    });
  });
});
