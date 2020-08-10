import { QueryParam } from "../interface/queryParam";
import axios from "axios";

export const searchArticle = async (queryParam: QueryParam) => {
  const url = '/api/v1/search/searchPost'

  try {
    await axios.post(url, queryParam)
      .then((res) => {
        console.log(res.data)
      })
  } catch (error) {
    console.error(error)
  }
}