import { UnauthorizedError } from "./error.ts";

export async function get(path: string, idToken: string): Promise<Response> {
  console.info("[lib/api][get] call", path);
  return callApi("get", path, idToken);
}

export async function post(
  path: string,
  idToken: string,
  body?: string,
): Promise<Response> {
  console.info("[lib/api][post] call", path, body);
  return callApi("post", path, idToken, body);
}

export async function put(
  path: string,
  idToken: string,
  body?: string,
): Promise<Response> {
  console.info("[lib/api][put] call", path, body);
  return callApi("put", path, idToken, body);
}

export async function del(
  path: string,
  idToken: string,
  body?: string,
): Promise<Response> {
  console.info("[lib/api][del] call", path, body);
  return callApi("delete", path, idToken, body);
}

export async function callApi(
  method: string,
  path: string,
  idToken: string,
  body?: string,
): Promise<Response> {
  console.info("[lib/api][callApi] call");
  console.info("[lib/api][callApi] method", method);
  console.info("[lib/api][callApi] path", path);
  console.info("[lib/api][callApi] idToken", idToken);
  console.info("[lib/api][callApi] body", body);

  if (!idToken) {
    console.error("[lib/api][callApi] no idToken");
    throw UnauthorizedError;
  }

  const init: RequestInit = {
    method: method,
    headers: new Headers({
      "Content-Type": "application/json",
      "id-token": String(idToken),
    }),
    cache: "no-store",
  };
  if (method !== "get" && method !== "head") {
    init.body = body;
  }
  console.info("[lib/api][callApi] got init:", init);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.info("[lib/api][callApi] got baseUrl:", baseUrl);

  const url = baseUrl + "/api" + path;
  console.info("[lib/api][callApi] got url:", url);

  const response = await fetch(url, init);
  console.info("[lib/api][callApi] got response:", response);
  if (response.ok) {
    return response;
  }
  switch (response.status) {
    case 400:
      return BadRequest;
    case 401:
      return Unauthorized;
    case 403:
      return Forbidden;
    case 500:
      return InternalServerError;
    case 503:
      return ServiceUnavailableError;
    default:
      return UnexpectedError;
  }
}

export const createResponseInit = (status: number) => {
  return {
    status: status,
    headers: { "content-type": "application/json" },
    // eslint-disable-next-line no-undef
  } as ResponseInit;
};

export const createBadRequest = (reason: string) => {
  return new Response(
    JSON.stringify({ success: false, message: "BadRequest", reason: reason }),
    createResponseInit(400),
  );
};

export const BadRequest = new Response(
  JSON.stringify({ success: false, message: "BadRequest" }),
  createResponseInit(400),
);

export const Unauthorized = new Response(
  JSON.stringify({ success: false, message: "Unauthorized" }),
  createResponseInit(401),
);

export const Forbidden = new Response(
  JSON.stringify({ success: false, message: "Forbidden" }),
  createResponseInit(403),
);

export const InternalServerError = new Response(
  JSON.stringify({ success: false, message: "Internal Server Error" }),
  createResponseInit(500),
);

export const ServiceUnavailableError = new Response(
  JSON.stringify({ success: false, message: "Service Unavailable Error" }),
  createResponseInit(503),
);

export const UnexpectedError = new Response(
  JSON.stringify({ success: false, message: "Unexpected Error" }),
  createResponseInit(500),
);
