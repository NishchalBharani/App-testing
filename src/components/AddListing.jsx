import { useState } from "react";
import { useGlobal } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  alpha,
} from "@mui/material";
import StarRating from "../components/StarRating";

export default function AddListing() {
  const { state, dispatch } = useGlobal();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!title || !location || !price) {
      alert("All fields are required!");
      return;
    }
    const newListing = {
      id: Date.now(),
      title,
      location,
      price: Number(price),
      rating,
    };
    dispatch({
      type: "SET_LISTINGS",
      payload: [...state.listings, newListing],
    });
    navigate("/");
  };

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
          maxWidth: 520,
          p: { xs: 4, sm: 6 },
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Elegant Header */}
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
          Create New Listing
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 5 }}
        >
          Share your beautiful space with the world
        </Typography>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            sx: {
              borderRadius: "16px",
              background: alpha("#f8fafc", 0.6),
              "&:hover": { background: alpha("#f1f5f9", 0.8) },
            },
          }}
          InputLabelProps={{ sx: { fontWeight: 500 } }}
        />

        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          type="number"
          label="Price per night ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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

        {/* Premium Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
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
          Publish Listing
        </Button>
      </Paper>
    </Box>
  );
}