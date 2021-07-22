const HttpResponse = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
};

HttpResponse.prototype.json = function () {
  return JSON.parse(this.body);
};

const HttpError = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
};

HttpError.prototype.toString = function () {
  const json = JSON.parse(this.body);
  return (
    `[${this.status}] Error: ${json.error}` ||
    json.errors.map((e) => e.message).join(", ")
  );
};

const httpRequest = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      resolve(new HttpResponse(xhr));
    };

    xhr.onerror = () => {
      reject(new HttpError(xhr));
    };
  });
};

export default httpRequest;
