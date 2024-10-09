import { test, expect } from "@playwright/test";
import { ApiUrl } from "../resources/apiUrl";
import postRequest from "../resources/post-request.json";
import putRequest from "../resources/put-request.json";
import tokenRequestJson from "../resources/token-request.json";
import { StatusCode } from "../resources/statusCodes";

test.describe("Testing Public APIs", async () => {
  let bookingId = 0;

  // GET
  test("Get All Booking Ids", async ({ request }) => {
    const responseObject = await request.get(ApiUrl.BASE_URL + `/booking`);

    const response = await responseObject.json();
    console.log(response);
    expect(responseObject.ok()).toBeTruthy();
    expect(responseObject.status()).toBe(StatusCode.SUCCESS);
    expect(response).toContainEqual(expect.objectContaining({ bookingid: 10 }));
  });

  // POST
  test("Create a Booking", async ({ request }) => {
    const responseObj = await request.post(ApiUrl.BASE_URL + `/booking`, {
      data: postRequest,
    });

    const responseBody = await responseObj.json();

    bookingId = responseBody.bookingid;

    expect(responseObj.ok()).toBeTruthy();
    expect(responseBody.booking).toHaveProperty("firstname", "Shriniwas");
    expect(responseBody.booking).toHaveProperty("lastname", "Alle");
    expect(responseBody.booking.bookingdates).toHaveProperty(
      "checkin",
      "2024-10-02"
    );
    expect(responseBody.booking.bookingdates).toHaveProperty(
      "checkout",
      "2024-11-02"
    );
  });

  // PUT
  test("Update a Booking", async ({ request }) => {
    const tokenAPIResponse = await request.post(ApiUrl.BASE_URL + `/auth`, {
      data: tokenRequestJson,
    });

    const tokenResponse = await tokenAPIResponse.json();

    expect(tokenAPIResponse.ok()).toBeTruthy();
    expect(tokenAPIResponse.status()).toBe(StatusCode.SUCCESS);

    const responseObj = await request.put(
      ApiUrl.BASE_URL + `/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${tokenResponse.token}`,
        },
        data: putRequest,
      }
    );

    expect(responseObj.status()).toBe(StatusCode.SUCCESS);
  });

  // DELETE
  test("Delete a Booking", async ({ request }) => {
    const tokenAPIResponse = await request.post(ApiUrl.BASE_URL + `/auth`, {
      data: tokenRequestJson,
    });

    const tokenResponse = await tokenAPIResponse.json();

    expect(tokenAPIResponse.ok()).toBeTruthy();
    expect(tokenAPIResponse.status()).toBe(StatusCode.SUCCESS);

    const responseObj = await request.delete(
      ApiUrl.BASE_URL + `/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${tokenResponse.token}`,
        },
      }
    );

    expect(responseObj.status()).toBe(StatusCode.CREATED);
  });
});
