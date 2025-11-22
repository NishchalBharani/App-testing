import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Paper, List, ListItemButton, alpha, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import { useGlobal } from "../context/GlobalState";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { state, dispatch } = useGlobal();
  const [localInput, setLocalInput] = useState("");
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const suggestions = ["Mumbai", "Goa", "Delhi", "Bangalore", "Pune", "Jaipur", "Kerala", "Udaipur"]
    .filter(c => c.toLowerCase().includes(localInput.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch({ type: "CLOSE_SEARCH_DROPDOWN" });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleSelectSuggestion = (city) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: city });
    dispatch({ type: "CLOSE_SEARCH_DROPDOWN" });
    setLocalInput("");
    navigate("/explore");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      color: "#1e293b",
    }}>
      <Toolbar sx={{ py: 1.5, justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#1e293b",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          Wanderlust
        </Typography>

        {/* Search Bar - Elegant */}
        <Box sx={{ position: "relative", width: { xs: "200px", sm: "360px" } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Where to next?"
            value={localInput}
            onChange={(e) => {
              const newValue = e.target.value;
              setLocalInput(newValue);
              if (newValue.length > 0) {
                dispatch({ type: "TOGGLE_SEARCH_DROPDOWN" }); // Toggle to open if typing starts
              } else {
                dispatch({ type: "CLOSE_SEARCH_DROPDOWN" }); // Close if input cleared
              }
            }}
            onFocus={() => {
              if (localInput.length > 0) {
                dispatch({ type: "TOGGLE_SEARCH_DROPDOWN" }); // Open on focus if input present
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: alpha("#f1f5f9", 0.7),
                backdropFilter: "blur(10px)",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
                "&:hover": { background: alpha("#e2e8f0", 0.8) },
                "&.Mui-focused": { background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }
              }
            }}
            InputProps={{
              endAdornment: <IconButton size="small"><SearchIcon /></IconButton>,
            }}
          />

          {/* Glassmorphic Dropdown */}
          {state.isSearchDropdownOpen && localInput && (
            <Paper
              ref={dropdownRef}
              elevation={8}
              sx={{
                position: "absolute",
                top: "48px",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.05)",
                mt: 1,
                zIndex: 50,
              }}
            >
              <List>
                {suggestions.length > 0 ? (
                  suggestions.map((city) => (
                    <ListItemButton
                      key={city}
                      onClick={() => handleSelectSuggestion(city)}
                      sx={{
                        py: 1.5,
                        transition: "all 0.2s",
                        "&:hover": { background: alpha("#fbbf24", 0.15) }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {city}
                      </Typography>
                    </ListItemButton>
                  ))
                ) : (
                  <ListItemButton disabled sx={{ py: 1.5, justifyContent: "center" }}>
                    <ListItemText primary="No results found" sx={{ textAlign: "center", color: "#64748b" }} />
                  </ListItemButton>
                )}
              </List>
            </Paper>
          )}
        </Box>

        {/* Sort + Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <select
            value={state.selectedSort}
            onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value })}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="none">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="rating_asc">Rating: Low to High</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>

          <Typography
            component={Link}
            to="/explore"
            sx={{
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: 500,
              fontSize: "1.05rem",
              transition: "color 0.2s",
              "&:hover": { color: "#f59e0b" }
            }}
          >
            Explore
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}