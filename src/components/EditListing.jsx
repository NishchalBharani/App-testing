import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalState";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  alpha,
  CircularProgress,
} from "@mui/material";
import StarRating from "../components/StarRating";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useGlobal();

  const listing = state.listings.find((apt) => apt.id === Number(id));

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setLocation(listing.location);
      setPrice(listing.price);
      setRating(listing.rating || 0);
    }
  }, [listing]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "location") setLocation(value);
    if (name === "price") setPrice(value);
  };

  const handleUpdate = () => {
    if (!title || !location || !price) {
      alert("All fields are required!");
      return;
    }

    const updatedListing = {
      ...listing,
      title,
      location,
      price: Number(price),
      rating,
    };

    const updatedList = state.listings.map((apt) =>
      apt.id === listing.id ? updatedListing : apt
    );

    dispatch({ type: "SET_LISTINGS", payload: updatedList });
    navigate("/");
  };

  // Loading state (if listing not found yet)
  if (!listing) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Paper sx={{ p: 6, borderRadius: "24px", textAlign: "center" }}>
          <CircularProgress sx={{ mb: 3 }} />
          <Typography color="text.secondary">Loading listing...</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 540,
          p: { xs: 4, sm: 6 },
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Back button + Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: "#64748b", textTransform: "none", fontWeight: 500 }}
          >
            Back
          </Button>
        </Box>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 1,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            background: "linear-gradient(90deg, #1e293b, #475569)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Edit Listing
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 5 }}
        >
          Refine the details of your beautiful space
        </Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={title}
          onChange={handleInput}
          sx={{ mb: 3 }}
          InputProps={{
            sx: {
              borderRadius: "16px",
              background: alpha("#f8fafc", 0.6),
              "&:hover": { background: alpha("#f1f5f9", 0.8) },
            },
          }}
        />

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={location}
          onChange={handleInput}
          sx={{ mb: 3 }}
          InputProps={{
            sx: {
              borderRadius: "16px",
              background: alpha("#f8fafc", 0.6),
            },
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Price per night ($)"
          name="price"
          value={price}
          onChange={handleInput}
          sx={{ mb: 4 }}
          InputProps={{
            sx: {
              borderRadius: "16px",
              background: alpha("#f8fafc", 0.6),
            },
          }}
        />

        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: "#475569" }}>
            Rating
          </Typography>
          <StarRating value={rating} onChange={setRating} />
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleUpdate}
          sx={{
            py: 2,
            borderRadius: "18px",
            background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: "0 10px 20px rgba(30, 41, 59, 0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 15px 30px rgba(30, 41, 59, 0.35)",
            },
          }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}