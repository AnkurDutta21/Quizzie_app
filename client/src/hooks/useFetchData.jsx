import { useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem("Token");
    if (token) {
      headers["Authorization"] = token;
    }
    return headers;
  };

  const getApiData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const postApiData = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, data, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteApiData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      localStorage.removeItem('Token')
      setLoading(false);
    }
  };

  return {
    getApiData,
    postApiData,
    deleteApiData,
    loading,
    error,
  };
};

export default useFetchData;
