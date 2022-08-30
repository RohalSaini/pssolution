export function showMessage() {
  console.log(" Show Message");
}

export const api = async (url, method, body, header) => {
  let response = fetch(url, method, {
    method: method,
    body: body,
    headers: header,
  });
  if (response.ok) {
    return {
      status: true,
      data: await response.json(),
    };
  } else {
    return {
      status: false,
      data: await response.json(),
    };
  }
};

