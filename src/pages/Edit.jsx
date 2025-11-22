import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import EditListing from "../components/EditListing";

export default function Edit() {
  const { id } = useParams();
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const listing = state.listings.find((apt) => apt.id === id);

  const handleEdit = (updated) => {
    const updatedList = state.listings.map((apt) =>
      apt.id === id ? { ...apt, ...updated } : apt
    );

    dispatch({
      type: "SET_LISTINGS",
      payload: updatedList,
    });

    navigate("/");
  };

  return <EditListing apartment={listing} onSubmit={handleEdit} />;
}
