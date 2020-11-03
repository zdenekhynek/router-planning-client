export const getUrl = (region, dates, types) => {
  const baseUrl = `${process.env.REACT_APP_JOURNEY_API_HOST}/api/v1`;
  return `${baseUrl}/journeys`;
};

export const parseResult = ({ success, data }) => {
  if (success) {
    return data;
  }

  console.error(`Didn't find the journes: ${data}`);

  return [];
};

export default async (region, dates, types) => {
  const url = getUrl();

  try {
    console.log(`Requesting ${url}`);
    const payload = { region, dates, types };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const result = await fetch(url, options).then((resp) => resp.json());
    return parseResult(result);
  } catch (err) {
    console.error(err);
  }
};
