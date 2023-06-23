import axios from "axios";

const api = axios.create({
  baseURL: "https://livinglinksoftware.pythonanywhere.com/",
});

export function SigninAPI(userInfo, navigate, setLoading, setModalErrorIsOpen) {
  api
    .post("api/v1/accounts/token/login", userInfo)
    .then((response) => {
      localStorage.setItem("token", response.data.auth_token);
      api
        .get("api/v1/accounts/user_type/", {
          headers: {
            Authorization: `Token ${response.data.auth_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.user_type === "is_landlord") {
            navigate("/DashboardL");
            setLoading(false);
          } else if (res.data.user_type === "is_tenant") {
            api
              .get("/api/v1/property/room/check-registration/", {
                headers: {
                  Authorization: `Token ${response.data.auth_token}`,
                  "Content-Type": "application/json",
                },
              })
              .then((registrationRes) => {
                if (registrationRes.data.is_registered) {
                  navigate("/DashboardT");
                } else {
                  navigate("/CheckIn");
                }
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                setModalErrorIsOpen(true);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          setModalErrorIsOpen(true);
        });
    })
    .catch((error) => {
      setLoading(false);
      setModalErrorIsOpen(true);
    });
}

export function SignupAPI(
  userInfo,
  setLoading,
  setModalIsOpen,
  setModalErrorIsOpen
) {
  api
    .post("api/v1/accounts/users/", userInfo, {})
    .then((response) => {
      setModalIsOpen(true);
      setLoading(false);
    })
    .catch((error) => {
      setModalErrorIsOpen(true);
      setLoading(false);
      console.log(error);
    });
}
export function NavigationProhibit(token, navigate) {
  api
    .get("api/v1/accounts/user_type/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (token) {
        if (res.data.user_type === "is_landlord") {
          navigate("/DashboardL");
        } else if (res.data.user_type === "is_tenant") {
          navigate("/DashboardT");
        }
      }
    })
    .catch((error) => {});
}
export function LandlordDasboardAPI(token, setError, setLoading, navigate) {
  api
    .get("api/v1/accounts/user_type/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.user_type === "is_landlord") {
        try {
          const response = api.get("api/v1/accounts/landlord/dashboard/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      } else {
        navigate("/DashboardT");
      }
    })
    .catch((error) => {});
}

export function TenantDashboardAPI(token, setError, setLoading, navigate) {
  api
    .get("api/v1/accounts/user_type/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.user_type === "is_tenant") {
        try {
          const response = api.get("api/v1/accounts/tenant/dashboard/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      } else {
        navigate("/DashboardL");
      }
    })
    .catch((error) => {});
}

export function LogoutAPI(setLoading) {
  api
    .post("api/v1/accounts/logout_view/")
    .then((response) => {
      setLoading(true);
      localStorage.removeItem("token");
      window.location.href = "/livinglink-webapp#/Signin";
      window.history.pushState(null, null, "/livinglink-webapp#/Signin");
    })
    .catch((error) => console.log(error.response));
}

export function PostAddressDataAPI(addresses) {
  return new Promise((resolve, reject) => {
    api
      .post("api/v1/property/addresses/", addresses)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error.response);
        reject(error);
      });
  });
}
export function PostPropertyDataAPI(updatedProperties) {
  api
    .post("api/v1/property/properties/", updatedProperties)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error(error.response);
    });
}
export function getUserIdByUsernameAPI(token, username) {
  return new Promise((resolve, reject) => {
    api
      .get(`api/v1/property/get-user-id/${username}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data.user_id);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function GetUsernameAPI(token, setUsername) {
  api
    .get("api/v1/accounts/get_username/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setUsername(response.data.username);
    })
    .catch((error) => console.log(error));
}

export function getAddressIdAPI(
  token,
  street,
  barangay,
  city,
  province,
  country,
  zip_code
) {
  return new Promise((resolve, reject) => {
    api
      .get(
        `api/v1/property/addresses/get_address_id_by_info_add/${street}/${barangay}/${city}/${province}/${country}/${zip_code}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data.address_id);
      })
      .catch((error) => {
        console.error(error.response);
        reject(error);
      });
  });
}

export const getPropertyDetailsAPI = async (propertyIds, token) => {
  try {
    const response = await api.get(
      `api/v1/property/properties/property-details/`,
      {
        params: {
          propertyId: propertyIds,
        },
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw error;
  }
};

export function getPropertyAddressAPI(token, propertyId) {
  return api.get(`api/v1/property/properties/${propertyId}/address/`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function getPropertyIdAPI(token, setPropertyId) {
  return new Promise((resolve, reject) => {
    api
      .get("api/v1/property/properties/get_property_id/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPropertyId(response.data.propertyId);
        resolve(response.data.propertyId);
      })
      .catch((error) => {
        console.log(error.response);
        reject(error.response);
      });
  });
}

export const deletePropertyAPI = async (propertyId, token, setProperties) => {
  try {
    const response = await api.delete(
      `api/v1/property/properties/delete/${propertyId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyId)
    );

    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

export const deleteRoomAPI = async (roomId, token, setRooms) => {
  try {
    const response = await api.delete(
      `api/v1/property/room/delete/${roomId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setRooms((prevProperties) =>
      prevProperties.filter((room) => room.id !== roomId)
    );

    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

export const getPropertyRoomsAPI = async (propertyId) => {
  try {
    const response = await api.get(
      `/api/v1/property/properties/${propertyId}/rooms/`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving property rooms:", error);
    throw error;
  }
};

export const registerRoom = async (
  checkindetails,
  navigate,
  setIsLoading,
  setModalErrorIsOpen
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/api/v1/property/room/register-room/",

      checkindetails,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    setIsLoading(false);
    navigate("/DashboardT");

    // Handle success message
  } catch (error) {
    setIsLoading(false);
    setModalErrorIsOpen(true);
    console.error(error.response.data.error);
    // Handle error message
  }
};

export const getTenantId = async (setTenantId) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };

    const response = await api.get("/api/v1/property/get-tenant-id/", {
      headers,
    });

    setTenantId(response.data.tenant_id);
    // console.log(tenantId);
    // Handle tenant ID
  } catch (error) {
    console.error(error.response.data.error);
    // Handle error message
  }
};

export const getPropertyInfo = async () => {
  try {
    const response = await api.get(
      "/api/v1/property/properties/property-info/"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch property details");
  }
};

export const getTenantName = async (property_name, room_number) => {
  try {
    const response = await api.get(
      `/api/v1/property/properties/${property_name}/room/${room_number}/tenant-name/`
    );
    return response.data.tenant_name;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

export const fetchTenantAndRoomData = async (token, roomIds, setTenants) => {
  try {
    const promises = roomIds.map(async (roomId) => {
      const response = await api.get(`/api/v1/property/room/${roomId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { room_number, tenant_name } = response.data;
      return { room_number, tenant_name };
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter(
      (result) => result.tenant_name !== null
    );

    setTenants(filteredResults);
  } catch (error) {
    console.log(error.response);
  }
};

export const getRoomIdAPI = async (token) => {
  try {
    const response = await api.get(`/api/v1/property/room/get_room_id/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.room_ids;
  } catch (error) {
    console.error("Error fetching room ID:", error);
    throw error;
  }
};
