export const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send("Not found!");
  }
  next(err);
};

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send("Unauthorized!");
  }
  next(err);
};

export const forbiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(403).send("Forbidden!");
  }
  next(err);
};

export const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err);
  }
  next(err);
};

export const catchAllHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(err.httpStatusCode || 500).send("Generic Server Error");
  }
};
