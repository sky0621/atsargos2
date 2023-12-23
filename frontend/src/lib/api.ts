import { useCookies } from "react-cookie";
import { ID_TOKEN_COOKIE_KEY } from "./constants.ts";
import { UnauthorizedError } from "./error.ts";

export async function get(path: string): Promise<Response> {
  return callApi("get", path);
}

export async function post(path: string, body?: string): Promise<Response> {
  return callApi("post", path, body);
}

export async function callApi(
  method: string,
  path: string,
  body?: string,
): Promise<Response> {
  const [idToken] = useCookies([ID_TOKEN_COOKIE_KEY]);
  if (!idToken) {
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

  const response = await fetch("/api" + path, init);
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
