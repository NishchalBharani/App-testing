// pages/Home.jsx
import { useMemo } from "react";
import { useGlobal } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  alpha,
  InputBase,
} from "@mui/material";
import StarRating from "../components/StarRating";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const { state, dispatch } = useGlobal();

  // Search + Sort Logic (unchanged, just cleaned up)
  const finalListings = useMemo(() => {
    const filteredListings = state.listings.filter((apt) => {
      const q = state.searchQuery.toLowerCase();
      return apt.title.toLowerCase().includes(q) || apt.location.toLowerCase().includes(q);
    });

    let sortedListings = [...filteredListings];
    if (state.selectedSort === "asc") sortedListings.sort((a, b) => a.price - b.price);
    else if (state.selectedSort === "desc") sortedListings.sort((a, b) => b.price - a.price);
    else if (state.selectedSort === "rating_desc") sortedListings.sort((a, b) => b.rating - a.rating);
    else if (state.selectedSort === "rating_asc") sortedListings.sort((a, b) => a.rating - b.rating);

    return sortedListings;
  }, [state.listings, state.searchQuery, state.selectedSort]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    dispatch({
      type: "SET_LISTINGS",
      payload: state.listings.filter((apt) => apt.id !== id),
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: 8,
        px: { xs: 3, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Hero Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              background: "linear-gradient(90deg, #1e293b, #475569)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            Your Luxury Stays
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Curated collection of premium apartments & villas
          </Typography>
        </Box>

        {/* Search Bar + Add Button */}
        <Box sx={{ display: "flex", gap: 3, mb: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              maxWidth: 500,
            }}
          >
            <SearchIcon sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <InputBase
              placeholder="Search by title or location..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
              sx={{
                pl: 6,
                pr: 3,
                py: 1.5,
                width: "100%",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                fontSize: "1.05rem",
                transition: "all 0.3s",
                "&:focus": {
                  boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                },
              }}
            />
          </Box>

          <Button
            component={Link}
            to="/add"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "16px",
              background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              boxShadow: "0 10px 25px rgba(30,41,59,0.3)",
              "&:hover": {
                background: "#0f172a",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add New Listing
          </Button>
        </Box>

        {/* Listings Grid */}
        {finalListings.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {state.searchQuery ? "No matches found" : "No listings yet"}
            </Typography>
            <Typography color="text.secondary">
              {state.searchQuery ? "Try a different search term" : "Be the first to add a beautiful stay!"}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {finalListings.map((apt) => (
              <Grid item xs={12} sm={6} lg={4} key={apt.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.18)",
                    },
                  }}
                >
                  {/* Placeholder Image Area */}
                  <Box
                    sx={{
                      height: 220,
                      background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      fontSize: "4rem",
                      fontWeight: "bold",
                    }}
                  >
                    {apt.location.slice(0, 2).toUpperCase()}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {apt.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {apt.location}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#f59e0b" }}>
                        ₹{apt.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        / night
                      </Typography>
                    </Box>
                    <StarRating value={apt.rating} />
                    <Button component={Link} to={`/checkout/${apt.id}`}>Book Now</Button>
                  </CardContent>

                  <CardActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
                    <Button
                      component={Link}
                      to={`/edit/${apt.id}`}
                      startIcon={<EditIcon />}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        color: "#475569",
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton
                      onClick={() => handleDelete(apt.id)}
                      sx={{
                        background: alpha("#ef4444", 0.1),
                        color: "#dc2626",
                        "&:hover": { background: alpha("#ef4444", 0.2) },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}