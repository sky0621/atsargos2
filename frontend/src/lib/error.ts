export const toError = (response: Response) => {
  switch (response.status) {
    case 400:
      return BadRequestError;
    case 401:
      return UnauthorizedError;
    case 403:
      return ForbiddenError;
    case 500:
      return InternalServerError;
    case 503:
      return ServiceUnavailableError;
    default:
      return UnexpectedError;
  }
};

export const BadRequestError = new Error("BadRequest");

export const UnauthorizedError = new Error("Unauthorized");

export const ForbiddenError = new Error("Forbidden");

export const InternalServerError = new Error("Internal Server Error");

export const ServiceUnavailableError = new Error("Service Unavailable Error");

export const UnexpectedError = new Error("Unexpected Error");
