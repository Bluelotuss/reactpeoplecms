import axios from "axios";

class peopleService {
  async getAll() {
    return await axios
      .get("https://localhost:5002/api/React")
      .then((response) => {
        console.log("Api all response:", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .then(() => {
        return null;
      });
  }

  async getPerson(id) {
    return await axios
      .get("https://localhost:5002/api/React/" + id)
      .then((response) => {
        console.log("Api details response:", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  async getAllCities() {
    return await axios
      .get("https://localhost:5002/api/React/cities")
      .then((response) => {
        console.log("Api cities response:", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  async getAllCountries() {
    return await axios
      .get("https://localhost:5002/api/React/countries")
      .then((response) => {
        console.log("Api countries response:", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  async createPerson(personData) {
    console.log("personData", personData);
    var data = JSON.stringify(personData);

    var config = {
      method: "post",
      url: "https://localhost:5002/api/React",
      /* headers: {
                'Content-Type': 'application/json',
            },*/
      data: data,
    };
    console.log("config", config);
    return await axios(config)
      .then((response) => {
        console.log("Api post response", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  async deletePerson(id) {
    console.log("personId", id);
    var data = JSON.stringify(id);

    var config = {
      method: "delete",
      url: "https://localhost:5002/api/React/" + id,
      data: data,
    };
    console.log("config", config);
    return await axios(config)
      .then((response) => {
        console.log("Api delete response", response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
}

export default new peopleService();
