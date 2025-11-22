import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import AddListing from "../components/AddListing";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const { dispatch, state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleAdd = (apt) => {
    const newListing = {
      id: crypto.randomUUID(),
      ...apt,
    };

    dispatch({
      type: "SET_LISTINGS",
      payload: [...state.listings, newListing],
    });

    navigate("/");
  };

  return <AddListing onSubmit={handleAdd} />;
}
