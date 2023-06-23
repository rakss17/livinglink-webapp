import React, { useState, useEffect } from "react";
import "./dashboardL.css";
import Properties from "../../../components/properties/properties";
import Modal from "react-modal";
import InputField from "../../../components/inputfield/inputfield";
// import {
//   setPropertyName,
//   setStreet,
//   setBarangay,
//   setCity,
//   setProvince,
//   setCountry,
//   setNumberOfRooms,
// } from "../../../components/properties/propertiesSlice";
import { useDispatch } from "react-redux";
import ButtonModal from "../../../components/buttons/buttonmodal";
import {
  PostPropertyDataAPI,
  getUserIdByUsernameAPI,
  GetUsernameAPI,
  PostAddressDataAPI,
  getAddressIdAPI,
  getBarangayAPI,
} from "../../../components/api/api";
import LoadingModal from "../../../components/loading modal/loading";

const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export default function DashboardProperties(props) {
  const [error, setError] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState({
    property_name: "",
    number_of_rooms: "",
  });
  const [addresses, setAddresses] = useState({
    street: "",
    barangay: "",
    city: "",
    province: "",
    country: "",
    zip_code: "",
  });
  const handleKeyDown = (event) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };
  const dispatch = useDispatch();
  const handleCreate = () => {
    setOpenCreate(true);
  };
  const handleCancelClick = () => {
    setOpenCreate(false);
    setError("");
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    GetUsernameAPI(token, setUsername);
  }, []);

  const handleCreateAdd = () => {
    if (!isValidObjField(properties) || !isValidObjField(addresses)) {
      setError("Required all fields!");
    } else {
      setIsLoading(true);
      PostAddressDataAPI(addresses)
        .then((response) => {
          getUserIdByUsernameAPI(token, username)
            .then((userId) => {
              getAddressIdAPI(
                token,
                addresses.street,
                addresses.barangay,
                addresses.city,
                addresses.province,
                addresses.country,
                addresses.zip_code
              )
                .then((addressId) => {
                  console.log(addressId);
                  const updatedProperties = {
                    ...properties,
                    owner: String(userId),
                    address_id: addressId,
                  };

                  console.log(updatedProperties);
                  PostPropertyDataAPI(updatedProperties).then(() => {
                    setOpenCreate(false);
                    setIsLoading(false);
                  });
                })
                .catch((error) => {});
            })
            .catch((error) => {
              setError("Invalid User!");
              setIsLoading(false);
            });
        })
        .catch((error) => {
          setError("Invalid Address!");
          setIsLoading(false);
        });
    }

    // dispatch(setPropertyName(properties.property_name));
    // dispatch(setStreet(properties.street));
    // dispatch(setBarangay(properties.barangay));
    // dispatch(setCity(properties.city));
    // dispatch(setProvince(properties.province));
    // dispatch(setCountry(properties.country));
    // dispatch(setNumberOfRooms(properties.number_of_rooms));
  };

  return (
    <div className="containerL">
      {/* <AnalyticsGraph /> */}

      <div className={`contentL ${props.isOpen ? "open" : ""}`}>
        <div className="roww">
          <h1>Dashboard</h1>
          <button className="createproperty" onClick={handleCreate}>
            Create Property
          </button>
        </div>

        <Properties />
      </div>

      <Modal
        className="modalcreate"
        isOpen={openCreate}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <LoadingModal
          isOpen={isLoading}
          textcontent="Creating property and rooms...."
        />
        {error ? <p className="errortext">{error}</p> : null}
        <h3>Enter Property Name:</h3>

        <InputField
          value={properties.property_name}
          placeholder="Property Name"
          adjustWidth={true}
          onInput={(event) => {
            const inputValue = event.target.value;
            const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
              match.toUpperCase()
            );
            event.target.value = capitalizedValue;
          }}
          onChange={(event) => {
            setProperties({
              ...properties,
              property_name: event.target.value,
            });
          }}
        />

        <h3>Enter Address: </h3>
        <div className="inputfieldcontainer">
          <InputField
            value={addresses.street}
            placeholder="Street"
            onInput={(event) => {
              const inputValue = event.target.value;
              const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                match.toUpperCase()
              );
              event.target.value = capitalizedValue;
            }}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                street: event.target.value,
              });
            }}
          />
          <InputField
            value={addresses.barangay}
            placeholder="Barangay"
            onInput={(event) => {
              const inputValue = event.target.value;
              const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                match.toUpperCase()
              );
              event.target.value = capitalizedValue;
            }}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                barangay: event.target.value,
              });
            }}
          />
          <InputField
            value={addresses.city}
            placeholder="City"
            onInput={(event) => {
              const inputValue = event.target.value;
              const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                match.toUpperCase()
              );
              event.target.value = capitalizedValue;
            }}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                city: event.target.value,
              });
            }}
          />
        </div>
        <div className="inputfieldcontainer">
          <InputField
            value={addresses.province}
            placeholder="Province"
            onInput={(event) => {
              const inputValue = event.target.value;
              const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                match.toUpperCase()
              );
              event.target.value = capitalizedValue;
            }}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                province: event.target.value,
              });
            }}
          />
          <InputField
            value={addresses.country}
            placeholder="Country"
            onInput={(event) => {
              const inputValue = event.target.value;
              const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                match.toUpperCase()
              );
              event.target.value = capitalizedValue;
            }}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                country: event.target.value,
              });
            }}
          />
          <InputField
            type="number"
            value={addresses.zip_code}
            placeholder="Zip Code"
            onKeyDown={handleKeyDown}
            onChange={(event) => {
              setAddresses({
                ...addresses,
                zip_code: event.target.value,
              });
            }}
          />
        </div>
        <h3>Enter Number of Rooms: </h3>
        <InputField
          type="number"
          value={properties.number_of_rooms}
          onKeyDown={handleKeyDown}
          placeholder="Number of Rooms"
          onChange={(event) => {
            setProperties({
              ...properties,
              number_of_rooms: event.target.value,
            });
          }}
        />

        <div className="buttonss">
          <ButtonModal onClick={handleCancelClick} text="Cancel" />
          <ButtonModal onClick={handleCreateAdd} text="Create" />
        </div>
      </Modal>
    </div>
  );
}
