/// <reference types="Cypress" />

const accessToken = "a6757317ed7df6a11e989e33096d88b3b60ff55b4b4a5f90d402b1dbcd12db91";
const webURL = "https://gorest.co.in/public/v2/users";

// Function to fetch users
const fetchUsers = () => {
  return cy.request({
    method: "GET",
    url: webURL,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

// Function to verify user details
const verifyUserDetails = (response) => {
  expect(response.status).to.eq(200);
  expect(response.body[0].name).to.eq("Trilokanath Gandhi VM");
  expect(response.body[0].email).to.eq("trilokanath_gandhi_vm@schultz.example");
  expect(response.body[0].gender).to.eq("male");
  expect(response.body[0].status).to.eq("active");
};

describe("GET User Using API Request", () => {
  it("Verify User 01 All Details (ID, Name, Email, Gender, Status)", () => {
    fetchUsers().then((res) => {
      cy.log(JSON.stringify(res));
      verifyUserDetails(res);
    });
  });
});
